"use client";

import { motion, type Variants } from "framer-motion";

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
    icon: "🌍",
    title: "תיפוף אפריקאי אותנטי",
    desc: "תופי ג'מבה ואפריקאיים אותנטיים, מדריכים מקצועיים ואווירה קסומה.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 1, y: 30 },
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
          initial={{ opacity: 1, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 font-semibold text-sm tracking-widest uppercase mb-3 block">
            מה זה
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-amber-950 mb-6">
            סדנת תיפוף?
          </h2>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
            סדנת תיפוף היא חוויה קבוצתית ייחודית בה כל המשתתפים מנגנים יחד על
            תופי ג&apos;מבה אפריקאיים. ללא ניסיון מוזיקלי נדרש — רק רצון להנות,
            להתחבר ולהרגיש את הקצב.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-sm border border-amber-100 hover:shadow-md hover:border-orange-200 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-amber-950 mb-2 group-hover:text-orange-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-amber-700 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Process steps */}
        <motion.div
          initial={{ opacity: 1, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-gradient-to-l from-amber-900 to-amber-950 rounded-3xl p-10 text-white"
        >
          <h3 className="text-2xl font-bold text-center mb-10 text-orange-300">
            איך זה עובד?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "הגעה ופגישה", desc: "מדריך מקצועי מקבל את הקבוצה ומכיר את התופים" },
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
