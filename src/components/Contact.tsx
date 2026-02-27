"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type FormData = {
  name: string;
  phone: string;
  email: string;
  audience: string;
  groupSize: string;
  date: string;
  message: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

const audienceOptions = [
  { value: "company", label: "חברה / גיבוש צוות" },
  { value: "event", label: "אירוע (חתונה, בר מצווה, מסיבה)" },
  { value: "school", label: "בית ספר / מוסד חינוכי" },
  { value: "community", label: "קהילה / ארגון" },
  { value: "other", label: "אחר" },
];

const groupSizeOptions = [
  { value: "small", label: "עד 20 אנשים" },
  { value: "medium", label: "20–50 אנשים" },
  { value: "large", label: "50–100 אנשים" },
  { value: "xlarge", label: "100+ אנשים" },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    audience: "",
    groupSize: "",
    date: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  };

  return (
    <section
      id="contact"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-50 via-white to-white opacity-80" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 1, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 font-semibold text-sm tracking-widest uppercase mb-3 block">
            הזמינו
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-amber-950 mb-6">
            בואו נדפק יחד!
          </h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            מלאו את הטופס ונחזור אליכם תוך 24 שעות עם הצעה מותאמת
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 1, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-gradient-to-br from-amber-950 to-amber-900 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-8 text-orange-300">
                פרטי יצירת קשר
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="text-amber-300 text-sm mb-1">טלפון</div>
                    <a
                      href="tel:+972501234567"
                      className="text-white font-bold text-lg hover:text-orange-300 transition-colors"
                    >
                      050-123-4567
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    ✉️
                  </div>
                  <div>
                    <div className="text-amber-300 text-sm mb-1">אימייל</div>
                    <a
                      href="mailto:info@drumming.co.il"
                      className="text-white font-bold hover:text-orange-300 transition-colors"
                    >
                      info@drumming.co.il
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    💬
                  </div>
                  <div>
                    <div className="text-amber-300 text-sm mb-1">וואטסאפ</div>
                    <a
                      href="https://wa.me/972501234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-bold hover:text-orange-300 transition-colors"
                    >
                      שלחו הודעה
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    🕐
                  </div>
                  <div>
                    <div className="text-amber-300 text-sm mb-1">שעות פעילות</div>
                    <div className="text-white font-bold">
                      א&apos;–ה&apos;: 9:00–20:00
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick contact buttons */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="tel:+972501234567"
                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold py-4 rounded-2xl transition-all hover:scale-105 shadow-md"
              >
                📞 התקשרו
              </a>
              <a
                href="https://wa.me/972501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-2xl transition-all hover:scale-105 shadow-md"
              >
                💬 וואטסאפ
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 1, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 1, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-amber-50 border border-amber-200 rounded-3xl p-12 text-center"
              >
                <div className="text-6xl mb-6">🥁</div>
                <h3 className="text-3xl font-black text-amber-950 mb-4">
                  תודה! קיבלנו את פנייתך
                </h3>
                <p className="text-amber-700 text-lg">
                  נחזור אליך תוך 24 שעות עם הצעה מותאמת. מוכנים לדפוק?
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-amber-50 border border-amber-100 rounded-3xl p-8 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-amber-900 font-semibold mb-2 text-sm"
                    >
                      שם מלא *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="ישראל ישראלי"
                      className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-amber-950 placeholder-amber-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-amber-900 font-semibold mb-2 text-sm"
                    >
                      טלפון *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="050-000-0000"
                      className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-amber-950 placeholder-amber-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-amber-900 font-semibold mb-2 text-sm"
                  >
                    אימייל
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="israel@example.com"
                    className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-amber-950 placeholder-amber-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="audience"
                      className="block text-amber-900 font-semibold mb-2 text-sm"
                    >
                      סוג הקבוצה *
                    </label>
                    <select
                      id="audience"
                      name="audience"
                      required
                      value={formData.audience}
                      onChange={handleChange}
                      className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-amber-950 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                    >
                      <option value="">בחרו סוג קבוצה</option>
                      {audienceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="groupSize"
                      className="block text-amber-900 font-semibold mb-2 text-sm"
                    >
                      גודל קבוצה *
                    </label>
                    <select
                      id="groupSize"
                      name="groupSize"
                      required
                      value={formData.groupSize}
                      onChange={handleChange}
                      className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-amber-950 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                    >
                      <option value="">בחרו גודל</option>
                      {groupSizeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="block text-amber-900 font-semibold mb-2 text-sm"
                  >
                    תאריך מועדף
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-amber-950 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-amber-900 font-semibold mb-2 text-sm"
                  >
                    פרטים נוספים
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="ספרו לנו על האירוע, דרישות מיוחדות, מיקום מועדף..."
                    className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-amber-950 placeholder-amber-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-l from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 disabled:opacity-70 disabled:cursor-not-allowed text-white font-black text-xl py-5 rounded-2xl transition-all duration-200 shadow-lg shadow-orange-200"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="animate-spin text-2xl">⏳</span>
                      שולח...
                    </span>
                  ) : (
                    "הזמינו סדנה עכשיו 🥁"
                  )}
                </motion.button>

                <p className="text-amber-600 text-xs text-center">
                  ✓ אנו מגיבים תוך 24 שעות ✓ ללא התחייבות
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
