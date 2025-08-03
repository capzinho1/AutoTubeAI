# 🚀 GUÍA: Cómo permitir usuarios temporales

## ✅ CAMPOS OBLIGATORIOS COMPLETADOS

### Enlaces requeridos por Google:
- **🏠 Página principal:** https://tu-dominio.com (o https://localhost:3000 para testing)
- **🔒 Política de privacidad:** https://tu-dominio.com/privacy
- **📋 Términos de servicio:** https://tu-dominio.com/terms

### Para la configuración en Google Cloud Console:
```
Página principal de la aplicación: https://autotubeai-tu-deploy.vercel.app
Política de privacidad: https://autotubeai-tu-deploy.vercel.app/privacy
Términos de servicio: https://autotubeai-tu-deploy.vercel.app/terms
Correo de soporte: amunozpincheira@gmail.com
Correo del desarrollador: amunozpincheira@gmail.com
```

## MÉTODO 1: Usuarios de Prueba (INMEDIATO)

1. Ve a Google Cloud Console → "Pantalla de consentimiento OAuth"
2. En la sección "Usuarios de prueba" → "Agregar usuarios"
3. Añade los correos específicos que quieres que puedan usar la app
4. ¡Listo! Esos usuarios podrán autenticarse inmediatamente

## MÉTODO 2: Verificación Completa (1-2 semanas)

### Documentos que Google puede solicitar:
- **Política de privacidad** ✅ YA CREADA
- **Términos de servicio** ✅ YA CREADA
- **Video demo** de la aplicación
- **Justificación** de por qué necesitas los scopes de YouTube

### Información para la solicitud de verificación:
```
Nombre de la app: AutoTubeAI
Descripción: Aplicación de optimización SEO para videos de YouTube usando IA
Justificación de scopes:
- youtube.upload: Para subir videos optimizados directamente a YouTube
- userinfo.profile/email: Para identificar al usuario y mostrar información de la cuenta

Casos de uso:
1. Usuarios suben videos con metadatos optimizados por IA
2. Programación de publicaciones
3. Optimización automática de títulos, descripciones y tags
```

## MÉTODO 3: Dominio Verificado (RECOMENDADO)

1. **Registra un dominio** (ej: autotubeai.com)
2. **Verifica el dominio** en Google Search Console
3. **Añade el dominio verificado** en tu configuración OAuth
4. **Despliega la app** en ese dominio

Esto da más credibilidad y acelera la verificación.
