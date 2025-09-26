// netlify/functions/auth-verify.js
import jwt from "jsonwebtoken";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { token } = JSON.parse(event.body || "{}");
    if (!token) return { statusCode: 400, body: "Missing token" };

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = {
      email: payload.email,
      clubName: payload.clubName || null,
      teamName: payload.teamName || null,
      ageGroup: payload.ageGroup || null,
      plz: payload.plz || null,
      verifiedAt: new Date().toISOString(),
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, user }),
    };
  } catch (e) {
    return { statusCode: 401, body: "Invalid or expired token" };
  }
}
