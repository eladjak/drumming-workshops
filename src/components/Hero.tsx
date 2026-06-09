"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const reduce = useReducedMotion();

  const scrollTo = (sel: string) => {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/drumming/hero-drum.jpg"
          alt="מעגל גדול של משתתפים מתופפים יחד על דליים צבעוניים עם מקלות מורמים באוויר בסדנת קצב סוחפת"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay — warm, slightly richer with a magenta hint */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/85 via-amber-900/55 to-amber-950/90" />
        <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-950/20 via-transparent to-orange-900/20" />
      </div>

      {/* Decorative glows + animated ripple rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={reduce ? undefined : { scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-32 -top-32 size-96 rounded-full bg-orange-500/20 blur-3xl"
        />
        <motion.div
          animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -left-32 bottom-32 size-80 rounded-full bg-fuchsia-700/20 blur-3xl"
        />
        {/* Rhythm ripple rings, centered behind content */}
        {!reduce &&
          [0, 1, 2].map((i) => (
            <motion.span
              key={i}
              initial={{ scale: 0.6, opacity: 0.5 }}
              animate={{ scale: 1.9, opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-300/30"
            />
          ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-6 max-w-4xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block bg-orange-500/90 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full mb-6 tracking-wide">
            🥁 חוויה קצבית בלתי נשכחת
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="font-display text-4xl sm:text-6xl md:text-7xl text-white leading-tight mb-6 text-balance"
        >
          מתחברים
          <br />
          <span className="text-orange-400">דרך הקצב</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl text-amber-100 mb-10 max-w-2xl mx-auto leading-relaxed font-light text-pretty"
        >
          סדנאות קצב מקצועיות שמחברות אנשים, מחזקות צוות ויוצרות זיכרונות
          שלא ישכחו. לחברות, אירועים, בתי ספר וקהילות.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={reduce ? undefined : { scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#contact")}
            className="bg-orange-500 hover:bg-orange-400 text-white font-bold text-base sm:text-lg px-8 sm:px-10 py-4 rounded-full shadow-2xl shadow-orange-900/50 transition-colors duration-200 w-full sm:w-auto sm:min-w-48"
          >
            הזמינו סדנה עכשיו
          </motion.button>
          <motion.button
            whileHover={reduce ? undefined : { scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#about")}
            className="border-2 border-white/60 hover:border-white text-white font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 rounded-full transition-colors duration-200 backdrop-blur-sm w-full sm:w-auto"
          >
            גלו עוד
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
          className="mt-14 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-6 max-w-xl mx-auto"
        >
          {[
            { number: "500+", label: "סדנאות בוצעו" },
            { number: "98%", label: "שביעות רצון" },
            { number: "15+", label: "שנות ניסיון" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl sm:text-3xl md:text-4xl text-orange-400 tabular-nums">
                {stat.number}
              </div>
              <div className="text-amber-200/80 text-xs sm:text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={reduce ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
