import { NextResponse } from "next/server"
import { aiGuard } from "@/lib/ai-guard";
import { matchFaqAnswer } from "./faq-knowledge"

export const runtime = "nodejs"

const SYSTEM_PROMPT = `אתה צ'אטבוט באתר סדנאות תיפוף של אלעד יעקובוביץ' (drumming.eladjak.com).

מה אנחנו מציעים: סדנאות קצב מקצועיות לחברות, אירועים, בתי ספר וקהילות. מעגלי תיפוף לגיבוש צוות, אירועים מיוחדים, וטקסים. כלים נפוצים: דליים, מקלות, כלי הקשה.

ניסיון: שנים של הנחיית אירועים קהילתיים (קידושישי במגדל העמק 2024-2025), הקלטות פסקולים לתיאטרון, מערכת הגברה ואורגן מקצועי.

תשובות בעברית, חמות וקצרות (2-4 משפטים). למחירים — שלח לטופס Contact למענה תוך 48 שעות.`

// Free-tier Gemini quota is PER MODEL — chaining models multiplies effective
// capacity and survives a single model being deprecated (verified live:
// gemini-3.5-flash returned 429 RESOURCE_EXHAUSTED, 2026-07-10).
const MODEL_CHAIN = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-2.5-flash-lite"]

// Public LLM endpoint → per-IP rate limit so nobody can spam the free Gemini
// quota or run up cost. In-memory sliding window (per serverless instance).
const RATE_LIMIT = 12
const RATE_WINDOW_MS = 60_000
const MAX_INPUT_CHARS = 500
const MAX_MESSAGES = 12
const hits = new Map<string, number[]>()

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for")
  if (xff) return xff.split(",")[0].trim()
  return req.headers.get("x-real-ip") || "unknown"
}

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const arr = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS)
  if (arr.length >= RATE_LIMIT) {
    hits.set(ip, arr)
    return true
  }
  arr.push(now)
  hits.set(ip, arr)
  return false
}

export async function POST(req: Request) {
  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { content: "רגע, יותר מדי שאלות בבת אחת — נסו שוב בעוד דקה, או פנו דרך טופס יצירת הקשר." },
      { status: 429 },
    )
  }

  let messages: Array<{ role: string; content: string }> = []
  try {
    const body = await req.json()
    messages = body?.messages || []
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 })
  }
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages array required" }, { status: 400 })
  }

  const recent = messages
    .slice(-MAX_MESSAGES)
    .filter((m) => m && typeof m.content === "string")
    .map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.content.slice(0, MAX_INPUT_CHARS),
    }))
  const lastUser = [...recent].reverse().find((m) => m.role === "user")?.content || ""
  const apiKey = process.env.GEMINI_API_KEY

  // No live model configured (or no usable input) → answer from the curated static FAQ.
  if (!apiKey || recent.length === 0) {
    return NextResponse.json({ content: matchFaqAnswer(lastUser), source: "faq" })
  }

  try {
    const conversationText = recent
      .map((m) => `${m.role === "user" ? "משתמש" : "אסיסטנט"}: ${m.content}`)
      .join("\n")
    const fullPrompt = `${SYSTEM_PROMPT}\n\nשיחה עד כה:\n${conversationText}\n\nאסיסטנט:`

    for (const model of MODEL_CHAIN) {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 12_000)
      try {
        // Spend guard: public unauthenticated endpoint on Elad's own Gemini key.
        // Per-IP window plus a SHARED per-site daily ceiling, so the cap holds
        // across serverless instances rather than resetting on every cold start.
        const _guard = await aiGuard(req, "drumming-workshops");
        if (!_guard.ok) {
          return NextResponse.json({ content: "העוזר עמוס כרגע — אפשר לנסות שוב מאוחר יותר, או להשאיר פרטים בטופס ונחזור אליכם." });
        }
        const r = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
            body: JSON.stringify({
              contents: [{ parts: [{ text: fullPrompt }] }],
              generationConfig: {
                temperature: 0.6,
                maxOutputTokens: 600,
                // thinkingBudget:0 — without it Gemini Flash burns the token budget on
                // thinking and truncates the visible answer (verified bug 2026-05-27).
                thinkingConfig: { thinkingBudget: 0 },
              },
            }),
            signal: controller.signal,
          },
        )
        if (!r.ok) continue // quota (429) / deprecated (404) / denied (403) → next model
        const data = await r.json()
        const content = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
        if (content) return NextResponse.json({ content, source: model })
      } catch {
        // network error / timeout → try the next model
      } finally {
        clearTimeout(timeout)
      }
    }

    // Every model failed → graceful degradation: real answer from the static FAQ.
    return NextResponse.json({ content: matchFaqAnswer(lastUser), source: "faq-fallback" })
  } catch {
    return NextResponse.json({ content: matchFaqAnswer(lastUser), source: "faq-fallback" })
  }
}
