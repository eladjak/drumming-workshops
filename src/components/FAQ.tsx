"use client";

import { motion, type Variants } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    q: "כמה עולה סדנת תיפוף?",
    a: "המחיר תלוי בגודל הקבוצה, משך הסדנה והמיקום. צרו קשר לקבלת הצעת מחיר מותאמת אישית — ללא התחייבות.",
  },
  {
    q: "כמה זמן נמשכת סדנה?",
    a: "סדנה סטנדרטית נמשכת כשעה עד שעה וחצי. אפשר להתאים את המשך לפי הצורך — מ-45 דקות ועד 3 שעות.",
  },
  {
    q: "צריך ניסיון מוזיקלי?",
    a: "בכלל לא! הסדנה מתאימה לכולם, ללא ניסיון מוזיקלי קודם. המדריך מלמד הכל מאפס.",
  },
  {
    q: "מה המספר המינימלי של משתתפים?",
    a: "החל מ-10 משתתפים. אין מגבלה עליונה — עשינו סדנאות גם ל-300 איש ויותר!",
  },
  {
    q: "אתם מגיעים אלינו?",
    a: "כן! אנחנו מגיעים לכל מקום בארץ — למשרד, לאולם אירועים, לבית ספר, לפארק, לחוף הים. אנחנו מביאים את כל הציוד.",
  },
  {
    q: "מה צריך להכין מראש?",
    a: "שום דבר! אנחנו מביאים את כל התופים והציוד. רק תכינו מקום ישיבה במעגל ורצון להנות.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="border border-amber-200 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-right bg-white hover:bg-amber-50 transition-colors"
        aria-expanded={open}
      >
        <span className="text-lg font-bold text-amber-950">{q}</span>
        <span
          className={`text-orange-500 text-2xl flex-shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40" : "max-h-0"}`}
      >
        <p className="px-6 pb-6 text-amber-700 leading-relaxed">{a}</p>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-amber-50 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-orange-500 font-semibold text-sm tracking-widest uppercase mb-3 block">
            שאלות נפוצות
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-amber-950">
            יש שאלות? יש תשובות
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-3"
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
