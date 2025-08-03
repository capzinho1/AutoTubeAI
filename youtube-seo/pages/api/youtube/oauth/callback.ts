import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/youtube/oauth/callback`
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (!code || typeof code !== "string") {
    return res.status(400).send(`
      <html>
        <body>
          <h1>Error</h1>
          <p>Falta código de autorización</p>
          <a href="/upload">Volver a intentar</a>
        </body>
      </html>
    `);
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    
    // Obtener información del usuario
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();
    
    // Crear página HTML que guarde los tokens y redirija
    const html = `
      <html>
        <head>
          <title>Autenticación exitosa</title>
        </head>
        <body>
          <h1>✅ Autenticación exitosa</h1>
          <p>Guardando tokens y redirigiendo...</p>
          <script>
            // Guardar tokens en localStorage de forma individual
            const tokens = ${JSON.stringify(tokens)};
            const userInfo = ${JSON.stringify(userInfo.data)};
            
            localStorage.setItem('youtube_access_token', tokens.access_token);
            localStorage.setItem('youtube_refresh_token', tokens.refresh_token);
            localStorage.setItem('youtube_user_info', JSON.stringify(userInfo));
            
            // Redirigir a la página de upload
            setTimeout(() => {
              window.location.href = '/upload';
            }, 1000);
          </script>
        </body>
      </html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
    
  } catch (error) {
    console.error('Error obteniendo tokens:', error);
    res.status(500).send(`
      <html>
        <body>
          <h1>Error</h1>
          <p>Error obteniendo tokens de autenticación</p>
          <a href="/upload">Volver a intentar</a>
        </body>
      </html>
    `);
  }
}
