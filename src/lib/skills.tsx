import * as React from "react";
import { Briefcase, Code, Database, GitBranch, Layers, Server, Shield, Zap, Repeat, FileCog, Users, Code2, BrainCircuit, Search, Route } from "lucide-react";
import { FaPython, FaNodeJs, FaDocker, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiPostgresql, SiFirebase, SiGooglecloud, SiVercel, SiKubernetes, SiTailwindcss, SiGithubactions } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

// Nombre: git
// Descripción: Icono estilizado de Git.
export const GitIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M18 6L6 18" /><path d="M6 9v6" />
    </svg>
);

// Nombre: github
// Descripción: Icono estilizado de GitHub.
export const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

// Nombre: ci-cd
// Descripción: Icono estilizado de CI/CD.
export const CiCdIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" /><path d="m12 6-3.5 3.5" /><path d="M12 6h3.5" /><path d="M12 6v3.5" /><path d="m12 18 3.5-3.5" /><path d="M12 18h-3.5" /><path d="M12 18v-3.5" />
    </svg>
);

// Nombre: linux
// Descripción: Icono estilizado de Linux (Tux).
export const LinuxIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M13.84 11.33c-.1-1.04.1-2.12.53-3.15.44-1.04.53-2.24.23-3.3l.2.3c.3 1.03.03 2.2-.5 3.2-.54 1-.84 2.1-.73 3.15" /><path d="M15.45 13.11c.88.94 1.45 2.1 1.45 3.39 0 2.7-2.2 4.9-5 4.9s-5-2.2-5-4.9c0-1.28.57-2.45 1.45-3.39" /><path d="M10.16 11.33c.1-1.04-.1-2.12-.53-3.15-.44-1.04-.53-2.24-.23-3.3l-.2.3c-.3 1.03-.03 2.2.5 3.2.54 1 .84 2.1.73 3.15" /><path d="M12 13.5a1.5 1.5 0 0 0-3 0" /><path d="M12.01 2.01a.01.01 0 1 0 0 .02" /><path d="M12.01 2.01a.01.01 0 1 0 0 .02" /><path d="M12 18.5c.33.33.67.5 1 .5s.67-.17 1-.5" />
    </svg>
);

// Nombre: openshift
// Descripción: Icono estilizado de OpenShift.
export const OpenShiftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12.38 2.01 6.23 4.41a2 2 0 0 0-1.23 1.83v9.52a2 2 0 0 0 1.23 1.83l6.15 2.4a2 2 0 0 0 1.54 0l6.15-2.4a2 2 0 0 0 1.23-1.83V6.24a2 2 0 0 0-1.23-1.83l-6.15-2.4a2 2 0 0 0-1.54 0z" /><path d="m16.5 8-9 4.5" /><path d="m12 12.25 4.5 2.25" /><path d="M12 17v-4.75" />
    </svg>
);


export type PracticalAbility = {
  title: string;
  description: string;
  icon: React.ReactElement;
};

export type Skill = {
  name: string;
  slug: string;
  icon: React.ReactElement;
  description: string;
  practicalAbilities: PracticalAbility[];
};


