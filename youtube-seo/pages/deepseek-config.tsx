// Página de instrucciones para configurar DeepSeek
import { useState } from 'react';

export default function DeepSeekConfig() {
  const [apiKey, setApiKey] = useState('');
  const [testResult, setTestResult] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);

  const testConnection = async () => {
    if (!apiKey.trim()) {
      alert('Ingresa tu API Key primero');
      return;
    }

    setIsTesting(true);
    try {
      const response = await fetch('/api/ai/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: 'test tutorial' })
      });
      
      const result = await response.json();
      setTestResult(result);
    } catch (error) {
      setTestResult({ error: 'Error probando conexión' });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Configurar DeepSeek IA
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          IA gratuita para generar SEO optimizado
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

      {/* Pasos de configuración */}
      <div className="card mb-6">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          🚀 Pasos para configurar DeepSeek (100% GRATIS)
        </h2>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ 
            padding: '1rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '0.375rem',
            marginBottom: '1rem',
            border: '1px solid var(--success-color)'
          }}>
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
                backgroundColor: 'var(--success-color)',
                color: 'white',
                borderRadius: '50%',
                textAlign: 'center',
                lineHeight: '24px',
                fontSize: '0.875rem',
                marginRight: '0.5rem'
              }}>
                1
              </span>
              Registrarse en DeepSeek
            </h3>
            <p style={{ marginLeft: '2rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Ve a <strong>platform.deepseek.com</strong> y crea una cuenta gratuita
            </p>
            <a 
              href="https://platform.deepseek.com/sign_up"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ marginLeft: '2rem', fontSize: '0.875rem' }}
            >
              🔗 Registrarse en DeepSeek
            </a>
          </div>

          <div style={{ 
            padding: '1rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '0.375rem',
            marginBottom: '1rem',
            border: '1px solid var(--accent-color)'
          }}>
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
                backgroundColor: 'var(--accent-color)',
                color: 'white',
                borderRadius: '50%',
                textAlign: 'center',
                lineHeight: '24px',
                fontSize: '0.875rem',
                marginRight: '0.5rem'
              }}>
                2
              </span>
              Obtener API Key
            </h3>
            <p style={{ marginLeft: '2rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Una vez registrado, ve a la sección "API Keys" y crea una nueva clave
            </p>
            <a 
              href="https://platform.deepseek.com/api_keys"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ marginLeft: '2rem', fontSize: '0.875rem' }}
            >
              🔑 Gestionar API Keys
            </a>
          </div>

          <div style={{ 
            padding: '1rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '0.375rem',
            border: '1px solid var(--warning-color)'
          }}>
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
                backgroundColor: 'var(--warning-color)',
                color: 'white',
                borderRadius: '50%',
                textAlign: 'center',
                lineHeight: '24px',
                fontSize: '0.875rem',
                marginRight: '0.5rem'
              }}>
                3
              </span>
              Configurar en el proyecto
            </h3>
            <p style={{ marginLeft: '2rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Edita el archivo <code style={{ backgroundColor: 'rgba(0,0,0,0.1)', padding: '0.25rem', borderRadius: '0.25rem' }}>.env.local</code> y reemplaza:
            </p>
            <div style={{ 
              marginLeft: '2rem',
              backgroundColor: '#1a1a1a', 
              color: '#00ff00',
              padding: '1rem', 
              borderRadius: '0.375rem',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              marginBottom: '1rem'
            }}>
              DEEPSEEK_API_KEY=tu_deepseek_api_key_aqui
            </div>
            <p style={{ marginLeft: '2rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              <strong>Importante:</strong> Reemplaza "tu_deepseek_api_key_aqui" con tu clave real
            </p>
          </div>
        </div>
      </div>

      {/* Prueba de conexión */}
      <div className="card mb-6">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          🧪 Probar Conexión
        </h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontWeight: '500' 
          }}>
            API Key de DeepSeek:
          </label>
          <input
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="input"
            style={{ marginBottom: '1rem' }}
          />
          <button
            onClick={testConnection}
            disabled={isTesting}
            className="btn btn-primary"
          >
            {isTesting ? '🔄 Probando...' : '🧪 Probar Conexión'}
          </button>
        </div>

        {testResult && (
          <div style={{ 
            padding: '1rem',
            backgroundColor: testResult.success ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)',
            borderRadius: '0.375rem',
            border: `1px solid ${testResult.success ? 'var(--success-color)' : 'var(--danger-color)'}`
          }}>
            <h4 style={{ marginBottom: '0.5rem' }}>Resultado:</h4>
            <pre style={{ fontSize: '0.75rem', overflow: 'auto' }}>
              {JSON.stringify(testResult, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Características */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          ✨ ¿Por qué DeepSeek?
        </h2>
        
        <div className="grid md:grid-cols-3" style={{ gap: '1rem' }}>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '0.375rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💸</div>
            <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>100% Gratis</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              API gratuita sin límites severos
            </p>
          </div>

          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '0.375rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚀</div>
            <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Muy Rápido</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Respuestas en segundos
            </p>
          </div>

          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '0.375rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
            <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>SEO Optimizado</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Especializado en marketing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
