import { NextResponse } from "next/server";

type ContactBody = {
  name: string;
  phone: string;
  email?: string;
  audience: string;
  groupSize: string;
  date?: string;
  message?: string;
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

    // TODO: Connect to email service (e.g., Resend, SendGrid)
    // For now, log the submission
    console.log("Contact form submission:", body);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
