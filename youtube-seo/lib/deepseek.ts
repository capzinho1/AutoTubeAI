// Servicio para generar SEO con IA (Groq y OpenRouter - solo APIs gratuitas)
import OpenAI from 'openai';

// Cliente principal: Groq (GRATUITO - muy rápido)
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

// Cliente alternativo con OpenRouter (modelos gratuitos)
const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || 'sk-or-v1-dummy',
  baseURL: 'https://openrouter.ai/api/v1',
});

export interface SEOData {
  title: string;
  description: string;
  tags: string[];
  hashtags: string[];
  suggestions: string[];
}

export async function generateSEO(title?: string, description?: string, topic?: string): Promise<SEOData> {
  console.log('=== GENERANDO SEO CON IA ===');
  console.log('Título:', title || 'No especificado');
  console.log('Descripción:', description || 'No especificada');
  console.log('Tema:', topic || 'No especificado');
  console.log('Groq API Key presente:', !!process.env.GROQ_API_KEY);
  console.log('OpenRouter API Key presente:', !!process.env.OPENROUTER_API_KEY);

  // Crear contexto para el prompt basado en la información disponible
  let videoContext = '';
  if (title) videoContext += `TÍTULO DEL VIDEO: "${title}"\n`;
  if (description) videoContext += `DESCRIPCIÓN DEL VIDEO: "${description}"\n`;
  if (topic) videoContext += `TEMA PRINCIPAL: "${topic}"\n`;
  
  // Si no hay información, usar fallback
  if (!title && !description && !topic) {
    console.log('No se proporcionó información, usando fallback genérico');
    return generateFallbackSEO('video genérico');
  }

  const prompt = `
Genera un SEO optimizado para YouTube basado en esta información del video:

${videoContext}

IMPORTANTE: El contenido debe ser 100% coherente con la información proporcionada, NO genérico.

Requisitos:
• Título atractivo con emojis relevantes (máximo 89 caracteres) que mejore el título original o use la información disponible
• Descripción natural con emojis que complemente la información del video
• 5 tags específicos relacionados directamente con el contenido
• 3 hashtags relevantes
• 3 sugerencias prácticas específicas

Usa estilo conversacional argentino (vos, tenés, suscribite), sé específico sobre el contenido real del video y SIEMPRE incluí emojis apropiados en el título y descripción.

RESPONDE SOLO EN JSON:
{
  "title": "Título optimizado con emojis basado en la información del video (máximo 89 caracteres)",
  "description": "Descripción específica con emojis que complemente la información del video, con beneficios concretos, call-to-action natural y enlaces a redes. Mínimo 300 caracteres.",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"],
  "suggestions": ["Sugerencia específica 1", "Sugerencia específica 2", "Sugerencia específica 3"]
}`;

  // Añadir logs más detallados
  console.log('=== DIAGNÓSTICO DE APIs ===');
  const status = {
    groq: !!(process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'tu_groq_api_key_aqui'),
    openrouter: !!(process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY !== 'sk-or-v1-dummy')
  };
  console.log('Estado APIs:', status);
  console.log('Groq Key:', process.env.GROQ_API_KEY ? `${process.env.GROQ_API_KEY.substring(0, 10)}...` : 'No configurada');
  console.log('OpenRouter Key:', process.env.OPENROUTER_API_KEY ? `${process.env.OPENROUTER_API_KEY.substring(0, 10)}...` : 'No configurada');

  try {
    let response;
    let aiProvider = 'fallback';
    
    // 1. Intentar primero con Groq (GRATUITO y rápido)
    if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'tu_groq_api_key_aqui') {
      try {
        console.log('🚀 Intentando con Groq (gratuito)...');
        response = await groq.chat.completions.create({
          model: 'llama-3.1-8b-instant', // Modelo rápido y gratuito
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1000,
          temperature: 0.7,
        });
        
        if (response?.choices?.[0]?.message?.content) {
          aiProvider = 'Groq';
        } else {
          throw new Error('Respuesta vacía de Groq');
        }
      } catch (groqError) {
        console.log('❌ Groq falló:', groqError);
        response = null;
      }
    }

    // 2. Si Groq falla, intentar con OpenRouter (GRATUITO)
    if (!response && process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY !== 'sk-or-v1-dummy') {
      try {
        console.log('🚀 Intentando con OpenRouter (gratuito)...');
        response = await openrouter.chat.completions.create({
          model: 'microsoft/phi-3-mini-128k-instruct:free', // Modelo gratuito
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1000,
          temperature: 0.7,
        });
        
        if (response?.choices?.[0]?.message?.content) {
          aiProvider = 'OpenRouter';
        } else {
          throw new Error('Respuesta vacía de OpenRouter');
        }
      } catch (openrouterError) {
        console.log('❌ OpenRouter falló:', openrouterError);
        response = null;
      }
    }

    if (response?.choices?.[0]?.message?.content) {
      console.log(`✅ SEO generado exitosamente con ${aiProvider}`);
      const content = response.choices[0].message.content.trim();
      console.log('Respuesta cruda:', content.substring(0, 200) + '...');
      
      // Intentar parsear JSON
      let jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const seoData = JSON.parse(jsonMatch[0]);
          console.log('SEO parseado exitosamente:', seoData);
          
          // Validar estructura
          if (!seoData.title || !seoData.description || !seoData.tags || !seoData.hashtags) {
            throw new Error('Estructura JSON incompleta');
          }

          // Extender descripción si es muy corta y agregar hashtags
          let finalDescription = seoData.description;
          
          if (finalDescription.length < 300) {
            finalDescription += `

📣 ¿Te gustó el video? Suscribite para más contenido como este.
Dejá tu comentario sobre qué parte te pareció más útil 👇

🔗 Seguime en redes:
• Instagram: @tucuenta
• TikTok: @tucuenta
• Twitter: @tucuenta

¡Gracias por ver el video! 🙌`;
          }

          // Agregar hashtags al final de la descripción
          const hashtags = Array.isArray(seoData.hashtags) ? seoData.hashtags.slice(0, 3) : ['#video', '#tutorial', '#contenido'];
          finalDescription += `\n\n${hashtags.join(' ')}`;

          const result = {
            title: seoData.title.substring(0, 60), // Asegurar límite de título
            description: finalDescription,
            tags: Array.isArray(seoData.tags) ? seoData.tags.slice(0, 5) : ['video', 'tutorial', 'contenido', 'educativo', 'youtube'],
            hashtags: hashtags,
            suggestions: Array.isArray(seoData.suggestions) ? seoData.suggestions.slice(0, 3) : ['Compartí el video si te gustó', 'Comentá qué tema querés ver', 'Suscribite para más contenido']
          };

          console.log('=== RESULTADO FINAL ===');
          console.log('Título:', result.title);
          console.log('Descripción length:', result.description.length);
          console.log('Tags:', result.tags);
          console.log('Hashtags:', result.hashtags);
          
          return result;
        } catch (parseError) {
          console.error('Error parseando JSON:', parseError);
        }
      }
    }

    // Si todo falla, usar fallback
    console.log('⚠️ Todas las APIs fallaron, usando fallback');
    return generateFallbackSEO(topic || title || description || 'contenido');
    
  } catch (error) {
    console.error('Error general generando SEO:', error);
    return generateFallbackSEO(topic || title || description || 'contenido');
  }
}

