# GitHub & CV Capability Audit

## 1. Repositorios Revisados
- **stellar-tracker**: JavaScript, Python, telemetría, IoT, Astropy.
- **deffavia**: Angular, TypeScript, PostgreSQL, API, SSO (Flight seat reservation system).
- **Express-API-blog**: JavaScript, Express, API estilo Twitter.
- **MvcMusicStoreDefii**: C#, .NET Core, Tailwind CSS, MVC.
- **Dior-Online-Shop**: PHP, Online Shop System.
- **Proyecto_UMES_2023**: Jupyter Notebook, IoT, Electrónica.

## 2. Proyectos Seleccionados para la Capability Map
1. **Stellar Tracker**: Proyecto IoT, Mecatrónica, Python, 3D, Cinemática Directa. (Fuente: CV + GitHub + Live Demo).
2. **Deffavia (Airseat Flight Reservation / "Project Management App" equivalente técnico)**: Frontend Angular, Node API, PostgreSQL. (Fuente: GitHub `deffavia`). *Nota: El usuario menciona "Project Management App" con link live (Angular/Node), cuyo código base parece correlacionarse con `deffavia` o `angular-test`. Usaremos la live URL proporcionada pero la evidencia técnica de `deffavia`.*
3. **SCRID (Auditoría y desarrollo)**: SSO, Arquitectura Centralizada, Auditoría. (Fuente: CV exclusivo).
4. **SaaS Inventario Omnicanal**: Multi-tenant, AWS/GCP, Arquitectura. (Fuente: CV exclusivo).
5. **ERP Scout**: Arquitectura empresarial, UML, Modelado. (Fuente: CV exclusivo).
6. **Data Warehouse Impuestos**: ETL, PL/SQL, Oracle, Modelo Estrella. (Fuente: CV exclusivo).
7. **Laboratorio Pentesting**: Ciberseguridad, Kali Linux, Redes aisladas. (Fuente: CV exclusivo).

## 3. Capabilities Verificadas & Relaciones

| CAPABILITY | PROJECT | EVIDENCE SOURCE | TECHNOLOGIES | CONFIDENCE |
|---|---|---|---|---|
| **SOFTWARE ENGINEERING** | Deffavia / PM App | GitHub (`deffavia`), Live | Angular, Node.js, Express, TS | VERIFIED |
| **SOFTWARE ENGINEERING** | ERP Scout | CV | Modelado UML, Requerimientos | VERIFIED (CV) |
| **FRONTEND** | Deffavia / PM App | GitHub (`deffavia`), Live | Angular, TypeScript, Tailwind | VERIFIED |
| **BACKEND** | Deffavia / Express-API | GitHub (`deffavia`, `Express-API-blog`) | Node.js, Express, JWT | VERIFIED |
| **SYSTEM ARCHITECTURE** | SaaS Inventario | CV | AWS, GCP, Multi-tenant | VERIFIED (CV) |
| **DATA ENGINEERING** | DW Impuestos | CV | Oracle PL/SQL, ETL, Kimball | VERIFIED (CV) |
| **IoT & MECATRONICS** | Stellar Tracker | CV, GitHub (`stellar-tracker`), Live | Arduino, SG90, Python, Flask | VERIFIED |
| **SECURITY** | Pentesting Lab | CV | Kali Linux, VM, Redes | VERIFIED (CV) |
| **3D / CAD** | Stellar Tracker | CV, Live | Fusion 360, Matrices SO(3) | VERIFIED |

## 4. Discrepancias CV vs GitHub
- **Falta de código público para Data Warehouse y Pentesting**: Estos proyectos aparecen detallados en el CV, pero no hay repositorios públicos asociados en la cuenta `Defiilol11`. Serán incluidos con la etiqueta de evidencia `[CV]`.
- **Project Management App vs Deffavia**: El usuario proporcionó el link `https://projectmanagementapp.taracena.me/` pero el repositorio más cercano es `deffavia` (un sistema de reserva de vuelos en Angular/Node). Dado que comparten el stack técnico descrito, la evidencia técnica se tomará de la capacidad de Fullstack Angular/Node demostrada.

## 5. Decisiones Arquitectónicas (Capability Map)
- La interfaz no usará barras de porcentaje. 
- Será un Grafo Conceptual Interactivo (Nodos flotantes 2D con animaciones `framer-motion` y Glass UI).
- Cada Nodo (ej. IoT) abrirá un `GlassModal` detallando los proyectos.
- Se mantendrá el estilo *Liquid Glass* sin exagerar el neon (sobrio y premium).
