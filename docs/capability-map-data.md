# Capability Map Data Model

## Modelo TypeScript (`src/data/projects.ts`)

```typescript
export type CapabilityId = 
  | 'frontend' 
  | 'backend' 
  | 'architecture' 
  | 'data' 
  | 'iot' 
  | 'security' 
  | '3d';

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
```

## Datos de Capabilities (Nodos)
- **Frontend**: "Frontend architecture, reusable UI and interactive web experiences." (Angular, React, Tailwind, Framer Motion)
- **Backend**: "API design, secure authentication and database modeling." (Node.js, Express, PostgreSQL, C#, PHP)
- **System Architecture**: "Cloud infrastructure, SSO, and scalable multi-tenant platforms." (AWS, GCP, Microservices)
- **Data Engineering**: "Dimensional modeling, ETL pipelines and analytical databases." (Oracle PL/SQL, SQL Server, Databricks)
- **IoT & Mecatronics**: "Hardware-software integration, telemetry and automated actuation." (Python, Arduino, ESP32, C++)
- **Security**: "Vulnerability analysis, isolated environments and access control." (Kali Linux, Cisco ASA, SSO)
- **3D / CAD**: "Mathematical modeling, rotational matrices and interactive 3D rendering." (Three.js, WebGL, Fusion 360, SO(3))

## Relaciones (Proyectos)
- **Stellar Tracker**: [iot, 3d, backend]
- **Deffavia (Airseat)**: [frontend, backend, architecture]
- **Project Management App**: [frontend, backend]
- **SCRID**: [architecture, security]
- **SaaS Omnicanal**: [architecture]
- **DW Impuestos**: [data]
- **Pentesting Lab**: [security]
- **ERP Scout**: [architecture, backend]
