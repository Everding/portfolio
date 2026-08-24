// App.jsx
import React, { useState, useEffect, useRef } from 'react';
import logo from './assets/icone-de-la-lune-verte.png'
import Yo from './assets/imagsfe.png'
import { DiReact } from "react-icons/di";
import { BiLogoTypescript, BiLogoJavascript, BiLogoTailwindCss } from "react-icons/bi";
import { RiNextjsFill } from "react-icons/ri";
import { TbBrandCSharp } from "react-icons/tb";
import { FaGitAlt, FaHtml5 } from "react-icons/fa6";
import { FaCss3Alt, FaWhatsapp, FaGithub, FaLinkedin, FaPython, } from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import CV from '../public/DavidMiguelResume 1.pdf';

import './App.css';



// Hook para animar SOLO la primera vez que la sección entra en viewport
const useAnimateOnce = (threshold = 0.2) => {
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Opcional: puedes desconectar el observer aquí si quieres ahorrar recursos
            // observer.disconnect();
          }
        });
      },
      {
        threshold,        // % del elemento que debe ser visible (0.2 = 20%)
        rootMargin: '0px 0px -50px 0px' // activa un poco antes de que entre completamente
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, threshold]);

  return [elementRef, hasAnimated];
};

// --- Datos ---
const skillsData = [
  { name: 'ReactJS', icon: <DiReact /> },
  { name: 'Next.js', icon: <RiNextjsFill /> },
  { name: 'JavaScript', icon: <BiLogoJavascript /> },
  { name: 'TypeScript', icon: <BiLogoTypescript /> },
  { name: 'TailwindCSS', icon: <BiLogoTailwindCss /> },
  { name: 'Git', icon: <FaGitAlt /> },
  { name: 'GitHub', icon: <FaGithub /> },
  { name: 'HTML', icon: <FaHtml5 /> },
  { name: 'CSS', icon: <FaCss3Alt /> },
  { name: 'C#', icon: <TbBrandCSharp /> },
  { name: '.NET', icon: '.NET' },
  { name: 'Python', icon: <FaPython /> },
  { name: 'MySQL', icon: <SiMysql /> },

];

const experienceData = [
  {
    date: 'Ago. 2025 - Dic. 2025',
    role: 'Fullstack Developer',
    company: 'Freelance',
    description: 'Desarrollé una aplicación web para la gestión integral de una cafetería, enfocada en mejorar la organización de pedidos, productos y usuarios. Implementé un sistema con autenticación, roles y control de acceso, junto con una interfaz dinámica e intuitiva. El frontend fue construido con React/Next.js y el backend con Node.js, integrando comunicación mediante APIs para asegurar eficiencia y escalabilidad.',
    tech: ['React', 'JS', 'Next.js'],
    videoEmbed: "https://www.youtube.com/embed/QeYriV1PlSY?si=CY_Nqbtl4_ufT54h"
  },



];


