import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(20, 20, 35, 0.9)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '2rem 1rem 1rem 1rem',
      marginTop: '4rem',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Información de la app */}
        <div>
          <h3 style={{ 
            color: '#6c63ff', 
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #6c63ff, #ff6b9d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🤖 AutoTubeAI
          </h3>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            lineHeight: '1.6',
            fontSize: '0.9rem'
          }}>
            Optimiza tu contenido de YouTube con inteligencia artificial. 
            Genera títulos, descripciones y tags SEO de forma automática.
          </p>
        </div>

        {/* Enlaces legales */}
        <div>
          <h4 style={{ color: '#ff6b9d', marginBottom: '1rem' }}>📋 Legal</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link 
              href="/privacy" 
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'color 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#6c63ff'}
              onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
            >
              🔒 Política de Privacidad
            </Link>
            <Link 
              href="/terms" 
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'color 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#ff6b9d'}
              onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
            >
              📋 Términos de Servicio
            </Link>
          </div>
        </div>

        {/* Contacto */}
        <div>
          <h4 style={{ color: '#6c63ff', marginBottom: '1rem' }}>📞 Contacto</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a 
              href="https://github.com/capzinho1/AutoTubeAI" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'color 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#6c63ff'}
              onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
            >
              🌐 GitHub Repository
            </a>
            <a 
              href="mailto:amunozpincheira@gmail.com"
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'color 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#ff6b9d'}
              onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
            >
              📧 amunozpincheira@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '1rem',
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '0.85rem'
      }}>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} AutoTubeAI. Desarrollado con ❤️ para creadores de contenido.
        </p>
        <p style={{ margin: '0.5rem 0 0 0' }}>
          Powered by OpenAI, YouTube API, y Next.js
        </p>
      </div>
    </footer>
  );
}
