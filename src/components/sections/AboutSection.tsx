import React from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from '../ui/glass/GlassPanel';

export const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <section 
      id="about" 
      className="relative w-full bg-white/[0.03] backdrop-blur-2xl pt-40 pb-32 z-20 border-t border-white/10 shadow-[0_-20px_50px_-20px_rgba(255,255,255,0.05)]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {/* Header */}
          <div className="mb-24 flex flex-col md:flex-row gap-12 items-start justify-between">
            <motion.div variants={itemVariants} className="max-w-2xl">
              <h2 className="text-sm font-mono text-white/40 mb-6 tracking-[0.3em] uppercase">About</h2>
              <h3 className="text-4xl md:text-6xl font-sans font-bold leading-tight tracking-tight mb-4">
                CARLOS TARACENA
              </h3>
              <p className="text-xl font-mono text-accent mb-8 tracking-widest uppercase">
                Programador Junior
              </p>
              <p className="text-lg md:text-xl text-white/70 font-sans leading-relaxed">
                Estudiante de cierre de Ingeniería en Sistemas y Ciencias de la
                Computación, con perfil analítico orientado a arquitectura de software,
                transformación digital y mecatrónica.
              </p>
            </motion.div>
            
            {/* Conceptual Mindset Diagram (CSS Only) */}
            <motion.div variants={itemVariants} className="hidden lg:flex flex-col items-center justify-center p-8 border border-white/5 rounded-full aspect-square w-64 opacity-60">
              <span className="text-xs font-mono text-white/40 mb-2">SOFTWARE &bull; DATA</span>
              <span className="font-sans font-bold text-lg text-white">ENGINEERING</span>
              <span className="font-sans font-bold text-lg text-white mb-2">MINDSET</span>
              <span className="text-xs font-mono text-white/40 mt-2 text-center">IoT &bull; TRANSFORMATION<br/>MECATRONICS</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            {/* Left Column: Experience */}
            <div className="lg:col-span-7 space-y-16">
              <motion.div variants={itemVariants}>
                <h4 className="text-sm font-mono text-white/40 mb-8 tracking-[0.2em] uppercase border-b border-white/10 pb-4">Selected Experience</h4>
                
                <div className="space-y-8">
                  {/* Item 1 */}
                  <div className="group">
                    <h5 className="text-xl font-bold font-sans text-white mb-2">Stellar Tracker / Observatorio Astronómico Automatizado</h5>
                    <p className="text-white/60 font-sans text-sm leading-relaxed">
                      Diseño IoT de tres capas para cálculos astronómicos, telemetría y actuación. Integración de matrices de rotación SO(3) y cinemática directa.
                    </p>
                  </div>
                  {/* Item 2 */}
                  <div className="group">
                    <h5 className="text-xl font-bold font-sans text-white mb-2">SCRID</h5>
                    <p className="text-white/60 font-sans text-sm leading-relaxed">
                      Auditoría y desarrollo para la transformación digital universitaria. Ecosistema auditable con SSO y transacciones por código QR.
                    </p>
                  </div>
                  {/* Item 3 */}
                  <div className="group">
                    <h5 className="text-xl font-bold font-sans text-white mb-2">SaaS de Inventario Omnicanal</h5>
                    <p className="text-white/60 font-sans text-sm leading-relaxed">
                      Arquitectura multi-tenant para sincronización de inventarios en tiempo real enfocada en PyMEs, desplegada en nube (AWS/GCP).
                    </p>
                  </div>
                  {/* Item 4 */}
                  <div className="group">
                    <h5 className="text-xl font-bold font-sans text-white mb-2">Data Warehouse Estadístico</h5>
                    <p className="text-white/60 font-sans text-sm leading-relaxed">
                      Base de datos analítica procesando impuestos mediante modelado dimensional, procesos ETL y Oracle PL/SQL.
                    </p>
                  </div>
                  {/* Item 5 */}
                  <div className="group">
                    <h5 className="text-xl font-bold font-sans text-white mb-2">ERP Scout</h5>
                    <p className="text-white/60 font-sans text-sm leading-relaxed">
                      Diseño técnico y modelado UML de un sistema de planificación de recursos en la nube.
                    </p>
                  </div>
                  {/* Item 6 */}
                  <div className="group">
                    <h5 className="text-xl font-bold font-sans text-white mb-2">Laboratorio de Pentesting</h5>
                    <p className="text-white/60 font-sans text-sm leading-relaxed">
                      Despliegue de redes aisladas para análisis de vulnerabilidades y ciberseguridad utilizando Kali Linux.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Profile & Ed */}
            <div className="lg:col-span-5 space-y-16">
              {/* Technical Profile */}
              <motion.div variants={itemVariants}>
                <h4 className="text-sm font-mono text-white/40 mb-8 tracking-[0.2em] uppercase border-b border-white/10 pb-4">Technical Profile</h4>
                <div className="space-y-6">
                  <div>
                    <span className="block text-xs font-mono text-accent mb-2">LANGUAGES</span>
                    <p className="text-white/70 font-sans text-sm leading-relaxed">Python, Java, C#, C++, JavaScript, TypeScript, PHP, SQL, PL/SQL.</p>
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-accent mb-2">ARCHITECTURE & DATA</span>
                    <p className="text-white/70 font-sans text-sm leading-relaxed">AWS, GCP, Microservices, SSO, SQL Server, MySQL, Oracle, Databricks.</p>
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-accent mb-2">IoT & MODELING</span>
                    <p className="text-white/70 font-sans text-sm leading-relaxed">Astropy, Telemetry, Arduino, ESP32, SG90, SO(3), Kinematics, Fusion 360.</p>
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-accent mb-2">INFRASTRUCTURE</span>
                    <p className="text-white/70 font-sans text-sm leading-relaxed">Cisco, ASA, Linux, Virtual Machines, Scrum, RUP, SCAMPER.</p>
                  </div>
                </div>
              </motion.div>

              {/* Education */}
              <motion.div variants={itemVariants}>
                <h4 className="text-sm font-mono text-white/40 mb-8 tracking-[0.2em] uppercase border-b border-white/10 pb-4">Education</h4>
                <div className="space-y-6">
                  <div>
                    <h5 className="text-base font-bold font-sans text-white mb-1">Ingeniería en Sistemas y Ciencias de la Computación</h5>
                    <p className="text-sm text-white/60 font-sans">Universidad Mesoamericana</p>
                    <p className="text-xs text-white/40 font-mono mt-1">2023 — ACTUALIDAD</p>
                  </div>
                  <div>
                    <h5 className="text-base font-bold font-sans text-white mb-1">Bachillerato en Ciencias y Letras con Orientación en Computación</h5>
                    <p className="text-sm text-white/60 font-sans">Colegio Santa Mónica</p>
                    <p className="text-xs text-white/40 font-mono mt-1">2021 — 2022</p>
                  </div>
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div variants={itemVariants}>
                <GlassPanel intensity="light" className="p-6">
                  <h4 className="text-xs font-mono text-white/40 mb-4 tracking-[0.2em] uppercase">Certifications</h4>
                  <div className="space-y-4">
                    <div>
                      <span className="block text-sm text-white font-sans font-bold">HackerRank</span>
                      <p className="text-xs text-white/60 font-sans">Python Development, C# Development, Software Engineer, Problem Solving.</p>
                    </div>
                    <div>
                      <span className="block text-sm text-white font-sans font-bold">Cisco</span>
                      <p className="text-xs text-white/60 font-sans">IT Essentials, IoT, Cybersecurity.</p>
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
