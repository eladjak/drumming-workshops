import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-amber-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🥁</div>
        <h1 className="text-4xl font-black text-amber-950 mb-4">
          הדף לא נמצא
        </h1>
        <p className="text-amber-700 text-lg mb-8">
          נראה שהלכת לאיבוד... אבל אל דאגה, הקצב תמיד מחכה לך!
        </p>
        <Link
          href="/"
          className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg px-8 py-4 rounded-full transition-colors"
        >
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
}
