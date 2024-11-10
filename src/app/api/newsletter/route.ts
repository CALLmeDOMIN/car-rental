import Newsletter from "@/email/newsletter";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const received = await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: "newsletter@dsieron.pl",
      to: received.email,
      subject: "Contact form",
      react: Newsletter() as React.ReactElement,
    });

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
