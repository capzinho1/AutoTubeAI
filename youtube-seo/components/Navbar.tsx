import Link from "next/link";
import styles from "../styles/styles.module.css";

export default function Navbar() {
  return (
    <nav style={{
      padding: 'clamp(0.5rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem)',
      background: 'rgba(30, 30, 47, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      flexWrap: 'wrap',
      gap: 'clamp(0.5rem, 2vw, 1rem)',
      minHeight: '60px'
    }}>
      <Link 
        href="/" 
        style={{
          textDecoration: 'none',
          color: '#fff',
          fontWeight: '700',
          fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
          background: 'linear-gradient(45deg, #6c63ff, #ff6b9d)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          whiteSpace: 'nowrap'
        }}
      >
        🤖 AutoTubeAI
      </Link>
      
      <div style={{ 
        display: 'flex', 
        gap: 'clamp(0.5rem, 2vw, 1rem)', 
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <Link 
          href="/" 
          style={{
            textDecoration: 'none',
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(108, 99, 255, 0.2)';
            e.currentTarget.style.borderColor = '#6c63ff';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          🏠 Inicio
        </Link>
        
        <Link 
          href="/upload" 
          style={{
            textDecoration: 'none',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            background: 'linear-gradient(45deg, #6c63ff, #ff6b9d)',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(108, 99, 255, 0.3)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(108, 99, 255, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(108, 99, 255, 0.3)';
          }}
        >
          🚀 Subir Video
        </Link>
        
        <Link 
          href="/privacy" 
          style={{
            textDecoration: 'none',
            color: '#fff',
            padding: '0.25rem 0.5rem',
            borderRadius: '6px',
            fontSize: '0.85rem',
            opacity: 0.7,
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.borderColor = 'rgba(255, 107, 157, 0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.opacity = '0.7';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          🔒 Privacidad
        </Link>
        
        <Link 
          href="/terms" 
          style={{
            textDecoration: 'none',
            color: '#fff',
            padding: '0.25rem 0.5rem',
            borderRadius: '6px',
            fontSize: '0.85rem',
            opacity: 0.7,
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.borderColor = 'rgba(108, 99, 255, 0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.opacity = '0.7';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          📋 Términos
        </Link>
      </div>
    </nav>
  );
}
