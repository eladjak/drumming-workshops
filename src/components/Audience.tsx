"use client";

import { motion, type Variants } from "framer-motion";

const audiences = [
  {
    icon: "🏢",
    title: "חברות ועסקים",
    subtitle: "גיבוש צוות מנצח",
    desc: "סדנת תיפוף היא הדרך הטובה ביותר לחזק קשרים בין עובדים, לשפר תקשורת ולבנות תרבות ארגונית מנצחת. חוויה שהצוות יזכור לאורך שנים.",
    perks: ["חיזוק עבודת צוות", "שיפור תקשורת", "הנעה ומוטיבציה", "כיף אמיתי!"],
    color: "from-orange-500 to-amber-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  {
    icon: "🎉",
    title: "אירועים ומסיבות",
    subtitle: "הופעה שמחממת כל אירוע",
    desc: "חתונות, בר מצוות, ימי הולדת, מסיבות חברה — סדנת תיפוף מוסיפה אנרגיה ייחודית שמחממת את כל האירוע ומשאירה אורחים מאושרים.",
    perks: ["חתונות ואירועים", "ימי הולדת", "מסיבות חברה", "ערבי גיבוש"],
    color: "from-red-700 to-red-800",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  {
    icon: "🎓",
    title: "בתי ספר ומוסדות",
    subtitle: "חינוך דרך מוזיקה",
    desc: "פעילות חינוכית-יצירתית שמפתחת ריכוז, הקשבה, שיתוף פעולה ויצירתיות. מתאימה לכל גיל — מגן ילדים ועד תיכון.",
    perks: ["כל גילאי בית הספר", "ריכוז והקשבה", "יצירתיות", "שיתוף פעולה"],
    color: "from-amber-700 to-amber-800",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    icon: "🌟",
    title: "קהילות וארגונים",
    subtitle: "חיבור קהילתי אמיתי",
    desc: "מועדוני נוער, בתי כנסת, מרכזי קהילה, ארגונים חברתיים — הקצב המשותף בונה גשרים ומחזק את תחושת השייכות.",
    perks: ["מועדוני נוער", "מרכזי קהילה", "ארגונים חברתיים", "קבוצות גיבוש"],
    color: "from-stone-600 to-stone-700",
    bg: "bg-stone-50",
    border: "border-stone-200",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 1, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function Audience() {
  return (
    <section id="audience" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50 via-white to-white opacity-60" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 1, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 font-semibold text-sm tracking-widest uppercase mb-3 block">
            למי מתאים
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-amber-950 mb-6">
            לכל קבוצה יש קצב משלה
          </h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            סדנאות התיפוף שלנו מותאמות אישית לכל קהל ומטרה
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {audiences.map((audience) => (
            <motion.div
              key={audience.title}
              variants={itemVariants}
              className={`${audience.bg} ${audience.border} border rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group`}
            >
              <div className="flex items-start gap-5 mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${audience.color} flex items-center justify-center text-3xl shadow-md flex-shrink-0`}
                >
                  {audience.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-amber-950 mb-1 group-hover:text-orange-700 transition-colors">
                    {audience.title}
                  </h3>
                  <p className="text-orange-600 font-semibold text-sm">
                    {audience.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-amber-800 leading-relaxed mb-6">
                {audience.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {audience.perks.map((perk) => (
                  <span
                    key={perk}
                    className="bg-white/80 text-amber-800 text-sm font-medium px-3 py-1 rounded-full border border-amber-200"
                  >
                    ✓ {perk}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 1, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 text-center bg-gradient-to-l from-orange-500 to-amber-600 rounded-3xl p-10 text-white"
        >
          <h3 className="text-3xl font-black mb-4">
            לא בטוחים מה מתאים לכם?
          </h3>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            צרו איתנו קשר ונבנה יחד את הסדנה המושלמת עבורכם
          </p>
          <button
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg px-10 py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
          >
            דברו איתנו
          </button>
        </motion.div>
      </div>
    </section>
  );
}
