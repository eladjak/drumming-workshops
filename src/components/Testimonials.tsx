"use client";

import { motion, type Variants } from "framer-motion";
import { useState } from "react";

const testimonials = [
  {
    name: "שירה לוי",
    role: "מנהלת משאבי אנוש, חברת הייטק",
    text: 'ארגנו סדנת תיפוף לצוות של 60 עובדים. לא ציפיתי לכזאת אנרגיה ושמחה! כולם היו מחוברים ומאושרים. בהחלט נחזור שוב.',
    rating: 5,
    avatar: "ש",
    color: "bg-orange-500",
  },
  {
    name: "דני כהן",
    role: "אב לחתן",
    text: "עשינו את הסדנה כחלק מהחתונה של בני. זה היה שיא הערב! כל האורחים — מהסבתות ועד הילדים — ניגנו יחד. רגע שלא ישכח.",
    rating: 5,
    avatar: "ד",
    color: "bg-red-700",
  },
  {
    name: "מורה ענת",
    role: "מחנכת כיתה ח׳, בית ספר יסודי",
    text: "הבאנו את הסדנה לסוף שנה. הילדים פשוט התפוצצו מאושר. ראיתי ילדים שכמעט לא מדברים אחד עם השני — פתאום מנגנים יחד ומחייכים.",
    rating: 5,
    avatar: "ע",
    color: "bg-amber-700",
  },
  {
    name: "יוסי ברוך",
    role: "מנהל מועדון נוער",
    text: "הנוער שלנו חיפש חוויות שונות. סדנת התיפוף פתחה להם עולם חדש. חלק מהם ממשיכים ללמוד תיפוף עד היום!",
    rating: 5,
    avatar: "י",
    color: "bg-stone-600",
  },
  {
    name: "נועה אבידן",
    role: "אירגון צוות R&D, סטארטאפ",
    text: "עשינו עם צוות הפיתוח — מתכנתים רגילים לשבת מול מחשב. לראות אותם מנגנים יחד ומצחיקים זה שינה את כל האווירה של הצוות.",
    rating: 5,
    avatar: "נ",
    color: "bg-orange-600",
  },
  {
    name: "רחל שמואל",
    role: "פעיל קהילה, מרכז קהילתי",
    text: "הסדנה הפכה לאירוע השנתי שכולם מחכים לו. מחברת את השכנים, מוסיפה שמחה ויוצרת חוויה שמחה לכולם.",
    rating: 5,
    avatar: "ר",
    color: "bg-red-800",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-orange-400 text-lg">
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

  return (
    <section id="testimonials" className="py-24 bg-amber-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-100 via-amber-50 to-amber-50 opacity-60" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 font-semibold text-sm tracking-widest uppercase mb-3 block">
            המלצות
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-amber-950 mb-6">
            מה אומרים עלינו?
          </h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            מאות לקוחות מרוצים שחוו את קסם התיפוף
          </p>
        </motion.div>

        {/* Featured testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-gradient-to-l from-amber-900 to-amber-950 rounded-3xl p-10 mb-10 text-white"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div
              className={`w-20 h-20 ${testimonials[activeIndex].color} rounded-full flex items-center justify-center text-white text-3xl font-black flex-shrink-0`}
            >
              {testimonials[activeIndex].avatar}
            </div>
            <div className="flex-1 text-center md:text-right">
              <StarRating count={testimonials[activeIndex].rating} />
              <blockquote className="text-xl text-amber-100 leading-relaxed mb-4 italic">
                &ldquo;{testimonials[activeIndex].text}&rdquo;
              </blockquote>
              <div>
                <div className="font-bold text-orange-300 text-lg">
                  {testimonials[activeIndex].name}
                </div>
                <div className="text-amber-400/80 text-sm">
                  {testimonials[activeIndex].role}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-orange-400 w-6"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`המלצה ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Grid of testimonials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              onClick={() => setActiveIndex(index)}
              className={`bg-white rounded-2xl p-6 border cursor-pointer hover:shadow-lg transition-all duration-300 ${
                activeIndex === index
                  ? "border-orange-300 shadow-md shadow-orange-100"
                  : "border-amber-100"
              }`}
            >
              <StarRating count={testimonial.rating} />
              <p className="text-amber-800 leading-relaxed mb-4 text-sm line-clamp-3">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-amber-950 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-amber-600 text-xs">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
