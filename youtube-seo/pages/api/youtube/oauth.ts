import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/youtube/oauth/callback`
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Redirigir usuario a Google para autorizar app
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/youtube.upload",
        "https://www.googleapis.com/auth/userinfo.profile", 
        "https://www.googleapis.com/auth/userinfo.email",
      ],
      prompt: "consent",
      // Agregar parámetros para mejor UX durante verificación
      include_granted_scopes: true,
      state: 'autotubeai_auth'
    });
    res.redirect(url);
  } else if (req.method === "POST") {
    // Recibir código de autorización y obtener tokens
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "Código no enviado" });

    try {
      const { tokens } = await oauth2Client.getToken(code);
      // Aquí deberías guardar tokens en Firestore o DB
      res.status(200).json(tokens);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo tokens" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
