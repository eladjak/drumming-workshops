"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

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

  useEffect(() => {
    if (messages.length > 0) endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [messages, loading])

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
      className="py-20 bg-gradient-to-b from-amber-900 to-amber-950"
      dir="rtl"
    >
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-orange-300 font-semibold text-xs tracking-widest uppercase mb-3 block">
            שאלות ותשובות
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-balance">
            יש לך שאלה? תשאל כאן
          </h2>
          <p className="text-base text-amber-200">
            צ׳אט חכם — תשובות תוך שניות
          </p>
        </motion.div>

        <div className="rounded-2xl shadow-2xl overflow-hidden bg-amber-950/40 border border-orange-300/20">
          <div className="px-5 py-4 overflow-y-auto space-y-3" style={{ minHeight: "300px", maxHeight: "400px" }}>
            {messages.length === 0 && !loading && (
              <div className="text-center py-6 text-amber-200/60 text-sm">
                בחר שאלה למטה או כתוב את שלך
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user" ? "bg-amber-500 text-amber-950" : "bg-amber-900/60 text-amber-50"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-amber-900/60 px-4 py-2.5 rounded-2xl">
                  <div className="flex gap-1">
                    <span className="size-2 bg-amber-400 rounded-full animate-bounce" />
                    <span className="size-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <span className="size-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {messages.length === 0 && (
            <div className="px-5 py-3 border-t border-amber-300/10 flex flex-wrap gap-2">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  disabled={loading}
                  className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-200 hover:bg-amber-500/20 transition-colors disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => { e.preventDefault(); send() }}
            className="px-5 py-3 border-t border-amber-300/10 flex gap-2 items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="כתוב שאלה..."
              disabled={loading}
              className="flex-1 bg-transparent outline-none text-sm text-amber-50 placeholder:text-amber-200/40"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="שלח"
              className="size-9 rounded-full bg-amber-500 text-amber-950 grid place-items-center disabled:opacity-40 hover:bg-amber-400 transition-colors"
            >
              ➤
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