const useScrollOpacity = () => {
  const elementRef = useRef(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const screenCenter = windowHeight / 2;
      const distance = Math.abs(screenCenter - center);

      // La sección se desvanece a medida que su centro se aleja del centro de la pantalla
      const newOpacity = 1 - (distance / (windowHeight * 0.7));
      setOpacity(Math.max(0, Math.min(1, newOpacity)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return [elementRef, opacity];
};

// --- Componentes de Sección ---

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="logo">
          <img src={logo} alt="Logo de David Rivadeneira" className="logo-img" />
        </div>
        <ul className="nav-links">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#experiencia">Proyectos Personales</a></li>
          <li><a href="#sobre-mi">Sobre mí</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </div>
      <style jsx>{`
        .navbar {
          background-color: rgba(18, 18, 18, 0.95);
          padding: 20px 0;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          border-bottom: 1px solid #333;
        }
        .nav-container { display: flex; justify-content: space-between; align-items: center; }
        .logo-img { height: 40px; width: auto; }
        .nav-links { display: flex; gap: 30px; list-style: none; }
        .nav-links a { text-decoration: none; color: #fff; transition: 0.3s; }
        .nav-links a:hover { color: var(--color-primary-lime); }
        /* Mobile: apilar los enlaces verticalmente en pantallas <= 768px */
        @media (max-width: 768px) {
          .nav-links {
            flex-direction: column;
            width: 100%;
            padding-top: 80px;
            background: rgba(18, 18, 18, 0.98);
            position: fixed;
            top: 100%;
            left: 0;
            gap: 20px;
            margin-top: 10px;
          }
          .nav-links a {
            padding: 10px 20px;
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </nav>
  );
};

const Hero = () => {
  const [ref, opacity] = useScrollOpacity();
  return (
    <section id="inicio" ref={ref} className="hero wave-container" style={{ opacity }}>
      <div className="container hero-content">
        <h1 className="hero-title">David Rivadeneira</h1>
        <p className="hero-subtitle">Desarrollador Fullstack</p>
        <p className="hero-description">
          Con <span className="highlight">1 año</span> de experiencia utilizando React, JavaScript y Next.js. Cambio problemas por soluciones.
        </p>
        <div className="hero-btns">
          <a
            href={CV}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Abre mi CV! ↓
          </a>
        </div>
      </div>
      <style jsx>{`
  .hero { 
    min-height: 100vh; 
    display: flex; 
    flex-direction: column;
    align-items: center; 
    justify-content: center; 
    text-align: center; 
    position: relative; 
    padding: 0 20px 150px; 
    background: radial-gradient(circle at center, #1a1a1a 0%, #000 100%);
    overflow: hidden;
  }

  .hero-title { 
    font-size: clamp(3rem, 8vw, 6rem); 
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 20px; 
    letter-spacing: -2px;
  }

  .hero-subtitle { 
    font-size: clamp(1.2rem, 3vw, 2.2rem); 
    color: var(--color-primary-lime); 
    margin-bottom: 30px; 
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 4px; 
  }

  .hero-description { 
    max-width: 850px; 
    margin: 0 auto 50px; 
    font-size: 1.4rem; 
    line-height: 1.6;
    color: #ccc;
  }

  .highlight { 
    color: var(--color-primary-lime); 
    font-weight: bold; 
   }

  
  .wave-divider {
    position: absolute;
    bottom: -1px; 
    left: 0;
    width: 100%;
    height: auto; 
    line-height: 0;
    z-index: 1;
  }

  .wave-divider svg {
    display: block;
    width: 100%;
    height: 150px; 
  }

  /* Breakpoints responsivos mejorados */
  @media (max-width: 1024px) {
    .hero { padding: 0 15px 120px; }
    .hero-title { font-size: clamp(3rem, 7vw, 5rem); }
    .hero-description { font-size: 1.3rem; }
    .wave-divider svg { height: 120px; }
  }

  @media (max-width: 768px) {
    .hero { padding: 0 15px 100px; }
    .hero-title { font-size: clamp(2.5rem, 6vw, 4rem); }
    .hero-subtitle { font-size: clamp(1rem, 3vw, 1.8rem); }
    .hero-description { font-size: 1rem; line-height: 1.5; }
    .wave-divider svg { height: 80px; }
  }

  @media (max-width: 480px) {
    .hero { padding: 0 10px 80px; }
    .hero-title { font-size: clamp(2rem, 5vw, 3.5rem); }
    .hero-description { font-size: 0.9rem; }
    .wave-divider svg { height: 60px; }
  }
`}</style>
    </section>
  );
};

const Experience = () => {
  const [ref, hasAnimated] = useAnimateOnce(0.15); // se activa cuando ~15% es visible

  return (
    <section id="experiencia" ref={ref} className="experience section-light">
      <div className="container">
        <h2 style={{
          textAlign: 'center',
          marginBottom: '50px',
          fontSize: '2.5rem',
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated ? 'translateY(0)' : 'translateY(30px)',
          transition: hasAnimated ? 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none'
        }}>
          Proyectos realizados
        </h2>

        <div className="timeline">
          {experienceData.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={index} className="timeline-item">
                <div
                  className="timeline-img"
                  style={{
                    opacity: hasAnimated ? 1 : 0,
                    transform: hasAnimated
                      ? 'translateX(0)'
                      : `translateX(${isEven ? '-80px' : '80px'})`,
                    transition: hasAnimated ? 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.1s' : 'none'
                  }}
                >
                  <div className="video-placeholder">
                    <iframe
                      width="100%"
                      height="100%"
                      // USAMOS LA VARIABLE DEL MAP AQUÍ:
                      src={exp.videoEmbed}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ borderRadius: '8px' }}
                    ></iframe>
                  </div>
                </div>

                <div
                  className="timeline-content"
                  style={{
                    opacity: hasAnimated ? 1 : 0,
                    transform: hasAnimated
                      ? 'translateX(0)'
                      : `translateX(${isEven ? '80px' : '-80px'})`,
                    transition: hasAnimated ? 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s' : 'none'
                  }}
                >

                  <span className="date">{exp.date}</span>
                  <h3>{exp.role}</h3>
                  <p className="company">at {exp.company}</p>
                  <p className="description">{exp.description}</p>
                  <div className="tech-stack">
                    {exp.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
  .experience { 
    min-height: 100vh; 
    padding: 120px 20px; /* Más espacio arriba y abajo */
    background: #fff; 
    color: #1a1a1a; 
    display: flex; 
    flex-direction: column;
    align-items: center; 
    overflow-x: hidden; 
  }

  .timeline { 
    display: flex; 
    flex-direction: column; 
    gap: 80px; 
    position: relative; 
    width: 100%; 
    max-width: 1200px; 
    margin-top: 50px;
  }

  .timeline::before { 
    content: ''; 
    position: absolute; 
    left: 50%; 
    transform: translateX(-50%); 
    width: 4px; 
    height: 100%; 
    background-color: var(--color-primary-lime); 
    opacity: 0.3; 
  }

  .timeline-item { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    width: 100%; 
    position: relative; 
  }

  .timeline-item:nth-child(even) { flex-direction: row-reverse; }

  /* El punto en la línea de tiempo */
  .timeline-item::after { 
    content: ''; 
    position: absolute; 
    left: 50%; 
    top: 50%; /* Centrado vertical respecto al item */
    transform: translate(-50%, -50%); 
    width: 20px; 
    height: 20px; 
    background: var(--color-primary-lime); 
    border: 4px solid #fff; 
    border-radius: 50%; 
    z-index: 1; 
    box-shadow: 0 0 10px var(--color-primary-lime);
  }

  .timeline-img, .timeline-content { 
    width: 46%; /* Un poco más ancho */
    will-change: transform; 
  }

  .video-placeholder { 
    width: 100%; 
    height: 280px; 
    background: #1a1a1a; 
    border-radius: 12px; 
    border: 1px solid rgba(0,0,0,0.1);
    display: flex; 
    align-items: center; 
    justify-content: center; 
    color: #fff;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }

  .timeline-content { 
    padding: 35px; 
    background: #121212; 
    color: #fff; 
    border-radius: 16px; 
    box-shadow: 0 15px 35px rgba(0,0,0,0.25); 
    transition: 0.3s;
  }

  .timeline-content:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }

  .timeline-content h3 {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  .date { 
    display: block;
    margin-bottom: 15px;
    font-size: 1rem; 
    font-weight: bold;
    color: var(--color-primary-lime); 
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .tech-badge { 
    display: inline-block;
    padding: 5px 12px; 
    background: rgba(255, 255, 255, 0.05); 
    border: 1px solid var(--color-primary-lime); 
    color: var(--color-primary-lime);
    border-radius: 6px; 
    font-size: 0.85rem; 
    margin: 5px 8px 5px 0; 
  }

  /* Breakpoints responsivos mejorados para timeline */
  @media (max-width: 1024px) {
    .timeline { max-width: 95%; gap: 60px; }
    .timeline-img, .timeline-content { width: 100%; }
    .video-placeholder { height: 250px; }
    .timeline-content h3 { font-size: 1.6rem; }
  }

  @media (max-width: 900px) {
    .timeline { max-width: 90%; gap: 50px; }
    .timeline-item { flex-direction: column !important; align-items: flex-start; }
    .timeline-item::after { left: 30px; top: 20px; }
    .timeline-img, .timeline-content { width: 100%; margin-bottom: 20px; }
    .video-placeholder { height: 200px; }
    .timeline-content h3 { font-size: 1.5rem; }
    .date { font-size: 0.9rem; }
  }

  @media (max-width: 600px) {
    .timeline { padding: 0 10px; }
    .timeline-item { padding: 0 10px; }
    .video-placeholder { height: 180px; }
    .timeline-content { padding: 25px; }
    .timeline-content h3 { font-size: 1.4rem; margin-bottom: 8px; }
    .date { font-size: 0.85rem; }
    .tech-badge { font-size: 0.75rem; padding: 4px 8px; margin: 4px 6px 4px 0; }
  }
`}</style>
    </section>
  );
};

const AboutMe = () => {
  const [ref, hasAnimated] = useAnimateOnce();

  return (
    <section id="sobre-mi" ref={ref} className="about-me wave-container">
      <div className="container about-content">
        <div
          className="about-image-container"
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'translateX(0)' : 'translateX(-100px)',
            transition: hasAnimated ? 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s' : 'none'
          }}
        >
          <div className="Fotoperfil">
            <img src={Yo} alt="Logo de David Rivadeneira" className="foto-per" />
          </div>
        </div>
        <div
          className="about-text"
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'translateX(0)' : 'translateX(100px)',
            transition: hasAnimated ? 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s' : 'none'
          }}
        >
          <h2>Sobre mi</h2>
          <p>
            Soy <span className="highlight">Miguel David Rivadeneira</span>, desarrollador web Full Stack
            graduado de la <span className="highlight"> UTN – Facultad Regional Tucumán</span> en la
            carrera de Técnicatura Universitaria en Programación.
          </p>
          <p>
            Apasionado por la tecnología y por construir soluciones digitales completas, desde el backend
            hasta interfaces modernas y fluidas. Tengo una sólida base técnica en React, TypeScript,
            C#, .NET, Node.js y bases de datos, y me caracterizo por mi capacidad de aprendizaje autónomo
            y excelentes habilidades de comunicación.
          </p>
          <p>
            Creativo, proactivo y siempre en búsqueda de nuevos desafíos, estoy listo para mi primera
            gran oportunidad profesional en el ámbito corporativo, donde pueda aportar valor real y
            seguir creciendo dentro del ecosistema IT.
          </p>
        </div>
      </div>
      <style jsx>{`
        .about-me { min-height: 100vh; display: flex; align-items: center; color: #fff; position: relative; overflow-x: hidden; }
        .about-content { display: flex; align-items: center; gap: 50px; z-index: 2; }
        .profile-photo-placeholder { width: 250px; height: 250px; border-radius: 50%; background: #2a2a2a; border: 5px solid var(--color-primary-lime); display: flex; align-items: center; justify-content: center; }
        .highlight { color: var(--color-primary-lime); font-weight: bold; }
        /* Tablet y mobile: apilar el contenido */
        @media (max-width: 1024px) {
          .about-content { gap: 30px; }
          .profile-photo-placeholder { width: 200px; height: 200px; }
        }
        @media (max-width: 768px) {
          .about-content { flex-direction: column; text-align: center; }
          .profile-photo-placeholder { width: 150px; height: 150px; }
          h2 { font-size: 1.8rem; }
        }
        @media (max-width: 480px) {
          .about-content { padding: 0 10px; }
          .profile-photo-placeholder { width: 120px; height: 120px; }
          h2 { font-size: 1.5rem; }
          .about-text p { font-size: 0.95rem; }
        }
      `}</style>
    </section>
  );
};

