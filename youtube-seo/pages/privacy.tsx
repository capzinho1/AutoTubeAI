import Head from 'next/head';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/styles.module.css";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Política de Privacidad - AutoTubeAI</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.uploadContainer}>
        <Navbar />
        
        <div className={styles.uploadForm}>
          <h1 className={styles.uploadTitle}>Política de Privacidad</h1>
          <p className={styles.uploadSubtitle}>
            AutoTubeAI - Actualizada: {new Date().toLocaleDateString('es-ES')}
          </p>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            padding: '2rem', 
            borderRadius: '16px', 
            border: '1px solid rgba(255, 255, 255, 0.1)',
            lineHeight: '1.6',
            fontSize: '1rem'
          }}>
            
            <h2 style={{ color: '#6c63ff', marginBottom: '1rem' }}>📋 Información que Recopilamos</h2>
            <p>AutoTubeAI recopila únicamente la información necesaria para proporcionar nuestros servicios:</p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '2rem' }}>
              <li>Información de tu cuenta de Google/YouTube (nombre, email, foto de perfil)</li>
              <li>Videos que subes a través de nuestra plataforma</li>
              <li>Metadatos de videos (títulos, descripciones, tags) para optimización SEO</li>
            </ul>

            <h2 style={{ color: '#ff6b9d', marginBottom: '1rem' }}>🔒 Cómo Usamos tu Información</h2>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '2rem' }}>
              <li>Subir videos a tu canal de YouTube</li>
              <li>Generar optimizaciones SEO usando inteligencia artificial</li>
              <li>Mejorar la experiencia del usuario en nuestra plataforma</li>
              <li>Proporcionar soporte técnico cuando sea necesario</li>
            </ul>

            <h2 style={{ color: '#6c63ff', marginBottom: '1rem' }}>🛡️ Protección de Datos</h2>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '2rem' }}>
              <li>No almacenamos permanentemente tus videos</li>
              <li>Los tokens de acceso se almacenan de forma segura y encriptada</li>
              <li>No compartimos tu información personal con terceros</li>
              <li>Cumplimos con las políticas de privacidad de Google y YouTube</li>
            </ul>

            <h2 style={{ color: '#ff6b9d', marginBottom: '1rem' }}>📡 APIs y Servicios Externos</h2>
            <p>AutoTubeAI utiliza:</p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '2rem' }}>
              <li><strong>YouTube Data API v3:</strong> Para subir videos y gestionar metadatos</li>
              <li><strong>Google OAuth 2.0:</strong> Para autenticación segura</li>
              <li><strong>GROQ/OpenRouter APIs:</strong> Para generar optimizaciones SEO con IA</li>
            </ul>

            <h2 style={{ color: '#6c63ff', marginBottom: '1rem' }}>✋ Tus Derechos</h2>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '2rem' }}>
              <li>Puedes revocar el acceso en cualquier momento desde tu cuenta de Google</li>
              <li>Puedes solicitar la eliminación de tus datos</li>
              <li>Puedes acceder a la información que tenemos sobre ti</li>
            </ul>

            <h2 style={{ color: '#ff6b9d', marginBottom: '1rem' }}>📞 Contacto</h2>
            <p>Si tienes preguntas sobre esta política de privacidad, contáctanos en:</p>
            <p style={{ 
              background: 'rgba(108, 99, 255, 0.1)', 
              padding: '1rem', 
              borderRadius: '8px',
              border: '1px solid rgba(108, 99, 255, 0.3)',
              marginTop: '1rem'
            }}>
              📧 <strong>Email:</strong> amunozpincheira@gmail.com<br />
              🌐 <strong>GitHub:</strong> https://github.com/capzinho1/AutoTubeAI
            </p>

            <div style={{ 
              marginTop: '2rem', 
              padding: '1rem', 
              background: 'rgba(255, 107, 157, 0.1)', 
              borderRadius: '8px',
              border: '1px solid rgba(255, 107, 157, 0.3)',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>
                <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
              </p>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}
