import { NextResponse } from "next/server"
import { matchFaqAnswer } from "./faq-knowledge"

const SYSTEM_PROMPT = `אתה צ'אטבוט באתר סדנאות תיפוף של אלעד יעקובוביץ' (drumming.eladjak.com).

מה אנחנו מציעים: סדנאות קצב מקצועיות לחברות, אירועים, בתי ספר וקהילות. מעגלי תיפוף לגיבוש צוות, אירועים מיוחדים, וטקסים. כלים נפוצים: דליים, מקלות, כלי הקשה.

ניסיון: שנים של הנחיית אירועים קהילתיים (קידושישי במגדל העמק 2024-2025), הקלטות פסקולים לתיאטרון, מערכת הגברה ואורגן מקצועי.

תשובות בעברית, חמות וקצרות (2-4 משפטים). למחירים — שלח לטופס Contact למענה תוך 48 שעות.`

// Free-tier Gemini quota is PER MODEL — chaining models multiplies effective
// capacity and survives a single model being deprecated (verified live:
// gemini-3.5-flash returned 429 RESOURCE_EXHAUSTED, 2026-07-10).
const MODEL_CHAIN = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-2.5-flash-lite"]

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const messages = body?.messages || []
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages array required" }, { status: 400 })
    }
    const lastUser =
      [...messages].reverse().find((m: { role: string }) => m.role === "user")?.content || ""
    const apiKey = process.env.GEMINI_API_KEY
    // No live model configured → answer from the curated static FAQ.
    if (!apiKey) {
      return NextResponse.json({ content: matchFaqAnswer(lastUser), source: "faq" })
    }
    const recent = messages.slice(-10)
    const conversationText = recent
      .map((m: { role: string; content: string }) => `${m.role === "user" ? "משתמש" : "אסיסטנט"}: ${m.content}`)
      .join("\n")
    const fullPrompt = `${SYSTEM_PROMPT}\n\nשיחה עד כה:\n${conversationText}\n\nאסיסטנט:`
    for (const model of MODEL_CHAIN) {
      try {
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
          },
        )
        if (!r.ok) continue // quota (429) / deprecated (404) / denied (403) → next model
        const data = await r.json()
        const content = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
        if (content) return NextResponse.json({ content, source: model })
      } catch {
        // network error / timeout → try the next model
      }
    }
    // Every model failed → graceful degradation: real answer from the static FAQ.
    return NextResponse.json({ content: matchFaqAnswer(lastUser), source: "faq-fallback" })
  } catch {
    return NextResponse.json({ error: "Internal error", content: "סליחה, נסה שוב בעוד רגע." }, { status: 500 })
  }
}