const Skills = () => {
  const [ref, hasAnimated] = useAnimateOnce(0.2);

  return (
    <section id="skills" ref={ref} className="skills section-light">
      <div className="container">
        <h2 style={{
          textAlign: 'center',
          marginBottom: '50px',
          fontSize: '2.5rem',
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.7s ease-out'
        }}>
          Mis habilidades
        </h2>
        <div
          className="skills-grid"
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(60px)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {skillsData.map((skill, i) => (
            <div
              key={skill.name}
              className="skill-card"
              style={{
                opacity: hasAnimated ? 1 : 0,
                transform: hasAnimated ? 'translateY(0)' : 'translateY(30px)',
                transition: hasAnimated ? `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.1 * i}s` : 'none'
              }}
            >
              <div className="skill-icon">{skill.icon}</div>
              <p className="skill-name">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
  .skills { 
    min-height: 100vh; 
    background: #fff; 
    color: #1a1a1a; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    padding: 80px 20px; 
  }

  .skills-grid { 
    display: grid; 
    grid-template-columns: repeat(5, 1fr); /* 5 columnas en monitores grandes */
    gap: 25px; 
    width: 100%; 
    max-width: 1100px; 
    justify-items: center; 
  }

  .skill-card { 
    width: 100%; 
    max-width: 190px; 
    aspect-ratio: 1 / 1; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    background: #121212; 
    color: #fff; 
    border-radius: 16px; 
    text-align: center; 
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
    cursor: default; 
    padding: 10px;
  }

  .skill-card:hover { 
    transform: translateY(-12px) scale(1.05); 
    background: #1a1a1a; 
    border: 2px solid var(--color-primary-lime); 
    box-shadow: 0 20px 40px rgba(0,0,0,0.15); 
  }

  .skill-icon { 
    font-size: 3.5rem; 
    color: var(--color-primary-lime); 
    margin-bottom: 15px; 
  }

  .skill-card span { 
    font-weight: 600; 
    font-size: 1.1rem; 
    letter-spacing: 0.5px; 
  }

  /* --- 3 Columnas en Laptops medianas y Tablets --- */
  @media (max-width: 1024px) {
    .skills { padding: 60px 15px; }
    .skills-grid {
      grid-template-columns: repeat(3, 1fr); /* 3 columnas forzadas */
      gap: 20px;
      max-width: 650px;
    }
    .skill-card { max-width: 170px; }
    .skill-icon { font-size: 3rem; }
    .skill-card span { font-size: 1rem; }
  }

  /* --- 3 Columnas compactas en Tablets chicas / Pantallas medianas --- */
  @media (max-width: 768px) {
    .skills { padding: 40px 15px; }
    .skills-grid {
      grid-template-columns: repeat(3, 1fr); /* Mantiene 3 columnas */
      gap: 15px;
      max-width: 500px;
    }
    .skill-icon { font-size: 2.3rem; margin-bottom: 8px; }
    .skill-card { max-width: 135px; border-radius: 12px; }
    .skill-card span { font-size: 0.85rem; }
  }

  /* --- 2 Columnas en Celulares --- */
  @media (max-width: 480px) {
    .skills { padding: 30px 10px; }
    .skills-grid {
      grid-template-columns: repeat(2, 1fr); /* Pasa a 2 columnas para no apretar el contenido */
      gap: 12px;
      max-width: 320px;
    }
    .skill-icon { font-size: 2rem; margin-bottom: 6px; }
    .skill-card { max-width: 140px; padding: 10px 5px; }
    .skill-card span { font-size: 0.8rem; }
  }
`}</style>
    </section>
  );
};

const Contact = () => {
  const [ref, hasAnimated] = useAnimateOnce(0.25); // Se activa cuando el 25% de la sección es visible

  const liftOffset = 80; // cuánto sube el contenido inicialmente

  return (
    <section id="contacto" ref={ref} className="contact wave-container">
      <div
        className="container contact-content"
        style={{
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated
            ? 'translateY(0)'
            : `translateY(${liftOffset}px)`,
          transition: hasAnimated
            ? 'all 0.9s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s'
            : 'none'
        }}
      >
        <h2 style={{
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated ? 'translateY(0)' : 'translateY(30px)',
          transition: hasAnimated ? 'all 0.7s ease-out' : 'none'
        }}>
          Contactame
        </h2>

        <p
          className="contact-subtitle"
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'translateY(0)' : 'translateY(40px)',
            transition: hasAnimated ? 'all 0.8s ease-out 0.1s' : 'none'
          }}
        >
          Salúdame o hablemos de proyectos futuros
        </p>

        <div
          className="contact-info"
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'translateY(0)' : 'translateY(50px)',
            transition: hasAnimated ? 'all 0.8s ease-out 0.3s' : 'none'
          }}
        >
          <div className="contact-item">
            <span className="contact-label">Email: </span>
            <a href="mailto:davidrivadeneira@gmail.com" className="contact-value highlight">
              migueldavidrivadeneira@gmail.com
            </a>
          </div>

          <div className="contact-item">
            <span className="contact-label">Télofono: </span>
            <a href="mailto:davidrivadeneira@gmail.com" className="contact-value highlight">
              +54 3814570068
            </a>
          </div>
        </div>

        <div
          className="contact-form-placeholder"
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.95)',
            transition: hasAnimated ? 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s' : 'none'
          }}
        >
          <p>¿Listo para contactar?</p>
          <></>
          <div className="button-container">
            <a
              href="https://wa.me/5493814570068?text=Hola%20David!%20Vi%20tu%20portfolio%20y%20me%20gustaría%20contactarte."
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <button className="btn-primary">Enviar Mensaje</button>
            </a>
          </div>

          <style jsx>{`
  .button-container {
    display: flex;
    justify-content: center; 
    width: 100%;            
    margin-top: 20px;       
  }
`}</style>
        </div>
      </div>

      <style jsx>{`
  .contact { 
    min-height: 100vh; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    color: #fff; 
    position: relative;
    padding: 100px 20px;
  }

  .contact-content { 
    width: 100%; 
    max-width: 800px; 
    z-index: 2; 
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .contact-content h2 {
    font-size: 3rem; 
    margin-bottom: 10px;
  }

  .contact-info { 
    margin: 20px 0 40px 0; 
    font-size: 1.2rem;
    line-height: 1.6;
    color: #ccc;
  }

  .highlight { 
    color: var(--color-primary-lime); 
    font-weight: bold; 
    text-decoration: none;
    font-size: 1.4rem; 
    transition: 0.3s;
  }
  
  .highlight:hover {
    text-shadow: 0 0 10px var(--color-primary-lime);
  }

  .contact-form-placeholder { 
    width: 70%; 
    padding: 50px; 
    background: #1a1a1a; 
    border-radius: 20px; 
    border: 1px solid #333;
    box-shadow: 0 20px 50px rgba(0,0,0,0.6); 
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  
  .contact-form-placeholder :global(input), 
  .contact-form-placeholder :global(textarea) {
    width: 100%;
    padding: 15px;
    background: #0f0f0f;
    border: 1px solid #444;
    color: #fff;
    border-radius: 8px;
    outline: none;
  }

  @media (max-width: 768px) {
    .contact-content h2 { font-size: 2.2rem; }
    .contact-form-placeholder { padding: 30px 20px; }
    .contact { padding: 60px 15px; }
  }

  @media (max-width: 1024px) {
    .contact { padding: 80px 15px; }
    .contact-content h2 { font-size: 2.5rem; }
    .contact-form-placeholder { width: 80%; padding: 40px 25px; }
  }

  @media (max-width: 480px) {
    .contact { padding: 40px 10px; }
    .contact-content h2 { font-size: 1.8rem; }
    .contact-form-placeholder { padding: 20px 15px; }
    .contact-info { font-size: 0.9rem; line-height: 1.4; }
  }
`}</style>
    </section>
  );
};

const Footer = ({ onRef }) => (
  <footer className="footer" ref={onRef}>
    <div className="container">
      <p>&copy; Copyright {new Date().getFullYear()}. Hecho por David Rivadeneira</p>
    </div>
  </footer>
);



// --- Componente Principal ---

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const footerPos = footerRef.current.getBoundingClientRect().top;
      setShowBackToTop(footerPos < window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Experience />
      <AboutMe />
      <Skills />
      <Contact />
      <Footer onRef={footerRef} />

      {/* Botón Volver al Inicio */}
      <button
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>

      {/* Barra lateral */}
      <div className="social-sidebar">
        <a href="https://www.linkedin.com/in/david-rivadeneira-172151168/" target="_blank" className="social-icon"><FaLinkedin /></a>
        <a href="https://github.com/Everding" target="_blank" className="social-icon"><FaGithub /></a>
        <a href="https://wa.me/5493814570068" className="social-icon" target="_blank"><FaWhatsapp /></a>
        <style jsx>{`
          .social-sidebar { position: fixed; left: 20px; bottom: 20px; display: flex; flex-direction: column; gap: 15px; z-index: 100; }
          .social-icon { width: 60px; height: 60px; background: #2a2a2a; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; text-decoration: none; transition: 0.3s; }
          .social-icon:hover { background: var(--color-primary-lime); color: #000; transform: scale(1.1); }
          .social-icon svg { font-size: 30px;}
        `}</style>
      </div>
    </div>
  );
}

export default App;