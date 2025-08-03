import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import fs from "fs";
import path from "path";
import formidable from "formidable";
// const ffprobe = require('node-ffprobe'); // Comentar temporalmente para debugging

export const config = {
  api: {
    bodyParser: false, // Desactivar bodyParser para manejar archivos
    responseLimit: '100mb', // Permitir archivos grandes
  },
};

// Función para detectar si un video debe ser un YouTube Short
const detectIsShort = async (videoFilePath: string, fileName: string, fileSize: number): Promise<boolean> => {
  console.log('=== INICIANDO DETECCIÓN DE SHORTS ===');
  console.log('Archivo:', fileName);
  console.log('Tamaño:', (fileSize / 1024 / 1024).toFixed(2), 'MB');
  
  // Por ahora, usar solo detección básica para debugging
  console.log('🔧 Usando detección básica (ffprobe deshabilitado para debugging)');
  return detectIsShortBasic(fileName, fileSize);
};

// Función de detección básica como fallback
const detectIsShortBasic = (fileName: string, fileSize: number): boolean => {
  console.log('=== DETECCIÓN BÁSICA DE SHORTS ===');
  
  // Detectar por patrones en el nombre del archivo
  const lowerName = fileName.toLowerCase();
  const hasShortIndicators = 
    lowerName.includes('short') ||
    lowerName.includes('vertical') ||
    lowerName.includes('portrait') ||
    lowerName.includes('9x16') ||
    lowerName.includes('tiktok') ||
    lowerName.includes('reel');
    
  // Los archivos de Shorts tienden a ser más pequeños (menos de 50MB)
  const isSmallFile = (fileSize / 1024 / 1024) < 50;
  
  console.log('✅ Indicadores en nombre:', hasShortIndicators);
  console.log('✅ Archivo pequeño (<50MB):', isSmallFile);
  
  const isShort = hasShortIndicators || isSmallFile;
  console.log('🎬 RESULTADO BÁSICO:', isShort ? 'PROBABLEMENTE ES UN SHORT' : 'PROBABLEMENTE NO ES UN SHORT');
  
  return isShort;
};

