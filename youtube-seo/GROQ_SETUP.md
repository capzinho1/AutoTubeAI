# 🚀 Configuración de Groq API (GRATUITA)

## ¿Por qué Groq?
- ✅ **Completamente gratuito**
- ✅ **14,400 tokens por minuto** (muy generoso)
- ✅ **Sin límite de requests diarias**
- ✅ **Extremadamente rápido**
- ✅ **Modelos de alta calidad** (Llama 3.1, Mixtral, Gemma)

## 📝 Pasos para configurar Groq:

### 1. Registrarse
1. Ve a https://console.groq.com/
2. Haz clic en "Sign Up" 
3. Regístrate con tu email o GitHub

### 2. Obtener API Key
1. Una vez dentro del dashboard, ve al menú lateral
2. Haz clic en "API Keys"
3. Haz clic en "Create API Key"
4. Dale un nombre descriptivo (ej: "YouTube SEO Tool")
5. Copia la API key (empieza con `gsk_...`)

### 3. Configurar en tu proyecto
1. Abre el archivo `.env.local`
2. Reemplaza `tu_groq_api_key_aqui` con tu API key real:
   ```
   GROQ_API_KEY=gsk_tu_api_key_real_aqui
   ```

### 4. ¡Listo!
Tu aplicación ahora usará Groq como proveedor principal para generar SEO.

## 🔄 Orden de prioridad de las APIs:
1. **Groq** (Gratuito - Principal)
2. **OpenRouter** (Gratuito - Respaldo)
3. **DeepSeek** (De pago - Solo si fallan las gratuitas)
4. **Fallback** (Datos predeterminados si todo falla)

## 📊 Modelos disponibles en Groq:
- `llama-3.1-8b-instant` (Rápido y eficiente - usado por defecto)
- `llama-3.1-70b-versatile` (Más potente)
- `mixtral-8x7b-32768` (Bueno para tareas complejas)
- `gemma-7b-it` (Alternativa de Google)

## 🔗 Enlaces útiles:
- **Dashboard:** https://console.groq.com/
- **Documentación:** https://console.groq.com/docs/quickstart
- **Playground:** https://console.groq.com/playground
- **Límites:** https://console.groq.com/settings/limits

---

**Nota:** Una vez que configures tu API key de Groq, ya no necesitarás pagar por DeepSeek para generar SEO. ¡Es completamente gratis!
