# 🚀 AutoTubeAI - YouTube SEO Optimizer

**AutoTubeAI** es una aplicación web moderna que utiliza inteligencia artificial para optimizar y subir videos a YouTube de manera automatizada.

## ✨ Características

- 🤖 **Optimización SEO con IA**: Genera títulos, descripciones y tags optimizados automáticamente
- 📱 **Interfaz Moderna**: Diseño glassmorphism responsive y elegante
- 🔐 **Autenticación OAuth**: Conexión segura con la API de YouTube
- ⏰ **Programación de Videos**: Sube inmediatamente o programa para más tarde
- 📱 **Soporte YouTube Shorts**: Detección automática y manual de contenido Short
- ✏️ **Edición Manual**: Modifica cualquier campo generado por la IA
- 🎯 **Previsualización en Tiempo Real**: Ve el SEO optimizado antes de subir

## 🛠️ Tecnologías

- **Frontend**: Next.js, TypeScript, React
- **Estilos**: CSS Modules con diseño glassmorphism
- **IA**: DeepSeek API para optimización SEO
- **YouTube**: YouTube Data API v3
- **Autenticación**: OAuth 2.0

## 🚀 Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/autotube-ai.git
   cd autotube-ai
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env.local` con:
   ```env
   YOUTUBE_CLIENT_ID=tu_youtube_client_id
   YOUTUBE_CLIENT_SECRET=tu_youtube_client_secret
   DEEPSEEK_API_KEY=tu_deepseek_api_key
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=tu_secret_aleatorio
   ```

4. **Ejecuta el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador:**
   Ve a `http://localhost:3000`

## 📋 Configuración de APIs

### YouTube API:
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la YouTube Data API v3
4. Crea credenciales OAuth 2.0
5. Añade `http://localhost:3000/api/youtube/oauth/callback` a URIs autorizadas

### DeepSeek API:
1. Regístrate en [DeepSeek](https://platform.deepseek.com/)
2. Obtén tu API key
3. Añádela a las variables de entorno

## 🎯 Uso

1. **Conecta tu cuenta de YouTube** haciendo clic en "Conectar con YouTube"
2. **Selecciona tu video** arrastrándolo o haciendo clic para seleccionar
3. **Completa la información** del video (título, descripción, tema)
4. **Revisa y edita** el SEO generado por la IA
5. **Configura opciones** de publicación (ahora o programado)
6. **Sube tu video** y disfruta de la optimización automática

## 📱 Características Principales

### 🎬 Subida de Videos
- Drag & drop para archivos de video
- Previsualización de información del archivo
- Soporte para múltiples formatos

### 🤖 Optimización con IA
- Títulos optimizados para SEO
- Descripciones detalladas y atractivas
- Tags relevantes y trending
- Hashtags populares
- Sugerencias personalizadas

### ⚙️ Opciones Avanzadas
- Publicación inmediata o programada
- Selector de fecha y hora moderno
- Marcado manual como YouTube Short
- Edición completa de todos los campos

### 🎨 Diseño Moderno
- Interfaz glassmorphism
- Totalmente responsive
- Animaciones suaves
- Tema oscuro elegante
- Gradientes y efectos visuales

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🔗 Enlaces


- [Issues](https://github.com/tu-usuario/autotube-ai/issues)


---

**Hecho con ❤️ para creadores de contenido que quieren optimizar su presencia en YouTube** 🚀
