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

// Visual order, so focus lands on the first field on the page rather than the
// first key that happened to be validated.
const FIELD_ORDER = ["name", "phone", "email", "audience", "groupSize"] as const;

function FieldError({ id, message }: { id: string; message?: string }) {
  // Always rendered, never conditionally mounted, so aria-describedby always
  // has a target and the text can be injected into a region that already exists.
  return (
    <p id={id} aria-live="polite" className="mt-1 min-h-5 text-sm text-red-700">
      {message ? (
        <>
          {/* a mark as well as the colour — failure is never carried by colour alone */}
          <span aria-hidden="true">✕ </span>
          {message}
        </>
      ) : null}
    </p>
  );
}

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitNotice, setSubmitNotice] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // noValidate is set on the form below, so the browser checks nothing. That
    // is deliberate: without it the browser blocks first, onSubmit never runs,
    // and this validation would be dead code. What the browser cannot do is
    // leave anything in the DOM to point aria-describedby at, and its bubble
    // follows the visitor's browser locale rather than this page's lang=he --
    // an English-locale visitor gets an English error on a Hebrew form.
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "צריך למלא שם מלא";
    if (!formData.phone.trim()) errs.phone = "צריך למלא טלפון";
    else if (!/^[\d\s()+-]{9,}$/.test(formData.phone.trim()))
      errs.phone = "מספר הטלפון לא נראה תקין";
    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    )
      errs.email = "כתובת האימייל לא נראית תקינה";
    if (!formData.audience) errs.audience = "צריך לבחור סוג קבוצה";
    if (!formData.groupSize) errs.groupSize = "צריך לבחור גודל קבוצה";

    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const first = FIELD_ORDER.find((f) => errs[f]);
      if (first) {
        const n = Object.keys(errs).length;
        setSubmitNotice(
          `הטופס לא נשלח. ${n === 1 ? "יש שדה אחד שצריך תיקון" : `יש ${n} שדות שצריכים תיקון`}: ${errs[first]}`
        );
        document.getElementById(first)?.focus();
      }
      return;
    }

    setSubmitNotice("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-orange-700 font-semibold text-sm tracking-widest uppercase mb-3 block">
            הזמינו
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-amber-950 mb-6 text-balance">
            בואו נדפוק יחד!
          </h2>
          <p className="text-lg md:text-xl text-amber-700 max-w-2xl mx-auto text-pretty">
            מלאו את הטופס ונחזור אליכם תוך 24 שעות עם הצעה מותאמת
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
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
                      href="tel:+972525427474"
                      className="text-white font-bold text-lg hover:text-orange-300 transition-colors"
                    >
                      052-542-7474
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
                      href="mailto:eladjak@gmail.com"
                      className="text-white font-bold hover:text-orange-300 transition-colors"
                    >
                      eladjak@gmail.com
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
                      href="https://wa.me/972525427474?text=שלום%20אלעד%2C%20פניתי%20דרך%20אתר%20סדנאות%20תיפוף"
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
                href="tel:+972525427474"
                className="flex items-center justify-center gap-2 bg-orange-700 hover:bg-orange-800 text-white font-bold py-4 rounded-2xl transition-all hover:scale-105 shadow-md"
              >
                📞 התקשרו
              </a>
              <a
                href="https://wa.me/972525427474?text=שלום%20אלעד%2C%20פניתי%20דרך%20אתר%20סדנאות%20תיפוף"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-2xl transition-all hover:scale-105 shadow-md"
              >
                💬 וואטסאפ
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
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
                noValidate
              >
                {/* Mounted before it ever has content: a live region inserted
                    at the same moment as its text is often not announced. */}
                <p aria-live="assertive" className="sr-only">
                  {submitNotice}
                </p>

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
                      aria-required="true"
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby="name-error"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="ישראל ישראלי"
                      className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-amber-950 placeholder-amber-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                    />
                    <FieldError id="name-error" message={errors.name} />
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
                      dir="ltr"
                      inputMode="tel"
                      autoComplete="tel"
                      id="phone"
                      name="phone"
                      required
                      aria-required="true"
                      aria-invalid={errors.phone ? true : undefined}
                      aria-describedby="phone-error"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="050-000-0000"
                      className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-amber-950 placeholder-amber-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                    />
                    <FieldError id="phone-error" message={errors.phone} />
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
                    dir="ltr"
                    id="email"
                    name="email"
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby="email-error"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="israel@example.com"
                    className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-amber-950 placeholder-amber-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                  <FieldError id="email-error" message={errors.email} />
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
                      aria-required="true"
                      aria-invalid={errors.audience ? true : undefined}
                      aria-describedby="audience-error"
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
                    <FieldError id="audience-error" message={errors.audience} />
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
                      aria-required="true"
                      aria-invalid={errors.groupSize ? true : undefined}
                      aria-describedby="groupSize-error"
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
                    <FieldError
                      id="groupSize-error"
                      message={errors.groupSize}
                    />
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
                    dir="ltr"
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

                {status === "error" && (
                  <p
                    role="alert"
                    className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 text-center"
                  >
                    אופס, משהו השתבש בשליחה. אפשר להתקשר 052-542-7474 או לנסות שוב.
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-l from-orange-700 to-amber-700 hover:from-orange-800 hover:to-amber-800 disabled:opacity-70 disabled:cursor-not-allowed text-white font-black text-xl py-5 rounded-2xl transition-all duration-200 shadow-lg shadow-orange-200"
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

                <p className="text-amber-700 text-xs text-center">
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