// Función de fallback sin timestamps
function generateFallbackSEO(topic: string): SEOData {
  console.log('🔄 Generando SEO de fallback para:', topic);
  
  const cleanTopic = topic.toLowerCase();
  let titleTemplate: string;
  let specificDescription: string;
  let tags: string[];
  let hashtags: string[];
  
  // Patrones específicos según el tema sin timestamps
  if (cleanTopic.includes('como') && cleanTopic.includes('funciona')) {
    const subject = topic.replace(/como\s+funciona\s*/i, '').trim();
    titleTemplate = `🧠 Cómo Funciona ${subject} - Explicación Completa y Fácil`;
    specificDescription = `¡Hola! 👋 En este video te explico de manera simple y clara cómo funciona ${subject}. Vas a entender todos los procesos, mecanismos y principios detrás de ${subject} de una forma que cualquiera puede comprender.

🎯 En este video aprendés:
• Los fundamentos básicos de ${subject}
• Cómo funciona paso a paso explicado
• Los procesos internos más importantes
• Ejemplos prácticos y aplicaciones reales
• Conceptos clave que necesitás saber

💡 Si te sirvió la explicación, dale LIKE 👍 y SUSCRIBITE 🔔 para más videos educativos. ¿Qué otro tema querés que explique?

🔗 Seguime en redes para más contenido:
• Instagram: @tucuenta
• TikTok: @tucuenta

¡Gracias por ver! 🙌`;
    tags = ['explicacion', 'como-funciona', subject.toLowerCase(), 'educativo', 'tutorial'];
    hashtags = ['#explicacion', '#educativo', '#aprender'];
    
  } else if (cleanTopic.includes('receta') || cleanTopic.includes('cocinar') || cleanTopic.includes('licor')) {
    titleTemplate = `🍽️ ${topic} FÁCIL y Delicioso - Receta Paso a Paso`;
    specificDescription = `¡Hola! Te enseño a hacer ${topic} de manera súper fácil y con ingredientes que tenés en casa. Esta receta es perfecta para cualquier ocasión y te va a quedar deliciosa.

🎯 En este video aprendés:
• Los ingredientes exactos para ${topic}
• La técnica correcta paso a paso
• Trucos para que quede perfecto
• Variaciones y tips de chef
• Cómo presentarlo de manera profesional

💡 Si te gustó la receta, dale LIKE y SUSCRIBITE para más recetas fáciles. ¿Qué receta querés que haga próximamente?

🔗 Seguime para más recetas:
• Instagram: @tucuenta
• TikTok: @tucuenta

¡Buen provecho! 🍽️`;
    tags = ['receta', 'cocina', 'facil', 'casero', 'comida'];
    hashtags = ['#receta', '#cocina', '#comida'];
    
  } else if (cleanTopic.includes('tecnologia') || cleanTopic.includes('app') || cleanTopic.includes('tech')) {
    titleTemplate = `💻 ${topic} - Tutorial Completo 2025 | Guía Definitiva`;
    specificDescription = `¡Hola! 👋 Te explico todo sobre ${topic} de manera simple y práctica. Vas a aprender a usarlo correctamente y sacarle el máximo provecho.

🎯 Al terminar vas a poder:
• Usar ${topic} como un profesional
• Aplicar las mejores técnicas
• Evitar errores típicos de principiantes
• Optimizar tu experiencia
• Conocer trucos avanzados

💡 Si te sirvió, dale LIKE 👍 y SUSCRIBITE 🔔 para más tutoriales de tecnología. ¿Qué tema tech querés que cubra?

🔗 Seguime en redes:
• Instagram: @tucuenta
• TikTok: @tucuenta

¡Gracias por ver! 💻`;
    tags = ['tecnologia', 'tutorial', 'tech', 'digital', 'app'];
    hashtags = ['#tech', '#tutorial', '#tecnologia'];
    
  } else {
    // Para cualquier otro tema genérico
    titleTemplate = `🎯 ${topic} - Guía Completa y Práctica | Todo lo que Necesitás Saber`;
    specificDescription = `¡Hola! 👋 En este video te enseño todo sobre ${topic} de manera práctica y fácil de entender. Vas a dominar este tema completamente.

🎯 Vas a aprender:
• Todo lo esencial sobre ${topic}
• Las mejores prácticas
• Cómo aplicarlo correctamente
• Consejos de experto
• Tips que realmente funcionan

💡 Si te gustó el contenido, dale LIKE y SUSCRIBITE para más videos útiles. ¿Qué tema querés que cubra próximamente?

🔗 Seguime en redes sociales:
• Instagram: @tucuenta
• TikTok: @tucuenta

¡Nos vemos en el próximo video! 🚀`;
    tags = ['tutorial', 'guia', 'consejos', 'tips', topic.toLowerCase()];
    hashtags = ['#tutorial', '#tips', '#guia'];
  }

  return {
    title: titleTemplate.substring(0, 89),
    description: specificDescription + `\n\n${hashtags.join(' ')}`,
    tags: tags,
    hashtags: hashtags,
    suggestions: [
      'Dale LIKE si te sirvió el video',
      'Suscribite para más contenido como este',
      'Comentá qué tema querés ver próximamente'
    ]
  };
}

// Función para verificar si hay alguna API configurada
export function isAIConfigured(): boolean {
  return !!(process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'tu_groq_api_key_aqui') ||
         !!(process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY !== 'sk-or-v1-dummy');
}

// Función para obtener el estado de los proveedores
export function getAIProviderStatus() {
  return {
    groq: !!(process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'tu_groq_api_key_aqui'),
    openrouter: !!(process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY !== 'sk-or-v1-dummy'),
    totalConfigured: Number(!!(process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'tu_groq_api_key_aqui')) +
                    Number(!!(process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY !== 'sk-or-v1-dummy'))
  };
}
