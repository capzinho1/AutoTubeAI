import Head from 'next/head';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/styles.module.css";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Términos de Servicio - AutoTubeAI</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.uploadContainer}>
        <Navbar />
        
        <div className={styles.uploadForm}>
          <h1 className={styles.uploadTitle}>Términos de Servicio</h1>
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
            
            <h2 style={{ color: '#6c63ff', marginBottom: '1rem' }}>📋 Aceptación de los Términos</h2>
            <p>Al utilizar AutoTubeAI, aceptas estar sujeto a estos términos de servicio. Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestra aplicación.</p>

            <h2 style={{ color: '#ff6b9d', marginBottom: '1rem' }}>🎯 Descripción del Servicio</h2>
            <p>AutoTubeAI es una aplicación web que permite:</p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '2rem' }}>
              <li>Optimizar metadatos de videos usando inteligencia artificial</li>
              <li>Subir videos directamente a YouTube</li>
              <li>Generar títulos, descripciones y tags SEO optimizados</li>
              <li>Programar publicaciones de videos</li>
            </ul>

            <h2 style={{ color: '#6c63ff', marginBottom: '1rem' }}>👤 Cuentas de Usuario</h2>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '2rem' }}>
              <li>Debes tener una cuenta válida de Google/YouTube para usar el servicio</li>
              <li>Eres responsable de mantener la seguridad de tu cuenta</li>
              <li>Debes proporcionar información precisa y actualizada</li>
              <li>No puedes compartir tu cuenta con terceros</li>
            </ul>

            <h2 style={{ color: '#ff6b9d', marginBottom: '1rem' }}>🎬 Uso del Contenido</h2>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '2rem' }}>
              <li>Conservas todos los derechos sobre tu contenido de video</li>
              <li>Garantizas que tienes derecho a subir el contenido que proporcionas</li>
              <li>No almacenamos permanentemente tus videos en nuestros servidores</li>
              <li>El contenido debe cumplir con las políticas de YouTube y Google</li>
            </ul>

            <h2 style={{ color: '#6c63ff', marginBottom: '1rem' }}>🚫 Uso Prohibido</h2>
            <p>No puedes usar AutoTubeAI para:</p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '2rem' }}>
              <li>Subir contenido ilegal, difamatorio o que infrinja derechos de autor</li>
              <li>Realizar actividades que puedan dañar o sobrecargar nuestros servicios</li>
              <li>Intentar acceder no autorizado a nuestros sistemas</li>
              <li>Violar las políticas de YouTube o Google</li>
            </ul>

            <h2 style={{ color: '#ff6b9d', marginBottom: '1rem' }}>⚠️ Limitación de Responsabilidad</h2>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '2rem' }}>
              <li>AutoTubeAI se proporciona "tal como está" sin garantías</li>
              <li>No garantizamos resultados específicos de SEO o engagement</li>
              <li>No somos responsables por pérdidas de contenido o datos</li>
              <li>Tu uso del servicio es bajo tu propio riesgo</li>
            </ul>

            <h2 style={{ color: '#6c63ff', marginBottom: '1rem' }}>🔄 Modificaciones</h2>
            <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación.</p>

            <h2 style={{ color: '#ff6b9d', marginBottom: '1rem' }}>⚖️ Ley Aplicable</h2>
            <p>Estos términos se rigen por las leyes de España y cualquier disputa será resuelta en los tribunales competentes.</p>

            <h2 style={{ color: '#6c63ff', marginBottom: '1rem' }}>📞 Contacto</h2>
            <p>Si tienes preguntas sobre estos términos, contáctanos en:</p>
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
