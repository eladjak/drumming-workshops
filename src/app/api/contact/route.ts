import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactBody = {
  name: string;
  phone: string;
  email?: string;
  audience: string;
  groupSize: string;
  date?: string;
  message?: string;
};

const audienceLabels: Record<string, string> = {
  company: "חברה / גיבוש צוות",
  event: "אירוע (חתונה, בר מצווה, מסיבה)",
  school: "בית ספר / מוסד חינוכי",
  community: "קהילה / ארגון",
  other: "אחר",
};

const groupSizeLabels: Record<string, string> = {
  small: "עד 20 אנשים",
  medium: "20–50 אנשים",
  large: "50–100 אנשים",
  xlarge: "100+ אנשים",
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;

    if (!body.name || !body.phone || !body.audience || !body.groupSize) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailHtml = `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #e87b2a;">פנייה חדשה מאתר סדנאות תיפוף</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold;">שם:</td><td style="padding: 8px;">${body.name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">טלפון:</td><td style="padding: 8px;"><a href="tel:${body.phone}">${body.phone}</a></td></tr>
          ${body.email ? `<tr><td style="padding: 8px; font-weight: bold;">אימייל:</td><td style="padding: 8px;"><a href="mailto:${body.email}">${body.email}</a></td></tr>` : ""}
          <tr><td style="padding: 8px; font-weight: bold;">סוג קבוצה:</td><td style="padding: 8px;">${audienceLabels[body.audience] ?? body.audience}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">גודל קבוצה:</td><td style="padding: 8px;">${groupSizeLabels[body.groupSize] ?? body.groupSize}</td></tr>
          ${body.date ? `<tr><td style="padding: 8px; font-weight: bold;">תאריך מועדף:</td><td style="padding: 8px;">${body.date}</td></tr>` : ""}
          ${body.message ? `<tr><td style="padding: 8px; font-weight: bold;">הודעה:</td><td style="padding: 8px;">${body.message}</td></tr>` : ""}
        </table>
      </div>
    `;

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM ?? "סדנאות תיפוף <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL ?? "eladjak@gmail.com",
        subject: `פנייה חדשה מ${body.name} — סדנאות תיפוף`,
        html: emailHtml,
        replyTo: body.email || undefined,
      });
    } else {
      console.log("Contact form submission (no RESEND_API_KEY):", body);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
