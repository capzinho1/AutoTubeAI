//funcion para conectar a la API de YouTube y subir videos a youtube

// Utilidades para manejar YouTube API y tokens OAuth

import { google } from "googleapis";

export interface YouTubeTokens {
  access_token: string;
  refresh_token?: string;
  expiry_date?: number;
  token_type?: string;
}

export class YouTubeService {
  private oauth2Client: any;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.YOUTUBE_REDIRECT_URI
    );
  }

  // Configurar tokens del usuario
  setTokens(tokens: YouTubeTokens) {
    this.oauth2Client.setCredentials(tokens);
  }

  // Obtener cliente autenticado de YouTube
  getYouTubeClient() {
    return google.youtube({ version: "v3", auth: this.oauth2Client });
  }

  // Renovar access token usando refresh token
  async refreshToken(): Promise<YouTubeTokens> {
    try {
      const { credentials } = await this.oauth2Client.refreshAccessToken();
      this.oauth2Client.setCredentials(credentials);
      return credentials as YouTubeTokens;
    } catch (error) {
      throw new Error(`Error renovando token: ${error}`);
    }
  }

  // Verificar si el token ha expirado
  isTokenExpired(): boolean {
    const credentials = this.oauth2Client.credentials;
    if (!credentials.expiry_date) return false;
    return Date.now() >= credentials.expiry_date;
  }

  // Subir video a YouTube
  async uploadVideo(videoPath: string, metadata: any): Promise<any> {
    const youtube = this.getYouTubeClient();
    
    return await youtube.videos.insert({
      part: ["snippet", "status"],
      requestBody: metadata,
      media: {
        body: require('fs').createReadStream(videoPath),
      },
    });
  }
}

// Función para obtener la URL de autorización
export function getAuthUrl(): string {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URI
  );

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/youtube.upload",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    prompt: "consent",
  });
}

// Función para obtener tokens desde código de autorización
export async function getTokensFromCode(code: string): Promise<YouTubeTokens> {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URI
  );

  const { tokens } = await oauth2Client.getToken(code);
  return tokens as YouTubeTokens;
}