export const skills: Skill[] = [
  {
    name: "Ingeniería de Software",
    slug: "ingenieria-de-software",
    icon: <FileCog />,
    description: "Aplico principios de ingeniería para diseñar, construir y mantener software de alta calidad. Mi filosofía es crear soluciones que no solo funcionen hoy, sino que sean robustas, escalables y fáciles de mantener mañana, solucionando problemas de negocio de raíz.",
    practicalAbilities: [
        { title: "Diseño de Arquitecturas Escalables", description: "Diseño sistemas (Monolitos, Microservicios, Serverless) que pueden crecer junto con el negocio del cliente, evitando futuros cuellos de botella.", icon: <Layers /> },
        { title: "Patrones de Diseño de Software", description: "Aplico patrones de diseño probados para resolver problemas comunes, lo que resulta en un código más limpio, reutilizable y comprensible para el equipo.", icon: <Code2 /> },
        { title: "Calidad y Pruebas de Código", description: "Implemento una cultura de calidad a través de pruebas unitarias, de integración y E2E, garantizando que el software entregado sea fiable y cumpla con los requisitos.", icon: <Shield /> },
    ]
  },
  {
    name: "Metodologías Ágiles",
    slug: "metodologias-agiles",
    icon: <Users />,
    description: "Gestiono proyectos utilizando marcos ágiles como Scrum y Kanban. Este enfoque me permite entregar valor de forma incremental, adaptarme a los cambios del mercado y mantener una comunicación transparente con el cliente, asegurando que el producto final resuelva el problema real.",
    practicalAbilities: [
        { title: "Gestión de Proyectos con Scrum/Kanban", description: "Organizo proyectos en sprints o flujos continuos, gestiono backlogs y facilito ceremonias ágiles para una entrega de valor predecible.", icon: <Briefcase /> },
        { title: "Planificación Iterativa y Adaptativa", description: "Descompongo problemas complejos en entregas pequeñas, permitiendo la adaptación a cambios y la incorporación constante del feedback del cliente.", icon: <Repeat /> },
        { title: "Enfoque en el Cliente (User Stories)", description: "Traduzco los requisitos del negocio en historias de usuario claras y accionables, asegurando que el desarrollo esté siempre alineado con las necesidades del usuario final.", icon: <Search /> },
    ]
  },
  { 
    name: "Python", 
    slug: "python",
    icon: <FaPython />, 
    description: "Lo utilizo para construir el backend de aplicaciones, desarrollar soluciones de IA, y automatizar procesos complejos, siendo la base de mis servicios de 'Soluciones con IA' y 'Automatización'.",
    practicalAbilities: [
        { title: "Desarrollo de APIs RESTful", description: "Construcción de APIs robustas y escalables con frameworks como FastAPI y Flask para dar soporte a aplicaciones web y móviles.", icon: <Server /> },
        { title: "Automatización y Scripting", description: "Creación de scripts para automatizar tareas repetitivas (web scraping, generación de reportes), optimizando la eficiencia operativa de los negocios.", icon: <Zap /> },
        { title: "Machine Learning y IA", description: "Implementación de modelos de IA con TensorFlow y Scikit-learn para crear soluciones como chatbots, sistemas de recomendación y análisis predictivo.", icon: <BrainCircuit /> },
    ]
  },
  { 
    name: "TypeScript", 
    slug: "typescript",
    icon: <SiTypescript />, 
    description: "Fundamental para crear aplicaciones robustas y escalables. Lo uso en todo el stack (front-end y back-end) para garantizar código de alta calidad y fácil mantenimiento en proyectos empresariales.",
    practicalAbilities: [
        { title: "Tipado Estricto en Proyectos Complejos", description: "Garantizo la robustez y escalabilidad del código en aplicaciones grandes, reduciendo errores antes de que lleguen a producción.", icon: <Shield /> },
        { title: "Desarrollo Full-Stack", description: "Uso TypeScript tanto en el frontend con React/Next.js como en el backend con Node.js, creando un ecosistema de desarrollo cohesivo.", icon: <Layers /> },
        { title: "Interfaces y Tipos Reutilizables", description: "Creo sistemas de tipos que mejoran la colaboración y la mantenibilidad a largo plazo, clave en proyectos para equipos.", icon: <GitBranch /> },
    ]
  },
  { 
    name: "Next.js", 
    slug: "nextjs",
    icon: <TbBrandNextjs />, 
    description: "Mi framework de elección para construir aplicaciones web y sitios de alto rendimiento. Su arquitectura me permite entregar proyectos optimizados para SEO y experiencia de usuario, como los ofrecidos en 'Desarrollo Web'.",
    practicalAbilities: [
      { title: "Renderizado Híbrido (SSR y SSG)", description: "Optimizo el rendimiento y el SEO de las aplicaciones web eligiendo la estrategia de renderizado adecuada para cada caso de uso (dinámico vs. estático).", icon: <Zap /> },
      { title: "APIs con Route Handlers", description: "Construyo APIs eficientes y seguras directamente dentro de la aplicación Next.js, ideal para soluciones todo-en-uno como 'Suites PYME'.", icon: <Server /> },
      { title: "Aplicaciones Full-Stack", description: "Creo aplicaciones completas en un monorepo, desde la interfaz de usuario hasta la lógica del servidor, agilizando el desarrollo de 'Soluciones Empresariales'.", icon: <Code2 /> },
    ]
  },
  { 
    name: "Node.js", 
    slug: "nodejs",
    icon: <FaNodeJs />, 
    description: "El motor para mis APIs y microservicios. Me permite crear backends rápidos, eficientes y escalables que soportan desde 'Tiendas Online' hasta 'Aplicaciones Móviles' complejas.",
    practicalAbilities: [
      { title: "APIs REST y GraphQL", description: "Desarrollo APIs performantes y bien estructuradas que sirven como el cerebro para aplicaciones web y móviles complejas.", icon: <Server /> },
      { title: "Sistemas de Autenticación Seguros", description: "Implemento sistemas de seguridad con JWT, OAuth y gestión de sesiones para proteger los datos de los usuarios en todas mis aplicaciones.", icon: <Shield /> },
      { title: "Arquitectura de Microservicios", description: "Diseño sistemas de microservicios para 'Soluciones Empresariales' que requieren alta escalabilidad y resiliencia.", icon: <Layers /> },
    ]
  },
  { 
    name: "Google Cloud", 
    slug: "google-cloud",
    icon: <SiGooglecloud />, 
    description: "Mi plataforma en la nube predilecta para desplegar y escalar aplicaciones. Diseño arquitecturas resilientes y costo-eficientes, un pilar en mis 'Planes de Soporte y Crecimiento'.",
    practicalAbilities: [
      { title: "Despliegue en Cloud Run y GKE", description: "Empaqueto y despliego aplicaciones en contenedores serverless (Cloud Run) o en clústeres de Kubernetes (GKE) para máxima escalabilidad.", icon: <Zap /> },
      { title: "Bases de Datos Gestionadas", description: "Utilizo Firestore y Cloud SQL para gestionar bases de datos NoSQL y SQL de manera segura y sin preocuparme por la infraestructura.", icon: <Database /> },
      { title: "Arquitecturas Serverless", description: "Diseño y construyo aplicaciones basadas en Cloud Functions para optimizar costos y escalar automáticamente en función de la demanda.", icon: <Code2 /> },
    ]
  },
  { 
    name: "Firebase", 
    slug: "firebase",
    icon: <SiFirebase />, 
    description: "La uso para acelerar el desarrollo de 'Aplicaciones Móviles' y 'Pruebas de Concepto' (MVPs), gestionando autenticación, bases de datos en tiempo real y hosting con agilidad.",
    practicalAbilities: [
      { title: "Autenticación de Usuarios Simplificada", description: "Implemento sistemas de login social (Google, etc.) y por correo/contraseña de forma rápida y segura para cualquier app.", icon: <Shield /> },
      { title: "Bases de Datos en Tiempo Real (Firestore)", description: "Utilizo Firestore para sincronizar datos entre clientes al instante, ideal para chats, dashboards y apps colaborativas.", icon: <Database /> },
      { title: "Desarrollo Rápido de MVPs", description: "Acelero la creación de prototipos y Productos Mínimos Viables, permitiendo a las startups validar ideas en el mercado rápidamente.", icon: <Briefcase /> },
    ]
  },
  { 
    name: "Docker", 
    slug: "docker",
    icon: <FaDocker />, 
    description: "Esencial en mi flujo para empaquetar y desplegar aplicaciones de forma consistente. Garantiza que los sistemas de 'Gestión de Negocios' funcionen igual en desarrollo y producción.",
    practicalAbilities: [
        { title: "Contenerización de Aplicaciones", description: "Empaqueto aplicaciones y sus dependencias en contenedores, asegurando que funcionen de manera idéntica en cualquier entorno.", icon: <Briefcase /> },
        { title: "Orquestación con Docker Compose", description: "Defino y gestiono aplicaciones multi-contenedor, simplificando la configuración de entornos de desarrollo complejos.", icon: <Layers /> },
        { title: "Optimización de Imágenes", description: "Construyo imágenes de Docker ligeras y seguras, lo que resulta en despliegues más rápidos y una menor superficie de ataque.", icon: <Shield /> },
    ]
  },
  { 
    name: "Git", 
    slug: "git",
    icon: <FaGitAlt />, 
    description: "La base de toda colaboración y desarrollo de software profesional. Es indispensable para la integridad del código y la gestión de proyectos de cualquier tamaño.",
    practicalAbilities: [
        { title: "Control de Versiones Avanzado", description: "Manejo ramas, fusiones y rebases para mantener un historial de código limpio, permitiendo la colaboración en equipos grandes y pequeños.", icon: <GitBranch /> },
        { title: "Estrategias de Branching (GitFlow)", description: "Implemento flujos de trabajo como GitFlow para gestionar el desarrollo de nuevas funcionalidades y lanzamientos de forma ordenada y sin errores.", icon: <Layers /> },
        { title: "Resolución de Conflictos", description: "Soluciono conflictos de fusión de manera eficiente, una habilidad clave para mantener la integridad del código en proyectos colaborativos.", icon: <Code2 /> },
    ]
  },
  { 
    name: "GitHub/GitLab", 
    slug: "github",
    icon: <GithubIcon />, 
    description: "Mis plataformas centrales para la colaboración en equipo, revisión de código y, crucialmente, la implementación de pipelines de 'CI/CD' para automatizar despliegues.",
    practicalAbilities: [
        { title: "Automatización con GitHub Actions", description: "Configuro flujos de trabajo (CI/CD) para automatizar pruebas y despliegues, acelerando la entrega de valor a los usuarios.", icon: <Zap /> },
        { title: "Revisión de Código (Pull Requests)", description: "Facilito la colaboración y aseguro la calidad del código a través de un proceso de revisión estructurado, esencial en mentorías de equipo.", icon: <GitBranch /> },
        { title: "Gestión de Proyectos", description: "Utilizo las herramientas de gestión de proyectos (Issues, Projects) para organizar tareas y mantener la visibilidad del progreso.", icon: <Briefcase /> },
    ]
  },
  { 
    name: "CI/CD", 
    slug: "cicd",
    icon: <SiGithubactions />, 
    description: "Una filosofía que aplico en todos mis proyectos empresariales para asegurar entregas rápidas y fiables, minimizando riesgos y acelerando la llegada de nuevas funcionalidades al mercado.",
    practicalAbilities: [
        { title: "Pipelines de Despliegue Automatizado", description: "Diseño pipelines que automatizan el proceso desde el `git push` hasta la producción, asegurando despliegues rápidos y consistentes.", icon: <Zap /> },
        { title: "Pruebas Automatizadas", description: "Integro pruebas unitarias, de integración y end-to-end en el pipeline para detectar errores tempranamente y garantizar la calidad.", icon: <Shield /> },
        { title: "Entrega Continua y Segura", description: "Configuro despliegues automáticos a entornos de staging y producción, utilizando estrategias como blue-green para minimizar el riesgo.", icon: <Briefcase /> },
    ]
  },
  { 
    name: "Linux", 
    slug: "linux",
    icon: <LinuxIcon />, 
    description: "Mi entorno de servidor por defecto. Mi dominio de la línea de comandos me permite administrar, asegurar y optimizar la infraestructura que soporta todas mis soluciones de software.",
    practicalAbilities: [
        { title: "Administración de Servidores", description: "Configuro, aseguro y mantengo servidores Linux para alojar aplicaciones web de alto rendimiento, como parte de mis planes de soporte.", icon: <Server /> },
        { title: "Scripting en Bash", description: "Automatizo tareas de administración de sistemas y despliegue con scripts de Bash, reduciendo el trabajo manual y los errores humanos.", icon: <Zap /> },
        { title: "Gestión de Redes y Seguridad", description: "Configuro firewalls (iptables, ufw) y gestiono la red para proteger las aplicaciones y los datos de los clientes contra amenazas.", icon: <Shield /> },
    ]
  },
  { 
    name: "Vercel", 
    slug: "vercel",
    icon: <SiVercel />, 
    description: "La plataforma ideal para el despliegue de front-ends modernos construidos con Next.js. Garantiza un rendimiento global y una experiencia de desarrollo inigualable para mis proyectos web.",
    practicalAbilities: [
        { title: "Despliegue Continuo (GitOps)", description: "Integro repositorios de GitHub para un despliegue automático en cada `push`, permitiendo una entrega de funcionalidades extremadamente rápida.", icon: <Zap /> },
        { title: "Gestión de Dominios y DNS", description: "Configuro dominios personalizados y gestiono los registros DNS para que los sitios de mis clientes estén en línea de forma profesional y rápida.", icon: <Server /> },
        { title: "Edge Functions", description: "Utilizo funciones en el borde de la red para ejecutar lógica de backend con baja latencia, ideal para personalización y A/B testing.", icon: <Code2 /> },
    ]
  },
  { 
    name: "Kubernetes", 
    slug: "kubernetes",
    icon: <SiKubernetes />,
    description: "Para proyectos de 'Solución Empresarial', utilizo Kubernetes para orquestar contenedores, asegurando alta disponibilidad, escalabilidad automática y una gestión de infraestructura robusta.",
    practicalAbilities: [
        { title: "Orquestación de Contenedores", description: "Gestiono el ciclo de vida de aplicaciones en contenedores para alta disponibilidad y escalabilidad, fundamental para sistemas críticos.", icon: <Layers /> },
        { title: "Despliegues sin Downtime", description: "Realizo actualizaciones de aplicaciones utilizando estrategias como 'rolling updates' para no afectar a los usuarios durante el mantenimiento.", icon: <Zap /> },
        { title: "Auto-escalado (HPA)", description: "Configuro el escalado automático de aplicaciones basado en el uso de CPU y memoria, garantizando rendimiento y control de costos.", icon: <Briefcase /> },
    ]
  },
  { 
    name: "OpenShift", 
    slug: "openshift",
    icon: <OpenShiftIcon />, 
    description: "En entornos corporativos que requieren una capa extra de seguridad y herramientas de desarrollo, implemento OpenShift como plataforma de Kubernetes gestionada y lista para la empresa.",
    practicalAbilities: [
        { title: "Desarrollo y Despliegue Empresarial", description: "Utilizo las herramientas integradas para un ciclo de vida de desarrollo de software seguro y eficiente en grandes organizaciones.", icon: <Briefcase /> },
        { title: "Seguridad y Cumplimiento Normativo", description: "Aplico políticas de seguridad y cumplo con los estándares corporativos, una necesidad en sectores regulados como finanzas o salud.", icon: <Shield /> },
        { title: "Pipelines CI/CD con Tekton", description: "Construyo y gestiono pipelines de CI/CD nativos en la plataforma para una automatización completa y segura dentro del entorno corporativo.", icon: <Zap /> },
    ]
  },
  { 
    name: "Tailwind CSS", 
    slug: "tailwindcss",
    icon: <SiTailwindcss />, 
    description: "Mi framework CSS preferido para diseñar interfaces de usuario personalizadas y responsivas rápidamente. Me permite construir los diseños únicos de mis 'Desarrollos Web' y 'Aplicaciones'.",
    practicalAbilities: [
        { title: "Diseño de Interfaces a Medida", description: "Creo diseños únicos y consistentes sin salir del HTML, aplicando la filosofía 'utility-first' para una máxima personalización.", icon: <Code2 /> },
        { title: "Sistemas de Diseño Escalables", description: "Adapto y extiendo el tema de Tailwind para crear sistemas de diseño que se alinean con la identidad de marca del cliente y son fáciles de mantener.", icon: <Layers /> },
        { title: "Desarrollo Rápido de UI", description: "Acelero significativamente el proceso de maquetación de interfaces complejas y responsivas, entregando prototipos funcionales en tiempo récord.", icon: <Zap /> },
    ]
  },
  { 
    name: "PostgreSQL", 
    slug: "postgresql",
    icon: <SiPostgresql />, 
    description: "La base de datos relacional que elijo para sistemas que requieren integridad de datos y transacciones complejas, como en los 'Sistemas de Gestión de Negocios' y 'E-commerce'.",
    practicalAbilities: [
        { title: "Diseño de Esquemas Relacionales", description: "Modelo estructuras de datos eficientes y normalizadas para garantizar la integridad y el rendimiento de la información crítica del negocio.", icon: <Database /> },
        { title: "Consultas SQL Optimizadas", description: "Escribo consultas complejas y optimizadas (con JOINs, subqueries, etc.) para obtener datos de manera eficiente en aplicaciones de alto rendimiento.", icon: <Code2 /> },
        { title: "Gestión de Transacciones ACID", description: "Aseguro la consistencia de los datos en operaciones críticas (como pagos o movimientos de inventario) utilizando el sistema transaccional de PostgreSQL.", icon: <Shield /> },
    ]
  }
];
