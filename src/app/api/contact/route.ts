import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short.").max(80, "Name is too long."),
  email: z.email("Please enter a valid email address."),
  subject: z.string().trim().min(3, "Subject is too short.").max(120, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Message is too short.")
    .max(2000, "Message is too long."),
});

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(fieldErrors).flat().find(Boolean);

    return NextResponse.json(
      {
        error: firstError ?? "Please check the form fields and try again.",
        fieldErrors,
      },
      { status: 400 }
    );
  }

  const webhookUrl =
    process.env.CONTACT_FORM_WEBHOOK_URL ??
    "https://hook.eu1.make.com/5a9upjh2n891sduuhiuc36dt8nwhjju4";

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...parsed.data,
        source: "portfolio-contact-form",
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        { error: "Unable to deliver your message right now." },
        { status: 502 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Unable to deliver your message right now." },
      { status: 502 }
    );
  }

  return NextResponse.json(
    { message: "Thanks for reaching out. I will get back to you soon." },
    { status: 200 }
  );
}
