export type CapabilityId = 
  | 'software-engineering'
  | 'frontend' 
  | 'backend' 
  | 'architecture' 
  | 'data' 
  | 'iot' 
  | 'security' 
  | '3d-cad';

export type EvidenceSource = 'github' | 'cv' | 'live';

export interface PortfolioProject {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  problemSolved?: string;
  technicalApproach?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  capabilities: CapabilityId[];
  sourceEvidence: EvidenceSource[];
  status: 'production' | 'academic' | 'development';
}

export interface Capability {
  id: CapabilityId;
  label: string;
  description: string;
  technologies: string[];
}

export const capabilities: Capability[] = [
  {
    id: 'software-engineering',
    label: 'SOFTWARE ENGINEERING',
    description: 'Systematic approach to software design, requirement analysis, and enterprise modeling.',
    technologies: ['UML', 'Design Patterns', 'Scrum', 'RUP', 'SCAMPER']
  },
  {
    id: 'frontend',
    label: 'FRONTEND',
    description: 'Frontend architecture, reusable UI, and interactive web experiences.',
    technologies: ['React', 'Angular', 'TypeScript', 'Tailwind', 'Framer Motion']
  },
  {
    id: 'backend',
    label: 'BACKEND',
    description: 'API design, secure authentication, and database modeling.',
    technologies: ['Node.js', 'Express', 'Python', 'Flask', 'PostgreSQL', 'C#', '.NET']
  },
  {
    id: 'architecture',
    label: 'SYSTEM ARCHITECTURE',
    description: 'Cloud infrastructure, SSO, and scalable multi-tenant platforms.',
    technologies: ['AWS', 'GCP', 'Microservices', 'SSO']
  },
  {
    id: 'data',
    label: 'DATA ENGINEERING',
    description: 'Dimensional modeling, ETL pipelines, and analytical databases.',
    technologies: ['Oracle PL/SQL', 'SQL Server', 'Databricks', 'Kimball']
  },
  {
    id: 'iot',
    label: 'IoT & MECATRONICS',
    description: 'Hardware-software integration, telemetry, and automated actuation.',
    technologies: ['Arduino', 'ESP32', 'SG90', 'C++']
  },
  {
    id: 'security',
    label: 'SECURITY',
    description: 'Vulnerability analysis, isolated environments, and access control.',
    technologies: ['Kali Linux', 'Cisco ASA', 'Virtualization']
  },
  {
    id: '3d-cad',
    label: '3D / CAD',
    description: 'Mathematical modeling, rotational matrices, and 3D rendering.',
    technologies: ['Three.js', 'WebGL', 'Fusion 360', 'SO(3)']
  }
];

export const projects: PortfolioProject[] = [
  {
    id: 'proj-stellar',
    name: 'Stellar Tracker',
    slug: 'stellar-tracker',
    shortDescription: 'Sistema mecatrónico de posicionamiento estelar automatizado.',
    description: 'Diseño IoT de tres capas para cálculos astronómicos, frontend de telemetría y actuación mediante Arduino y servomotores. Integra matrices de rotación y cinemática directa.',
    problemSolved: 'Resolver el desafío de la dinámica celeste impulsada por la rotación de la Tierra mediante hardware de bajo coste.',
    technicalApproach: 'Frontend en React/R3F, cálculos astronómicos con Astropy y Python, actuación con Arduino UNO/SG90.',
    githubUrl: 'https://github.com/Defiilol11/stellar-tracker',
    liveUrl: 'https://stellar-tracker.vercel.app/',
    technologies: ['Python', 'Flask', 'Astropy', 'Arduino', 'React', 'Three.js'],
    capabilities: ['iot', '3d-cad', 'backend'],
    sourceEvidence: ['github', 'cv', 'live'],
    status: 'academic'
  },
  {
    id: 'proj-pm',
    name: 'Project Management App (Deffavia Stack)',
    slug: 'project-management',
    shortDescription: 'Plataforma web interactiva para gestión y reservas.',
    description: 'Sistema completo con autenticación JWT, manejo de concurrencia en base de datos mediante locks, sistema VIP y exportación/importación XML. Basado en la arquitectura evidenciada en Deffavia.',
    problemSolved: 'Gestión segura y concurrente de recursos interactivos evitando condiciones de carrera (Double-booking).',
    technicalApproach: 'Angular Standalone Components para la UI interactiva, Node.js/Express para la API y PostgreSQL con locks para concurrencia.',
    githubUrl: 'https://github.com/Defiilol11/deffavia',
    liveUrl: 'https://projectmanagementapp.taracena.me/',
    technologies: ['Angular', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL'],
    capabilities: ['frontend', 'backend', 'architecture', 'software-engineering'],
    sourceEvidence: ['github', 'live'],
    status: 'production'
  },
  {
    id: 'proj-scrid',
    name: 'Auditoría y desarrollo de SCRID',
    slug: 'scrid',
    shortDescription: 'Transformación digital del proceso de gestión de recursos universitarios.',
    description: 'Sustitución de controles manuales por un ecosistema auditable con reglas de negocio, SSO institucional y transacciones de Check-in/Check-out mediante códigos QR.',
    technologies: ['SSO', 'Microservicios', 'Arquitectura Centralizada'],
    capabilities: ['architecture', 'security'],
    sourceEvidence: ['cv'],
    status: 'academic'
  },
  {
    id: 'proj-saas',
    name: 'Arquitectura para SaaS de Inventario',
    slug: 'saas-inventory',
    shortDescription: 'Plataforma SaaS para sincronización de inventarios en tiempo real.',
    description: 'Diseño del business case y de la arquitectura de una plataforma enfocada en PyMEs del sector retail y preparada para crecimiento multi-tenant.',
    technologies: ['AWS', 'GCP', 'Multi-tenant'],
    capabilities: ['architecture'],
    sourceEvidence: ['cv'],
    status: 'academic'
  },
  {
    id: 'proj-dw',
    name: 'Data Warehouse Estadístico',
    slug: 'dw-impuestos',
    shortDescription: 'Base de datos analítica para el procesamiento de impuestos a la propiedad.',
    description: 'Diseño y construcción de BD analítica utilizando modelo dimensional en esquema de estrella y procesos ETL desarrollados con PL/SQL.',
    technologies: ['Oracle PL/SQL', 'ETL', 'Modelado Dimensional'],
    capabilities: ['data'],
    sourceEvidence: ['cv'],
    status: 'academic'
  },
  {
    id: 'proj-pentesting',
    name: 'Laboratorio de Pentesting y Ciberseguridad',
    slug: 'pentesting-lab',
    shortDescription: 'Entorno controlado para pruebas de seguridad.',
    description: 'Despliegue de redes aisladas y máquinas virtuales para análisis de vulnerabilidades e ingeniería social aplicada a infraestructuras informáticas.',
    technologies: ['Kali Linux', 'VMs', 'Virtualización'],
    capabilities: ['security'],
    sourceEvidence: ['cv'],
    status: 'academic'
  },
  {
    id: 'proj-erp',
    name: 'ERP Scout',
    slug: 'erp-scout',
    shortDescription: 'Sistema de Planificación de Recursos.',
    description: 'Diseño técnico, documentación y modelado integral de un sistema ERP en la nube adaptado a requerimientos operativos.',
    technologies: ['UML', 'Modelado', 'Requerimientos'],
    capabilities: ['software-engineering', 'architecture'],
    sourceEvidence: ['cv'],
    status: 'academic'
  }
];
