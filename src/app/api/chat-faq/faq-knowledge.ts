/**
 * Static FAQ knowledge base for the drumming-workshops chat.
 *
 * Pattern proven on elad-score (2026-06-12): a real, useful fallback when the
 * Gemini API is unavailable (missing key, free-tier quota exhausted, model
 * deprecated), so the chat answers visitors instead of a dead apology.
 * Content mirrors the visible FAQ section (src/components/FAQ.tsx) — keep in sync.
 */

export type FaqEntry = {
  /** Hebrew keywords / roots that should trigger this answer. */
  keywords: string[]
  /** The curated Hebrew answer (2-4 sentences, warm-professional voice). */
  answer: string
}

export const FAQ_KNOWLEDGE: FaqEntry[] = [
  {
    keywords: ["מחיר", "עולה", "כמה עולה", "תקציב", "עלות", "מחירון", "הצעת מחיר"],
    answer:
      "המחיר תלוי בגודל הקבוצה, משך הסדנה והמיקום. שלחו פרטים דרך טופס יצירת הקשר ונחזור עם הצעת מחיר מותאמת אישית תוך 48 שעות — ללא התחייבות.",
  },
  {
    keywords: ["כמה זמן", "משך", "נמשכת", "אורך", "שעה", "דקות"],
    answer:
      "סדנה סטנדרטית נמשכת כשעה עד שעה וחצי. אפשר להתאים את המשך לפי הצורך — מ-45 דקות ועד 3 שעות.",
  },
  {
    keywords: ["ניסיון", "מוזיקלי", "יודע לנגן", "מתחיל", "מתחילים", "רקע"],
    answer:
      "בכלל לא צריך ניסיון! הסדנה מתאימה לכולם, ללא רקע מוזיקלי קודם. המדריך מלמד הכל מאפס — והקצב מגיע מהר משחושבים.",
  },
  {
    keywords: ["משתתפים", "מינימום", "מקסימום", "קבוצה", "אנשים", "כמה איש"],
    answer:
      "החל מ-10 משתתפים, ואין מגבלה עליונה — עשינו סדנאות גם ל-300 איש ויותר. גודל הקבוצה רק מגביר את האנרגיה.",
  },
  {
    keywords: ["מגיעים", "איפה", "מיקום", "אצלנו", "מרחק", "אזור", "צפון", "מרכז", "דרום"],
    answer:
      "אנחנו מגיעים לכל מקום בארץ — למשרד, לאולם אירועים, לבית ספר, לפארק או לחוף הים, עם כל הציוד.",
  },
  {
    keywords: ["להכין", "ציוד", "דליים", "מקלות", "צריך להביא", "הכנה"],
    answer:
      "לא צריך להכין שום דבר! אנחנו מביאים את כל הדליים, המקלות והציוד. רק תכינו מקום ישיבה במעגל ורצון ליהנות.",
  },
  {
    keywords: ["גיבוש", "חברה", "צוות", "עובדים", "ארגון", "יום כיף", "אירוע חברה"],
    answer:
      "סדנת קצב היא אחת מפעילויות הגיבוש החזקות שיש — כל הצוות מנגן יחד, בלי צורך בניסיון, והאנרגיה מדבקת. ספרו לנו על הצוות ונבנה סדנה מותאמת.",
  },
  {
    keywords: ["בית ספר", "תלמידים", "ילדים", "גן", "נוער", "כיתה"],
    answer:
      "בהחלט! אנחנו עובדים עם בתי ספר, גנים וקהילות — הסדנה מותאמת לגיל המשתתפים ומחזקת הקשבה, שיתוף פעולה וביטחון עצמי.",
  },
]

const DEFAULT_ANSWER =
  "שאלה טובה! את התשובה המדויקת הכי טוב לקבל דרך טופס יצירת הקשר למטה — נחזור אליכם תוך 48 שעות. בינתיים אפשר לשאול אותי על משך הסדנה, מספר משתתפים או איך זה עובד."

const GREETING_ANSWER =
  "שלום! אני כאן כדי לעזור עם כל שאלה על סדנאות הקצב — לחברות, אירועים, בתי ספר וקהילות. במה אוכל לעזור?"

const GREETING_TOKENS = ["שלום", "היי", "הי", "בוקר טוב", "ערב טוב", "מה נשמע", "מה קורה"]

/**
 * Match a visitor question against the static FAQ knowledge base.
 * Returns the best-scoring answer, a greeting, or a graceful default.
 */
export function matchFaqAnswer(question: string): string {
  const q = (question || "").trim()
  if (!q) return GREETING_ANSWER

  const normalized = q.toLowerCase()

  // Greeting-only messages get a warm opener.
  const isShort = q.length <= 14
  if (isShort && GREETING_TOKENS.some((g) => normalized.includes(g))) {
    return GREETING_ANSWER
  }

  let best: { score: number; answer: string } | null = null
  for (const entry of FAQ_KNOWLEDGE) {
    let score = 0
    for (const kw of entry.keywords) {
      if (normalized.includes(kw.toLowerCase())) {
        // Multi-word phrases are far more specific than single words, and
        // longer single words beat short ones.
        const words = kw.trim().split(/\s+/).length
        score += words > 1 ? words * 3 : kw.length >= 5 ? 2 : 1
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { score, answer: entry.answer }
    }
  }

  return best ? best.answer : DEFAULT_ANSWER
}
