// API route para generar SEO con IA (Groq y OpenRouter - solo APIs gratuitas)
import { NextApiRequest, NextApiResponse } from 'next';
import { generateSEO, isAIConfigured, getAIProviderStatus } from '../../../lib/deepseek';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    // Verificar configuración de al menos una API
    if (!isAIConfigured()) {
      const status = getAIProviderStatus();
      return res.status(500).json({ 
        error: 'No hay APIs de IA configuradas',
        message: 'Configura al menos una: GROQ_API_KEY o OPENROUTER_API_KEY en .env.local',
        status
      });
    }

    const { title, description, topic } = req.body;

    // Verificar que al menos uno de los campos esté presente
    if ((!title && !description && !topic) || 
        (title && typeof title !== 'string') || 
        (description && typeof description !== 'string') ||
        (topic && typeof topic !== 'string')) {
      return res.status(400).json({ 
        error: 'Se requiere al menos título, descripción o tema del video'
      });
    }

    // Verificar longitud mínima si se proporciona
    const hasValidInput = (title && title.length >= 3) || 
                         (description && description.length >= 3) || 
                         (topic && topic.length >= 3);

    if (!hasValidInput) {
      return res.status(400).json({ 
        error: 'Contenido muy corto',
        message: 'El título, descripción o tema debe tener al menos 3 caracteres'
      });
    }

    console.log('=== API AI SEO: Generando SEO para:');
    console.log('Título:', title || 'No especificado');
    console.log('Descripción:', description || 'No especificada');
    console.log('Tema:', topic || 'No especificado');
    console.log('Estado de APIs:', getAIProviderStatus());

    // Generar SEO con la mejor API disponible (Groq -> OpenRouter -> Fallback)
    const seoData = await generateSEO(title, description, topic);

    console.log('SEO generado:', seoData);

    return res.status(200).json({
      success: true,
      seo: seoData,
      provider: 'AI', // El proveedor específico se loggea en consola
      message: 'SEO generado exitosamente'
    });

  } catch (error: any) {
    console.error('Error en API SEO:', error);
    
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message || 'Error generando SEO',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