// Función para parsear el formulario multipart/form-data
const parseForm = async (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise((resolve, reject) => {
    const uploadDir = path.join(process.cwd(), 'temp');
    
    // Crear directorio temporal si no existe
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 1000 * 1024 * 1024, // 1000MB
      filter: ({ mimetype }) => {
        // Permitir solo videos
        return Boolean(mimetype && mimetype.includes('video'));
      },
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('🚀 === INICIO DE UPLOAD REQUEST ===');
  console.log('Método:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    console.log('📋 Parseando formulario...');
    // Parsear el formulario con archivos
    const { fields, files } = await parseForm(req);
    console.log('✅ Formulario parseado exitosamente');
    
    console.log('📝 Extrayendo campos del formulario...');
    console.log('Fields recibidos:', Object.keys(fields));
    console.log('Files recibidos:', Object.keys(files));
    
    // Obtener los datos del formulario
    const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
    const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
    const tagsField = Array.isArray(fields.tags) ? fields.tags[0] : fields.tags;
    const hashtagsField = Array.isArray(fields.hashtags) ? fields.hashtags[0] : fields.hashtags;
    const publishNow = Array.isArray(fields.publishNow) ? fields.publishNow[0] : fields.publishNow;
    const scheduledPublishTime = Array.isArray(fields.scheduledPublishTime) ? fields.scheduledPublishTime[0] : fields.scheduledPublishTime;
    const forceShort = (Array.isArray(fields.forceShort) ? fields.forceShort[0] : fields.forceShort) === 'true';
    const videoFile = Array.isArray(files.video) ? files.video[0] : files.video;
    
    console.log('🔧 Campo forceShort recibido:', fields.forceShort, '-> parseado:', forceShort);
    
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'El título del video es requerido' });
    }

    if (!description || typeof description !== 'string') {
      return res.status(400).json({ error: 'La descripción del video es requerida' });
    }
    
    if (!videoFile) {
      return res.status(400).json({ error: 'El archivo de video es requerido' });
    }

    // Parsear tags y hashtags
    let tags: string[] = [];
    let hashtags: string[] = [];

    try {
      tags = tagsField ? JSON.parse(tagsField) : [];
      hashtags = hashtagsField ? JSON.parse(hashtagsField) : [];
    } catch (error) {
      console.error('Error parseando tags/hashtags:', error);
      // Si hay error, usar valores por defecto
      tags = [];
      hashtags = [];
    }

    // Obtener tokens desde headers
    const accessToken = req.headers['authorization']?.replace('Bearer ', '');
    const refreshToken = req.headers['x-refresh-token'] as string;

    if (!accessToken) {
      return res.status(401).json({ 
        error: 'Token de acceso requerido. Primero debes autenticarte.',
        code: 'NO_ACCESS_TOKEN' 
      });
    }

    console.log('=== INICIANDO SUBIDA DE VIDEO ===');
    console.log('Título:', title);
    console.log('Descripción:', description ? description.substring(0, 100) + '...' : 'No especificada');
    console.log('Tags:', tags);
    console.log('Hashtags:', hashtags);
    console.log('Archivo:', videoFile.originalFilename);
    console.log('Tamaño:', `${(videoFile.size / 1024 / 1024).toFixed(2)}MB`);
    console.log('Forzar como Short:', forceShort);

    // Detectar automáticamente si es un Short o usar fuerza manual
    let isShort = forceShort;
    
    if (!forceShort) {
      // Solo hacer detección automática si no se está forzando
      isShort = await detectIsShort(videoFile.filepath, videoFile.originalFilename || 'video', videoFile.size);
    } else {
      console.log('🔧 FORZADO COMO SHORT por el usuario');
    }
    
    // Ya no necesitamos generar SEO con IA porque viene editado del frontend
    console.log('Usando SEO editado por el usuario...');

    // Si es un Short, optimizar el SEO automáticamente
    let finalTitle = title;
    let finalDescription = description;
    
    if (isShort) {
      console.log('🎬 Optimizando para YouTube Shorts...');
      
      // Agregar #Shorts al título si no está presente
      if (!finalTitle.toLowerCase().includes('#shorts') && !finalTitle.toLowerCase().includes('#short')) {
        finalTitle = `${finalTitle} #Shorts`;
      }
      
      // Agregar #Shorts a la descripción si no está presente
      if (!finalDescription.toLowerCase().includes('#shorts')) {
        finalDescription = `${finalDescription}\n\n#Shorts #YouTubeShorts`;
      }
      
      console.log('✅ Título optimizado para Shorts:', finalTitle);
      console.log('✅ Descripción optimizada para Shorts');
    }

    // Configurar cliente OAuth2
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/youtube/oauth/callback`
    );

    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    // Verificar si el token es válido o necesita renovación
    try {
      await oauth2Client.getAccessToken();
    } catch (error: any) {
      console.error('Error con el token de acceso:', error.message);
      return res.status(401).json({ 
        error: 'Token de acceso expirado o inválido. Por favor vuelve a autenticarte.',
        code: 'INVALID_TOKEN' 
      });
    }

    const youtube = google.youtube({ version: "v3", auth: oauth2Client });

    // Determinar estado de privacidad y programación
    const isPublishingNow = publishNow === 'true';
    let privacyStatus = 'public';
    let publishAt = undefined;

    if (!isPublishingNow && scheduledPublishTime) {
      privacyStatus = 'private'; // YouTube requiere que videos programados sean privados hasta la fecha
      publishAt = scheduledPublishTime;
      console.log('Video programado para:', publishAt);
    }

    console.log('Subiendo video a YouTube...');
    console.log('Título final:', finalTitle);
    console.log('Descripción length:', finalDescription.length);
    console.log('Publicar ahora:', isPublishingNow);
    console.log('Estado de privacidad:', privacyStatus);
    console.log('Es Short:', isShort);
    
    const requestBody: any = {
      snippet: {
        title: finalTitle,
        description: finalDescription,
        tags: tags.length > 0 ? tags : undefined,
        categoryId: isShort ? "24" : "22", // 24 = Entertainment para Shorts, 22 = People & Blogs para videos normales
      },
      status: {
        privacyStatus: privacyStatus,
      },
    };

    // Agregar fecha de publicación si está programado
    if (publishAt) {
      requestBody.status.publishAt = publishAt;
    }
    
    const response = await youtube.videos.insert({
      part: ["snippet", "status"],
      requestBody: requestBody,
      media: {
        body: fs.createReadStream(videoFile.filepath),
      },
    });

    console.log('✅ Video subido exitosamente:', response.data.id);

    // Limpiar archivo temporal
    try {
      fs.unlinkSync(videoFile.filepath);
      console.log('Archivo temporal eliminado');
    } catch (cleanupError) {
      console.warn('No se pudo eliminar archivo temporal:', cleanupError);
    }

    const successMessage = isPublishingNow 
      ? (isShort ? "Short subido y publicado exitosamente" : "Video subido y publicado exitosamente")
      : `${isShort ? 'Short' : 'Video'} subido y programado para ${new Date(publishAt!).toLocaleString('es-ES')}`;

    res.status(200).json({ 
      success: true,
      message: successMessage, 
      videoId: response.data.id,
      videoUrl: `https://www.youtube.com/watch?v=${response.data.id}`,
      isScheduled: !isPublishingNow,
      scheduledFor: publishAt || null,
      privacyStatus: privacyStatus,
      isShort: isShort, // Información sobre si se detectó como Short
      seo: {
        title: finalTitle,
        description: finalDescription,
        tags: tags,
        hashtags: hashtags
      },
      uploadedTitle: finalTitle,
      uploadedDescription: finalDescription
    });
  } catch (error: any) {
    console.error("=== ERROR SUBIENDO VIDEO ===");
    console.error('Error:', error);
    
    // Si el token ha expirado
    if (error.code === 401) {
      return res.status(401).json({ 
        error: "Token expirado. Por favor, vuelve a autenticarte.",
        needsAuth: true
      });
    }
    
    res.status(500).json({ 
      success: false,
      error: "Error subiendo video", 
      details: error.message,
      needsAuth: error.code === 401 
    });
  }
}
