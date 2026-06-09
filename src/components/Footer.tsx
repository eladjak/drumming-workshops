"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amber-950 text-amber-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🥁</span>
              <span className="font-display text-white text-xl">
                סדנאות קצב
              </span>
            </div>
            <p className="text-amber-400/70 leading-relaxed text-sm mb-4">
              חוויות קצב בלתי נשכחות לכל קבוצה. מחברים אנשים דרך הקצב.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-amber-400/70">
              <a
                href="https://www.eladjak.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors"
              >
                אלעד יעקובוביץ&apos;
              </a>
              <a
                href="https://fullstack-eladjak.co.il"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors"
              >
                פיתוח Full-Stack
              </a>
              <a
                href="https://teatron.eladjak.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors"
              >
                סדנאות תיאטרון
              </a>
              <a
                href="https://www.eladjak.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors"
              >
                אודות המנחה
              </a>
              <a
                href="https://he.wikipedia.org/wiki/%D7%AA%D7%99%D7%A4%D7%95%D7%A3"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors"
              >
                מה זה תיפוף?
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold mb-4">ניווט מהיר</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#about", label: "מה זה סדנת קצב?" },
                { href: "#audience", label: "למי מתאים?" },
                { href: "#gallery", label: "גלריה" },
                { href: "#testimonials", label: "המלצות" },
                { href: "#faq", label: "שאלות נפוצות" },
                { href: "#contact", label: "יצירת קשר" },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => {
                      const el = document.querySelector(link.href);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">צרו קשר</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+972525427474"
                  className="flex items-center gap-2 hover:text-orange-400 transition-colors"
                >
                  📞 052-542-7474
                </a>
              </li>
              <li>
                <a
                  href="mailto:eladjak@gmail.com"
                  className="flex items-center gap-2 hover:text-orange-400 transition-colors"
                >
                  ✉️ eladjak@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/972525427474?text=שלום%20אלעד%2C%20פניתי%20דרך%20אתר%20סדנאות%20תיפוף"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-orange-400 transition-colors"
                >
                  💬 וואטסאפ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-amber-500">
          <p>© {currentYear} סדנאות קצב. כל הזכויות שמורות.</p>
          <p className="text-amber-600">עוצב ונבנה עם ❤️ וקצב</p>
        </div>
      </div>
    </footer>
  );
}
