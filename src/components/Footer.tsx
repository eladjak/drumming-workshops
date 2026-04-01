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
              <span className="text-white font-black text-xl">
                סדנאות תיפוף
              </span>
            </div>
            <p className="text-amber-400/70 leading-relaxed text-sm">
              חוויות תיפוף בלתי נשכחות לכל קבוצה. מחברים אנשים דרך הקצב.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold mb-4">ניווט מהיר</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#about", label: "מה זה סדנת תיפוף?" },
                { href: "#audience", label: "למי מתאים?" },
                { href: "#gallery", label: "גלריה" },
                { href: "#testimonials", label: "המלצות" },
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
                  href="https://wa.me/972525427474"
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
          <p>© {currentYear} סדנאות תיפוף. כל הזכויות שמורות.</p>
          <p className="text-amber-600">עוצב ונבנה עם ❤️ וקצב</p>
        </div>
      </div>
    </footer>
  );
}
