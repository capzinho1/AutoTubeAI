// Página de configuración OAuth simplificada
import { useState, useEffect } from 'react';

export default function OAuthConfig() {
  const [config, setConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/debug/check-config')
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div style={{ textAlign: 'center' }}>Cargando configuración...</div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Configuración OAuth
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Configura la autenticación con YouTube
        </p>
      </div>

      <nav style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <a href="/" className="btn btn-secondary" style={{ marginRight: '1rem' }}>
          ← Inicio
        </a>
        <a href="/upload" className="btn btn-primary">
          Ir a Upload
        </a>
      </nav>

      {/* URI de redirección requerida */}
      <div className="card mb-6">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--warning-color)' }}>
          📋 URI de Redirección Requerida
        </h2>
        <div style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          padding: '1rem', 
          borderRadius: '0.375rem',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          marginBottom: '1rem',
          wordBreak: 'break-all'
        }}>
          {config?.config?.expectedCallbackUrl}
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          <strong>Esta URL DEBE estar configurada en Google Cloud Console</strong>
        </p>
      </div>

      {/* Pasos de configuración */}
      <div className="card mb-6">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          🔧 Pasos para Configurar
        </h2>
        
        {config?.instructions?.map((instruction: any, index: number) => (
          <div 
            key={instruction.step} 
            style={{ 
              marginBottom: '1.5rem',
              padding: '1rem',
              backgroundColor: instruction.critical ? 'rgba(220, 53, 69, 0.1)' : 'var(--bg-secondary)',
              borderRadius: '0.375rem',
              border: instruction.critical ? '1px solid var(--danger-color)' : '1px solid var(--border-color)'
            }}
          >
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ 
                display: 'inline-block',
                width: '24px',
                height: '24px',
                backgroundColor: instruction.critical ? 'var(--danger-color)' : 'var(--accent-color)',
                color: 'white',
                borderRadius: '50%',
                textAlign: 'center',
                lineHeight: '24px',
                fontSize: '0.875rem',
                marginRight: '0.5rem'
              }}>
                {instruction.step}
              </span>
              {instruction.title}
            </h3>
            <p style={{ marginLeft: '2rem', color: 'var(--text-secondary)' }}>
              {instruction.description}
            </p>
            {instruction.url && (
              <a 
                href={instruction.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginLeft: '2rem', marginTop: '0.5rem', fontSize: '0.875rem' }}
              >
                Abrir →
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Estado actual */}
      <div className="card mb-6">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          📊 Estado Actual
        </h2>
        
        <div className="grid md:grid-cols-2">
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem' }}>
              Configuración:
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'var(--success-color)', marginRight: '0.5rem' }}>✅</span>
                Client ID: {config?.config?.clientId?.substring(0, 20)}...
              </li>
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  color: config?.config?.hasClientSecret ? 'var(--success-color)' : 'var(--danger-color)', 
                  marginRight: '0.5rem' 
                }}>
                  {config?.config?.hasClientSecret ? '✅' : '❌'}
                </span>
                Client Secret {config?.config?.hasClientSecret ? 'configurado' : 'NO configurado'}
              </li>
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'var(--accent-color)', marginRight: '0.5rem' }}>🌐</span>
                Base URL: {config?.config?.baseUrl}
              </li>
            </ul>
          </div>
          
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem' }}>
              Información:
            </h3>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--bg-secondary)', 
              borderRadius: '0.375rem',
              fontSize: '0.875rem'
            }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Error actual:</strong> {config?.error}
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                <strong>Solución:</strong> {config?.solution}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="grid md:grid-cols-3">
        <a 
          href="https://console.cloud.google.com/apis/credentials"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ textAlign: 'center', padding: '1.5rem' }}
        >
          🔧 Credenciales<br/>
          <small>Configurar URI</small>
        </a>
        
        <a 
          href="https://console.cloud.google.com/apis/credentials/consent"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success"
          style={{ textAlign: 'center', padding: '1.5rem' }}
        >
          👥 Usuarios de Prueba<br/>
          <small>Agregar email</small>
        </a>
        
        <a 
          href="/upload"
          className="btn btn-secondary"
          style={{ textAlign: 'center', padding: '1.5rem' }}
        >
          🎬 Probar Upload<br/>
          <small>Después de configurar</small>
        </a>
      </div>

      {/* Nota importante */}
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: 'var(--bg-secondary)', 
        borderRadius: '0.375rem',
        textAlign: 'center'
      }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          <strong>Nota:</strong> Después de hacer cambios en Google Cloud Console, 
          puede tomar unos minutos en propagarse. Si sigues teniendo problemas, 
          espera 5-10 minutos e intenta de nuevo.
        </p>
      </div>

      {/* Debug info (colapsible) */}
      <details style={{ marginTop: '2rem' }}>
        <summary style={{ 
          cursor: 'pointer', 
          padding: '1rem', 
          backgroundColor: 'var(--bg-secondary)', 
          borderRadius: '0.375rem',
          fontWeight: '600'
        }}>
          🔍 Información técnica de debug
        </summary>
        <div style={{ 
          marginTop: '0.5rem', 
          padding: '1rem', 
          backgroundColor: 'var(--bg-secondary)', 
          borderRadius: '0.375rem' 
        }}>
          <pre style={{ 
            fontSize: '0.75rem', 
            overflow: 'auto',
            fontFamily: 'monospace'
          }}>
            {JSON.stringify(config, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  );
}
