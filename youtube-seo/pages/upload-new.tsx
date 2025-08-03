import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Navbar from "../components/Navbar";
import styles from "../styles/styles.module.css";

interface SEOData {
  title: string;
  description: string;
  tags: string[];
  hashtags: string[];
  suggestions: string[];
}

export default function UploadNew() {
  const [file, setFile] = useState<File | null>(null);
  const [topic, setTopic] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [editableSEO, setEditableSEO] = useState<SEOData | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const checkAuth = () => {
      const accessToken = localStorage.getItem('youtube_access_token');
      const userInfoStr = localStorage.getItem('youtube_user_info');
      
      setIsAuthenticated(!!accessToken);
      if (userInfoStr) {
        try {
          setUserInfo(JSON.parse(userInfoStr));
        } catch (e) {
          console.error('Error parsing user info:', e);
        }
      }
    };
    
    checkAuth();
    const handleFocus = () => checkAuth();
    window.addEventListener('focus', handleFocus);
    
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Generar previsualización del SEO cuando cambia cualquier campo
  useEffect(() => {
    const hasContent = topic.length >= 3 || videoTitle.length >= 3 || videoDescription.length >= 5;
    
    if (hasContent) {
      const timeoutId = setTimeout(async () => {
        setLoadingPreview(true);
        try {
          const response = await fetch('/api/ai/seo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: videoTitle.trim() || undefined,
              description: videoDescription.trim() || undefined,
              topic: topic.trim() || undefined
            })
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          
          if (data && data.seo) {
            setEditableSEO(data.seo);
          }
        } catch (error) {
          console.error('Error generando previsualización:', error);
          setEditableSEO(null);
        } finally {
          setLoadingPreview(false);
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setEditableSEO(null);
    }
  }, [topic, videoTitle, videoDescription]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('Primero debes autenticarte con YouTube');
      return;
    }

    if (!file) {
      setError('Por favor selecciona un archivo de video');
      return;
    }

    if (!editableSEO) {
      setError('Espera a que se genere la previsualización del SEO');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('video', file);
      formData.append('title', editableSEO.title);
      formData.append('description', editableSEO.description);
      formData.append('tags', editableSEO.tags.join(','));

      // Obtener tokens de autenticación
      const accessToken = localStorage.getItem('youtube_access_token');
      const refreshToken = localStorage.getItem('youtube_refresh_token');

      if (!accessToken) {
        setError('Token de acceso no encontrado. Por favor vuelve a autenticarte.');
        return;
      }

      const response = await axios.post('/api/youtube/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`,
          'X-Refresh-Token': refreshToken || '',
        },
        timeout: 300000, // 5 minutos
      });

      setUploadResult(response.data);
    } catch (error: any) {
      console.error('Error en la subida:', error);
      
      // Manejar errores de autenticación específicamente
      if (error.response?.status === 401) {
        const errorData = error.response?.data;
        if (errorData?.code === 'NO_ACCESS_TOKEN' || errorData?.code === 'INVALID_TOKEN') {
          // Limpiar tokens y redirigir a autenticación
          localStorage.removeItem('youtube_access_token');
          localStorage.removeItem('youtube_refresh_token');
          localStorage.removeItem('youtube_user_info');
          setIsAuthenticated(false);
          setUserInfo(null);
          setError('Tu sesión ha expirado. Por favor vuelve a autenticarte con YouTube.');
        } else {
          setError('Error de autenticación. Por favor vuelve a conectar tu cuenta de YouTube.');
        }
      } else if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else if (error.code === 'ECONNABORTED') {
        setError('Tiempo de espera agotado. El video puede tardar más en procesarse.');
      } else {
        setError('Error al subir el video. Verifica tu conexión e intenta de nuevo.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Subir Video - AutoTubeAI</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.uploadContainer}>
        <Navbar />
        
        <div className={styles.uploadForm}>
          <h1 className={styles.uploadTitle}>� Subir Video con IA</h1>
          <p className={styles.uploadSubtitle}>
            Optimiza automáticamente tu contenido con inteligencia artificial
          </p>

          {!isAuthenticated ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🔐</div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Autenticación Requerida</h3>
              <p style={{ marginBottom: '2rem', opacity: 0.8, fontSize: '1.1rem' }}>
                Conecta tu cuenta de YouTube para comenzar a subir videos optimizados.
              </p>
              <button 
                onClick={() => window.location.href = '/api/youtube/oauth'}
                className={styles.cta}
                style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
              >
                🚀 Conectar con YouTube
              </button>
            </div>
          ) : (
            <>
              {userInfo && (
                <div className={styles.successMessage}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>✅</span>
                    <div>
                      <strong>Conectado exitosamente</strong>
                      <p style={{ margin: 0, opacity: 0.8 }}>{userInfo.name} ({userInfo.email})</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleUpload}>
                {/* Archivo de video con estilo mejorado */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>📁</span>
                    Selecciona tu Video
                  </label>
                  <div className={styles.fileInput}>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      required
                      style={{ display: 'none' }}
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" style={{ cursor: 'pointer', width: '100%', display: 'block' }}>
                      {file ? (
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎬</div>
                          <p style={{ margin: 0, fontWeight: '600' }}>{file.name}</p>
                          <p style={{ margin: '0.5rem 0 0 0', opacity: 0.7, fontSize: '0.9rem' }}>
                            Tamaño: {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📤</div>
                          <p style={{ margin: 0, fontWeight: '600' }}>Arrastra tu video aquí</p>
                          <p style={{ margin: '0.5rem 0 0 0', opacity: 0.7 }}>o haz clic para seleccionar</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Grid de inputs principales */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>🎬</span>
                      Título del Video
                    </label>
                    <input
                      type="text"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      className={styles.formInput}
                      placeholder="Dale un título atractivo a tu video..."
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>📝</span>
                      Descripción
                    </label>
                    <textarea
                      value={videoDescription}
                      onChange={(e) => setVideoDescription(e.target.value)}
                      className={styles.formTextarea}
                      placeholder="Describe tu video para generar un SEO más preciso..."
                      rows={3}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>🎯</span>
                      Tema / Contexto
                    </label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className={styles.formInput}
                      placeholder="Ej: tutorial, gaming, cocina, tecnología..."
                    />
                  </div>
                </div>

                {/* Preview del SEO con diseño moderno */}
                {loadingPreview && (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '3rem',
                    background: 'rgba(108, 99, 255, 0.05)',
                    borderRadius: '16px',
                    border: '1px solid rgba(108, 99, 255, 0.2)',
                    marginTop: '2rem'
                  }}>
                    <div className={styles.loadingSpinner}></div>
                    <p style={{ marginTop: '1rem' }}>🤖 IA generando optimización SEO...</p>
                  </div>
                )}

                {editableSEO && (
                  <div style={{ 
                    background: 'linear-gradient(145deg, rgba(108, 99, 255, 0.1), rgba(255, 107, 157, 0.1))', 
                    border: '1px solid rgba(108, 99, 255, 0.3)',
                    borderRadius: '16px', 
                    padding: '2rem',
                    marginTop: '2rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '2rem' }}>🎯</span>
                      <h3 style={{ margin: 0, color: '#6c63ff' }}>SEO Optimizado por IA - Editable</h3>
                    </div>
                    
                    <div className="seo-preview-grid" style={{ display: 'grid', gap: '1.5rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: '#ff6b9d' }}>
                          📌 Título Optimizado (Editable)
                        </h4>
                        <textarea
                          value={editableSEO.title}
                          onChange={(e) => setEditableSEO({...editableSEO, title: e.target.value})}
                          className={styles.formTextarea}
                          rows={2}
                          style={{
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '10px',
                            fontSize: '1rem',
                            fontWeight: '500'
                          }}
                        />
                      </div>
                      
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: '#ff6b9d' }}>
                          📄 Descripción SEO (Editable)
                        </h4>
                        <textarea
                          value={editableSEO.description}
                          onChange={(e) => setEditableSEO({...editableSEO, description: e.target.value})}
                          className={styles.formTextarea}
                          rows={5}
                          style={{
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '10px',
                            lineHeight: '1.5',
                            minHeight: '120px'
                          }}
                        />
                      </div>
                      
                      {editableSEO.tags && editableSEO.tags.length > 0 && (
                        <div>
                          <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: '#ff6b9d' }}>
                            🏷️ Tags Inteligentes (Editable)
                          </h4>
                          <input
                            type="text"
                            value={editableSEO.tags.join(', ')}
                            onChange={(e) => setEditableSEO({
                              ...editableSEO, 
                              tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
                            })}
                            className={styles.formInput}
                            placeholder="Separa los tags con comas..."
                            style={{
                              background: 'rgba(255,255,255,0.08)',
                              border: '1px solid rgba(255,255,255,0.2)',
                              borderRadius: '10px'
                            }}
                          />
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                            {editableSEO.tags.slice(0, 10).map((tag, index) => (
                              <span key={index} style={{ 
                                background: 'linear-gradient(45deg, #6c63ff, #ff6b9d)', 
                                color: 'white',
                                padding: '0.4rem 0.8rem', 
                                borderRadius: '20px', 
                                fontSize: '0.85rem',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                              }}>
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newTags = editableSEO.tags.filter((_, i) => i !== index);
                                    setEditableSEO({...editableSEO, tags: newTags});
                                  }}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    padding: 0,
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                            {editableSEO.tags.length > 10 && (
                              <span style={{ opacity: 0.7, fontSize: '0.9rem', alignSelf: 'center' }}>
                                +{editableSEO.tags.length - 10} más...
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {editableSEO.hashtags && editableSEO.hashtags.length > 0 && (
                        <div>
                          <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: '#ff6b9d' }}>
                            # Hashtags Trending (Editable)
                          </h4>
                          <input
                            type="text"
                            value={editableSEO.hashtags.join(' ')}
                            onChange={(e) => setEditableSEO({
                              ...editableSEO, 
                              hashtags: e.target.value.split(' ').map(tag => tag.trim()).filter(tag => tag.length > 0)
                            })}
                            className={styles.formInput}
                            placeholder="Separa los hashtags con espacios..."
                            style={{
                              background: 'rgba(255,255,255,0.08)',
                              border: '1px solid rgba(255,255,255,0.2)',
                              borderRadius: '10px',
                              color: '#6c63ff',
                              fontWeight: '500'
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div style={{ 
                      marginTop: '1.5rem', 
                      padding: '1rem', 
                      background: 'rgba(108, 99, 255, 0.05)', 
                      borderRadius: '8px',
                      border: '1px solid rgba(108, 99, 255, 0.2)'
                    }}>
                      <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
                        💡 <strong>Tip:</strong> Edita el contenido generado por IA antes de subir. Haz clic en la "×" para eliminar tags individuales.
                      </p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className={styles.errorMessage}>
                    <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>❌</span>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isUploading || !file || loadingPreview}
                  className={styles.submitButton}
                  style={{ marginTop: '2rem', fontSize: '1.1rem', padding: '1.2rem' }}
                >
                  {isUploading ? (
                    <>
                      <span className={styles.loadingSpinner}></span>
                      Subiendo y optimizando...
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: '1.3rem', marginRight: '0.5rem' }}>🚀</span>
                      Subir Video Optimizado
                    </>
                  )}
                </button>
              </form>

              {uploadResult && (
                <div className={styles.successMessage} style={{ marginTop: '2rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>¡Video Subido Exitosamente!</h3>
                    <p style={{ opacity: 0.9, marginBottom: '2rem' }}>
                      Tu video ha sido optimizado y está disponible en YouTube
                    </p>
                    
                    {uploadResult.videoId && (
                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a 
                          href={`https://youtube.com/watch?v=${uploadResult.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.cta}
                          style={{ fontSize: '1rem', padding: '0.8rem 1.5rem' }}
                        >
                          <span style={{ marginRight: '0.5rem' }}>🔗</span>
                          Ver en YouTube
                        </a>
                        <button
                          onClick={() => {
                            setUploadResult(null);
                            setError(null);
                            setFile(null);
                            setTopic('');
                            setVideoTitle('');
                            setVideoDescription('');
                            setEditableSEO(null);
                          }}
                          className={styles.submitButton}
                          style={{ fontSize: '1rem', padding: '0.8rem 1.5rem' }}
                        >
                          <span style={{ marginRight: '0.5rem' }}>🎬</span>
                          Subir Otro Video
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
