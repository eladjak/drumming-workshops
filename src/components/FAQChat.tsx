"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

const SUGGESTED = [
  "כמה עולה סדנת קצב לחברה?",
  "כמה משתתפים אפשר?",
  "מה מביאים לסדנה?",
  "כמה זמן הסדנה אורכת?",
  "האם זה מתאים גם לילדים?",
  "האם יש תמונות מאירועים אחרונים?",
]

type Message = { role: "user" | "assistant"; content: string }

export default function FAQChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (messages.length > 0)
      endRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" })
  }, [messages, loading, reduce])

  const send = async (text?: string) => {
    const q = (text ?? input).trim()
    if (!q || loading) return
    const next: Message[] = [...messages, { role: "user", content: q }]
    setMessages(next)
    setInput("")
    setLoading(true)
    try {
      const r = await fetch("/api/chat-faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      })
      const data = await r.json()
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data?.content || "סליחה, נסה שוב." },
      ])
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "בעיה בחיבור. נסה שוב." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="faq"
      className="py-20 sm:py-24 bg-gradient-to-b from-amber-900 via-amber-950 to-amber-950 relative overflow-hidden"
      dir="rtl"
    >
      {/* Soft color glows */}
      <div className="absolute -top-24 right-1/4 size-72 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/4 size-72 rounded-full bg-fuchsia-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto px-5 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <span className="text-orange-300 font-semibold text-xs tracking-widest uppercase mb-3 block">
            שאלות ותשובות
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-white mb-3 text-balance">
            יש לך שאלה? תשאל כאן
          </h2>
          <p className="text-base text-amber-200">
            צ׳אט חכם — תשובות תוך שניות
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl shadow-2xl overflow-hidden bg-amber-950/50 border border-orange-300/20 backdrop-blur-sm"
        >
          {/* Chat header bar */}
          <div className="flex items-center gap-3 px-5 py-3.5 bg-amber-900/40 border-b border-orange-300/10">
            <div className="relative">
              <div className="size-9 rounded-full bg-gradient-to-br from-orange-400 to-fuchsia-500 grid place-items-center text-lg">
                🥁
              </div>
              <span className="absolute -bottom-0.5 -left-0.5 size-3 rounded-full bg-emerald-400 border-2 border-amber-950" />
            </div>
            <div className="leading-tight">
              <div className="text-amber-50 text-sm font-bold">עוזר הסדנאות</div>
              <div className="text-emerald-300/90 text-xs">מקוון • עונה עכשיו</div>
            </div>
          </div>

          <div
            className="px-4 sm:px-5 py-4 overflow-y-auto space-y-3"
            style={{ minHeight: "300px", maxHeight: "420px" }}
            aria-live="polite"
          >
            {messages.length === 0 && !loading && (
              <div className="text-center py-8 text-amber-200/60 text-sm">
                בחר שאלה למטה או כתוב את שלך 👇
              </div>
            )}
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <div className="size-7 rounded-full bg-gradient-to-br from-orange-400 to-fuchsia-500 grid place-items-center text-xs shrink-0">
                      🥁
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-orange-500 text-white rounded-2xl rounded-bl-md"
                        : "bg-amber-900/70 text-amber-50 rounded-2xl rounded-br-md"
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <div className="flex items-end gap-2 justify-start">
                <div className="size-7 rounded-full bg-gradient-to-br from-orange-400 to-fuchsia-500 grid place-items-center text-xs shrink-0">
                  🥁
                </div>
                <div className="bg-amber-900/70 px-4 py-3 rounded-2xl rounded-br-md">
                  <div className="flex gap-1">
                    <span className="size-2 bg-amber-400 rounded-full animate-bounce" />
                    <span className="size-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0.12s" }} />
                    <span className="size-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0.24s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Suggested questions — always available */}
          <div className="px-4 sm:px-5 py-3 border-t border-orange-300/10 flex gap-2 overflow-x-auto sm:flex-wrap">
            {SUGGESTED.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                disabled={loading}
                className="whitespace-nowrap text-xs sm:text-sm px-3 py-1.5 rounded-full bg-orange-500/10 text-amber-200 hover:bg-orange-500/25 hover:text-white transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send() }}
            className="px-4 sm:px-5 py-3 border-t border-orange-300/10 flex gap-2 items-center bg-amber-900/20"
          >
            <label htmlFor="faq-input" className="sr-only">כתוב שאלה</label>
            <input
              id="faq-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="כתוב שאלה..."
              disabled={loading}
              className="flex-1 bg-transparent outline-none text-sm text-amber-50 placeholder:text-amber-200/40"
            />
            <motion.button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="שלח שאלה"
              whileTap={{ scale: 0.9 }}
              className="size-9 rounded-full bg-gradient-to-br from-orange-500 to-fuchsia-500 text-white grid place-items-center disabled:opacity-40 hover:brightness-110 transition-[filter] shrink-0"
            >
              <span className="inline-block" style={{ transform: "scaleX(-1)" }}>➤</span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
