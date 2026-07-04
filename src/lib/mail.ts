import nodemailer from "nodemailer";

/**
 * Sends the contact-form message to your Gmail inbox.
 * Uses a Gmail "App Password" (not your normal Gmail password) — see guide below.
 */
export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const { EMAIL_USER, EMAIL_PASS, EMAIL_TO } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
    throw new Error("Email env vars missing — configure EMAIL_USER, EMAIL_PASS, and EMAIL_TO.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${EMAIL_USER}>`,
    to: EMAIL_TO,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `,
  });
}