import { NextResponse } from "next/server"

const SYSTEM_PROMPT = `אתה צ'אטבוט באתר סדנאות תיפוף של אלעד יעקובוביץ' (drumming.eladjak.com).

מה אנחנו מציעים: סדנאות קצב מקצועיות לחברות, אירועים, בתי ספר וקהילות. מעגלי תיפוף לגיבוש צוות, אירועים מיוחדים, וטקסים. כלים נפוצים: דליים, מקלות, כלי הקשה.

ניסיון: שנים של הנחיית אירועים קהילתיים (קידושישי במגדל העמק 2024-2025), הקלטות פסקולים לתיאטרון, מערכת הגברה ואורגן מקצועי.

תשובות בעברית, חמות וקצרות (2-4 משפטים). למחירים — שלח לטופס Contact למענה תוך 48 שעות.`

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({
      content: "הצ'אט עדיין בהרצה — שלח/י פרטים בטופס למטה ונחזור תוך 48 שעות.",
    })
  }
  try {
    const body = await req.json()
    const messages = body?.messages || []
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages array required" }, { status: 400 })
    }
    const recent = messages.slice(-10)
    const conversationText = recent
      .map((m: { role: string; content: string }) => `${m.role === "user" ? "משתמש" : "אסיסטנט"}: ${m.content}`)
      .join("\n")
    const fullPrompt = `${SYSTEM_PROMPT}\n\nשיחה עד כה:\n${conversationText}\n\nאסיסטנט:`
    const r = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: { temperature: 0.6, maxOutputTokens: 350 },
        }),
      },
    )
    if (!r.ok) {
      return NextResponse.json({ content: "סליחה, יש בעיה זמנית. נסה שוב או שלח דרך טופס Contact." })
    }
    const data = await r.json()
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "סליחה, לא הבנתי. נסה לנסח אחרת."
    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ error: "Internal error", content: "סליחה, נסה שוב בעוד רגע." }, { status: 500 })
  }
}
