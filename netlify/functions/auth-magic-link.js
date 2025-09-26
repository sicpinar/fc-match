// FILE: netlify/functions/auth-magic-link.js
import jwt from "jsonwebtoken";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { email, userData } = JSON.parse(event.body || "{}");
    if (!email) return { statusCode: 400, body: "Missing email" };

    // Signiertes JWT (15 Minuten gültig)
    const token = jwt.sign(
      { email, ...userData },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    
const verifyUrl = `${process.env.SITE_URL}/verify#token=${encodeURIComponent(token)}`;

    // Resend API: E-Mail versenden
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM, // z. B. noreply@deine-domain.de (bei Resend verifiziert)
        to: [email],
        subject: "Dein FC Match Login-Link",
        html: `
          <p>Hi! Klicke zum Login:</p>
          <p><a href="${verifyUrl}">${verifyUrl}</a></p>
          <p>Gültig für 15 Minuten.</p>
        `,
      }),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      return { statusCode: 500, body: `Resend error: ${txt}` };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
}

