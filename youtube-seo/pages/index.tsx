//pagina principal

import React from 'react';
import Head from 'next/head';
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/styles.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>AutoTubeAI - Optimiza tus Videos con IA</title>
        <meta name="description" content="Transforma tus videos en éxitos virales con el poder de la inteligencia artificial" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.container}>
        <Navbar />
        
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>AutoTubeAI</h1>
            <p>
              Transforma tus videos en éxitos virales con el poder de la inteligencia artificial. 
              Optimización SEO automática, títulos irresistibles y descripciones que convierten.
            </p>
            <Link href="/upload" className={styles.cta}>
              Comenzar Ahora
            </Link>
          </div>
          <div className={styles.heroImage}>
            <div style={{
              width: '400px',
              height: '250px',
              background: 'linear-gradient(45deg, #6c63ff, #ff6b9d)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem'
            }}>
              🎬
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <h2 className={styles.sectionTitle}>Características Principales</h2>
          <p className={styles.sectionSubtitle}>
            Todo lo que necesitas para dominar YouTube
          </p>
          
          <div className={styles.featureGrid}>
            <div className={styles.card}>
              <span className={styles.icon}>🎯</span>
              <h3 className={styles.cardTitle}>SEO Inteligente</h3>
              <p className={styles.cardDescription}>
                Análisis profundo de tu contenido para generar títulos, descripciones y tags optimizados que maximizan tu alcance.
              </p>
            </div>
            
            <div className={styles.card}>
              <span className={styles.icon}>🚀</span>
              <h3 className={styles.cardTitle}>Subida Automática</h3>
              <p className={styles.cardDescription}>
                Conecta tu canal de YouTube y sube videos con toda la optimización SEO aplicada automáticamente.
              </p>
            </div>
            
            <div className={styles.card}>
              <span className={styles.icon}>⚡</span>
              <h3 className={styles.cardTitle}>Procesamiento Rápido</h3>
              <p className={styles.cardDescription}>
                IA avanzada que analiza tu video en segundos y genera contenido optimizado al instante.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className={styles.benefits}>
          <h2 className={styles.sectionTitle}>¿Por qué elegir AutoTubeAI?</h2>
          <ul>
            <li>Aumenta tu alcance orgánico hasta un 300%</li>
            <li>Títulos optimizados que generan más clics</li>
            <li>Descripciones que mejoran tu posicionamiento</li>
            <li>Tags inteligentes para mejor discoverabilidad</li>
            <li>Integración directa con YouTube</li>
            <li>Análisis basado en IA de última generación</li>
          </ul>
        </section>

        {/* How it Works Section */}
        <section className={styles.howItWorks}>
          <h2 className={styles.sectionTitle}>Cómo Funciona</h2>
          <ol>
            <li>Sube tu video o proporciona el archivo</li>
            <li>Nuestra IA analiza el contenido automáticamente</li>
            <li>Genera títulos, descripciones y tags optimizados</li>
            <li>Revisa y personaliza el contenido generado</li>
            <li>Publica directamente en tu canal de YouTube</li>
          </ol>
        </section>

        {/* Pricing Section */}
        <section className={styles.pricing}>
          <h2 className={styles.sectionTitle}>Comienza Gratis</h2>
          <p>
            Prueba AutoTubeAI sin costo y descubre el poder de la optimización automática.
          </p>
          <Link href="/upload" className={styles.cta}>
            Probar Gratis
          </Link>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
