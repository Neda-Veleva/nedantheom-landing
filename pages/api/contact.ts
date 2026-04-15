import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  pageUrl?: string;
  userAgent?: string;
};

type ApiResponse = { ok: true } | { ok: false; error: string };

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const { name, email, message, pageUrl, userAgent } = req.body as Partial<ContactPayload>;
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }

  try {
    const resend = new Resend(requireEnv("RESEND_API_KEY"));
    const to = requireEnv("RESEND_TO_EMAIL");
    const from = requireEnv("RESEND_FROM_EMAIL");

    const safe = (s: string) => s.replace(/\r/g, "").trim();
    const safeName = safe(name).slice(0, 120);
    const safeEmail = safe(email).slice(0, 254);
    const safeMessage = message.trim();

    await resend.emails.send({
      from,
      to,
      subject: `Ново съобщение от сайта: ${safeName}`,
      replyTo: safeEmail,
      text: [
        `Име: ${safeName}`,
        `Имейл: ${safeEmail}`,
        pageUrl ? `Страница: ${pageUrl}` : null,
        userAgent ? `UA: ${userAgent}` : null,
        "",
        "Съобщение:",
        safeMessage,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return res.status(500).json({ ok: false, error: msg });
  }
}


