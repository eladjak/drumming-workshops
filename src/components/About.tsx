"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const featureAccent = [
  "from-orange-400 to-amber-500",
  "from-teal-500 to-emerald-600",
  "from-fuchsia-500 to-rose-600",
  "from-amber-500 to-orange-600",
];

const features = [
  {
    icon: "🎵",
    title: "ניסיון מוזיקלי ללא דרישות",
    desc: "לא צריך שום ניסיון מוזיקלי. הסדנה מתאימה לכולם - מתחילים ועד מנוסים.",
  },
  {
    icon: "🤝",
    title: "גיבוש אמיתי",
    desc: "הקצב המשותף יוצר קשר עמוק בין המשתתפים ומחזק את הצוות.",
  },
  {
    icon: "⚡",
    title: "אנרגיה בלתי נשכחת",
    desc: "חוויה שמעוררת, מרגשת ומשאירה רושם בלתי נשכח על כל המשתתפים.",
  },
  {
    icon: "🪣",
    title: "קצב עם דליים ומקלות",
    desc: "דליים, מקלות וכלי הקשה יצירתיים, מדריכים מקצועיים ואווירה קסומה.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function About() {
  return (
    <section id="about" className="py-24 bg-amber-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-red-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-40" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 font-semibold text-sm tracking-widest uppercase mb-3 block">
            מה זה
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-amber-950 mb-6 text-balance">
            סדנת קצב?
          </h2>
          {/* Decorative on-theme illustration */}
          <Image
            src="/images/drumming/illustration-drums.jpg"
            alt="איור של שני דליי תיפוף עם מקלות מוצלבים וגלי קצב"
            width={120}
            height={120}
            className="mx-auto mb-6 anim-float-soft rounded-2xl mix-blend-multiply"
          />
          <p className="text-lg md:text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed text-pretty">
            סדנת קצב היא חוויה קבוצתית ייחודית בה כל המשתתפים מנגנים יחד על
            דליים ומקלות. ללא ניסיון מוזיקלי נדרש — רק רצון להנות,
            להתחבר ולהרגיש את הקצב.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-lg mb-16"
        >
          <Image
            src="/images/drumming/about.jpg"
            alt="מדריך מדגים תיפוף על דליים מול מעגל משתתפים בסדנת קצב אמיתית"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1152px"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white rounded-2xl p-7 sm:p-8 shadow-sm border border-amber-100 hover:shadow-lg hover:border-orange-200 transition-shadow duration-200 group"
            >
              <div
                className={`inline-grid place-items-center size-14 rounded-2xl bg-gradient-to-br ${featureAccent[i]} text-3xl mb-4 shadow-md`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-amber-950 mb-2 group-hover:text-orange-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-amber-700 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Process steps */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-gradient-to-l from-amber-900 to-amber-950 rounded-3xl p-10 text-white"
        >
          <h3 className="font-display text-2xl sm:text-3xl text-center mb-10 text-orange-300">
            איך זה עובד?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { step: "1", title: "הגעה ופגישה", desc: "מדריך מקצועי מקבל את הקבוצה ומכיר את הדליים" },
              { step: "2", title: "חימום קצבי", desc: "תרגולי קצב בסיסיים שמחברים את כולם יחד" },
              { step: "3", title: "ניגון משותף", desc: "הקבוצה כולה מנגנת יחד — קסם של ממש!" },
              { step: "4", title: "הסיום", desc: "תמונות, הרגשה מדהימה וזיכרון לכל החיים" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-black text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-bold text-orange-200 mb-2">{item.title}</h4>
                <p className="text-amber-300/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
