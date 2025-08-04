import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('🔧 OAuth Request - Variables de entorno:');
  console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET');
  console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET');
  console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
  console.log('YOUTUBE_REDIRECT_URI:', process.env.YOUTUBE_REDIRECT_URI);
  
  const redirectUri = process.env.YOUTUBE_REDIRECT_URI || 
                     `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/youtube/oauth/callback`;
  
  console.log('🔧 Using redirect URI:', redirectUri);
  
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri
  );

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
    
    console.log('🔧 Generated OAuth URL:', url);
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
