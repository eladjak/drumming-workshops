"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const images = [
  {
    src: "/images/drumming-hero-wide.jpg",
    alt: "מעגל תיפוף קבוצתי גדול",
    caption: "מעגל תיפוף קבוצתי",
  },
  {
    src: "/images/drumming-corporate.jpg",
    alt: "גיבוש חברות בתיפוף",
    caption: "גיבוש צוות בחברה",
  },
  {
    src: "/images/drumming-about.jpg",
    alt: "סדנת תיפוף אפריקאי",
    caption: "סדנת תיפוף אפריקאי",
  },
  {
    src: "/images/drumming-families.jpg",
    alt: "סדנת תיפוף לילדים ומשפחות",
    caption: "סדנה לבית ספר ומשפחות",
  },
  {
    src: "/images/drumming-hands.jpg",
    alt: "ידיים על תופי ג'מבה",
    caption: "קצב משותף",
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
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      selectedIndex === 0 ? images.length - 1 : selectedIndex - 1
    );
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      selectedIndex === images.length - 1 ? 0 : selectedIndex + 1
    );
  };

  return (
    <section id="gallery" className="py-24 bg-amber-950 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-orange-400 font-semibold text-sm tracking-widest uppercase mb-3 block">
            גלריה
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            הסדנאות שלנו
          </h2>
          <p className="text-xl text-amber-300 max-w-2xl mx-auto">
            מרגעים אמיתיים מהסדנאות שלנו — הסתכלו ותרגישו את האנרגיה
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {images.map((image, index) => (
            <motion.div
              key={image.src}
              variants={itemVariants}
              className={`relative cursor-pointer group overflow-hidden rounded-2xl ${
                index === 0 ? "col-span-2 row-span-2 md:col-span-1 md:row-span-1" : ""
              } ${index === 0 ? "aspect-video md:aspect-square" : "aspect-square"}`}
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-amber-950/0 group-hover:bg-amber-950/50 transition-all duration-300 flex items-end">
                <div className="p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-semibold text-sm">
                    {image.caption}
                  </p>
                </div>
              </div>
              {/* Expand icon */}
              <div className="absolute top-3 left-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close */}
            <button
              className="absolute top-4 left-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              onClick={() => setSelectedIndex(null)}
            >
              ✕
            </button>

            {/* Prev */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              ›
            </button>

            {/* Next */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              ‹
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white font-semibold text-lg">
                  {images[selectedIndex].caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
