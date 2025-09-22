
import * as React from "react";
import { Briefcase, Code, Database, GitBranch, Layers, Server, Shield, Zap, Repeat, FileCog, Users, Code2, BrainCircuit, Search, Route } from "lucide-react";
import { FaPython, FaNodeJs, FaDocker, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiPostgresql, SiFirebase, SiGooglecloud, SiVercel, SiKubernetes, SiTailwindcss, SiGithubactions } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { GitIcon, GithubIcon, CiCdIcon, LinuxIcon, OpenShiftIcon } from "./icons";


export type PracticalAbility = {
  title: string;
  description: string;
  icon: React.ElementType;
};

export type Skill = {
  name: string;
  slug: string;
  icon: React.ElementType;
  description: string;
  practicalAbilities: PracticalAbility[];
};


export const skills: Skill[] = [
  {
    name: "Ingeniería de Software",
    slug: "ingenieria-de-software",
    icon: FileCog,
    description: "Un buen fundamento de software garantiza que la solución pueda crecer y adaptarse con el negocio, previniendo problemas a futuro.",
    practicalAbilities: [
        { title: "Diseño de Arquitecturas Escalables", description: "Diseño sistemas (Monolitos, Microservicios, Serverless) que pueden crecer junto con el negocio del cliente, evitando futuros cuellos de botella.", icon: Layers },
        { title: "Patrones de Diseño de Software", description: "Aplico patrones de diseño probados para resolver problemas comunes, lo que resulta en un código más limpio, reutilizable y comprensible para el equipo.", icon: Code2 },
        { title: "Calidad y Pruebas de Código", description: "Implemento una cultura de calidad a través de pruebas unitarias, de integración y E2E, garantizando que el software entregado sea fiable y cumpla con los requisitos.", icon: Shield },
    ]
  },
  {
    name: "Metodologías Ágiles",
    slug: "metodologias-agiles",
    icon: Users,
    description: "La entrega de valor rápida y continua es más importante que seguir un plan rígido, permitiendo adaptabilidad y feedback constante.",
    practicalAbilities: [
        { title: "Gestión de Proyectos con Scrum/Kanban", description: "Organizo proyectos en sprints o flujos continuos, gestiono backlogs y facilito ceremonias ágiles para una entrega de valor predecible.", icon: Briefcase },
        { title: "Planificación Iterativa y Adaptativa", description: "Descompongo problemas complejos en entregas pequeñas, permitiendo la adaptación a cambios y la incorporación constante del feedback del cliente.", icon: Repeat },
        { title: "Enfoque en el Cliente (User Stories)", description: "Traduzco los requisitos del negocio en historias de usuario claras y accionables, asegurando que el desarrollo esté siempre alineado con las necesidades del usuario final.", icon: Search },
    ]
  },
  { 
    name: "Python", 
    slug: "python",
    icon: FaPython, 
    description: "Su versatilidad me permite construir desde APIs robustas hasta complejos modelos de IA, siendo la navaja suiza para resolver problemas de backend.",
    practicalAbilities: [
        { title: "Desarrollo de APIs RESTful", description: "Construcción de APIs robustas y escalables con frameworks como FastAPI y Flask para dar soporte a aplicaciones web y móviles.", icon: Server },
        { title: "Automatización y Scripting", description: "Creación de scripts para automatizar tareas repetitivas (web scraping, generación de reportes), optimizando la eficiencia operativa de los negocios.", icon: Zap },
        { title: "Machine Learning y IA", description: "Implementación de modelos de IA con TensorFlow y Scikit-learn para crear soluciones como chatbots, sistemas de recomendación y análisis predictivo.", icon: BrainCircuit },
    ]
  },
  { 
    name: "TypeScript", 
    slug: "typescript",
    icon: SiTypescript, 
    description: "La seguridad de tipos en proyectos grandes no es negociable. Reduce errores, mejora la colaboración y hace el código auto-documentado.",
    practicalAbilities: [
        { title: "Tipado Estricto en Proyectos Complejos", description: "Garantizo la robustez y escalabilidad del código en aplicaciones grandes, reduciendo errores antes de que lleguen a producción.", icon: Shield },
        { title: "Desarrollo Full-Stack", description: "Uso TypeScript tanto en el frontend con React/Next.js como en el backend con Node.js, creando un ecosistema de desarrollo cohesivo.", icon: Layers },
        { title: "Interfaces y Tipos Reutilizables", description: "Creo sistemas de tipos que mejoran la colaboración y la mantenibilidad a largo plazo, clave en proyectos para equipos.", icon: GitBranch },
    ]
  },
  { 
    name: "Next.js", 
    slug: "nextjs",
    icon: TbBrandNextjs, 
    description: "Es el estándar de oro para crear aplicaciones React de producción: rápidas, optimizadas para SEO y con una experiencia de desarrollo superior.",
    practicalAbilities: [
      { title: "Renderizado Híbrido (SSR y SSG)", description: "Optimizo el rendimiento y el SEO de las aplicaciones web eligiendo la estrategia de renderizado adecuada para cada caso de uso (dinámico vs. estático).", icon: Zap },
      { title: "APIs con Route Handlers", description: "Construyo APIs eficientes y seguras directamente dentro de la aplicación Next.js, ideal para soluciones todo-en-uno como 'Suites PYME'.", icon: Server },
      { title: "Aplicaciones Full-Stack", description: "Creo aplicaciones completas en un monorepo, desde la interfaz de usuario hasta la lógica del servidor, agilizando el desarrollo de 'Soluciones Empresariales'.", icon: Code2 },
    ]
  },
  { 
    name: "Node.js", 
    slug: "nodejs",
    icon: FaNodeJs, 
    description: "Su naturaleza asíncrona es perfecta para construir APIs y microservicios rápidos y eficientes que manejan miles de conexiones sin esfuerzo.",
    practicalAbilities: [
      { title: "APIs REST y GraphQL", description: "Desarrollo APIs performantes y bien estructuradas que sirven como el cerebro para aplicaciones web y móviles complejas.", icon: Server },
      { title: "Sistemas de Autenticación Seguros", description: "Implemento sistemas de seguridad con JWT, OAuth y gestión de sesiones para proteger los datos de los usuarios en todas mis aplicaciones.", icon: Shield },
      { title: "Arquitectura de Microservicios", description: "Diseño sistemas de microservicios para 'Soluciones Empresariales' que requieren alta escalabilidad y resiliencia.", icon: Layers },
    ]
  },
  { 
    name: "Google Cloud", 
    slug: "google-cloud",
    icon: SiGooglecloud, 
    description: "Ofrece una infraestructura de nivel mundial, escalable y segura, permitiéndome construir y desplegar soluciones robustas sin preocuparme por el hardware.",
    practicalAbilities: [
      { title: "Despliegue en Cloud Run y GKE", description: "Empaqueto y despliego aplicaciones en contenedores serverless (Cloud Run) o en clústeres de Kubernetes (GKE) para máxima escalabilidad.", icon: Zap },
      { title: "Bases de Datos Gestionadas", description: "Utilizo Firestore y Cloud SQL para gestionar bases de datos NoSQL y SQL de manera segura y sin preocuparme por la infraestructura.", icon: Database },
      { title: "Arquitecturas Serverless", description: "Diseño y construyo aplicaciones basadas en Cloud Functions para optimizar costos y escalar automáticamente en función de la demanda.", icon: Code2 },
    ]
  },
  { 
    name: "Firebase", 
    slug: "firebase",
    icon: SiFirebase, 
    description: "Es mi herramienta preferida para acelerar el desarrollo. Me permite lanzar MVPs y aplicaciones completas en tiempo récord sin sacrificar escalabilidad.",
    practicalAbilities: [
      { title: "Autenticación de Usuarios Simplificada", description: "Implemento sistemas de login social (Google, etc.) y por correo/contraseña de forma rápida y segura para cualquier app.", icon: Shield },
      { title: "Bases de Datos en Tiempo Real (Firestore)", description: "Utilizo Firestore para sincronizar datos entre clientes al instante, ideal para chats, dashboards y apps colaborativas.", icon: Database },
      { title: "Desarrollo Rápido de MVPs", description: "Acelero la creación de prototipos y Productos Mínimos Viables, permitiendo a las startups validar ideas en el mercado rápidamente.", icon: Briefcase },
    ]
  },
  { 
    name: "Docker", 
    slug: "docker",
    icon: FaDocker, 
    description: "Garantiza consistencia absoluta. Una aplicación en un contenedor funciona igual en desarrollo, pruebas y producción, eliminando sorpresas.",
    practicalAbilities: [
        { title: "Contenerización de Aplicaciones", description: "Empaqueto aplicaciones y sus dependencias en contenedores, asegurando que funcionen de manera idéntica en cualquier entorno.", icon: Briefcase },
        { title: "Orquestación con Docker Compose", description: "Defino y gestiono aplicaciones multi-contenedor, simplificando la configuración de entornos de desarrollo complejos.", icon: Layers },
        { title: "Optimización de Imágenes", description: "Construyo imágenes de Docker ligeras y seguras, lo que resulta en despliegues más rápidos y una menor superficie de ataque.", icon: Shield },
    ]
  },
  { 
    name: "Git", 
    slug: "git",
    icon: FaGitAlt, 
    description: "Es el pilar de la colaboración en equipo. Permite un desarrollo paralelo, seguro y un historial de cambios impecable en cualquier proyecto.",
    practicalAbilities: [
        { title: "Control de Versiones Avanzado", description: "Manejo ramas, fusiones y rebases para mantener un historial de código limpio, permitiendo la colaboración en equipos grandes y pequeños.", icon: GitBranch },
        { title: "Estrategias de Branching (GitFlow)", description: "Implemento flujos de trabajo como GitFlow para gestionar el desarrollo de nuevas funcionalidades y lanzamientos de forma ordenada y sin errores.", icon: Layers },
        { title: "Resolución de Conflictos", description: "Soluciono conflictos de fusión de manera eficiente, una habilidad clave para mantener la integridad del código en proyectos colaborativos.", icon: Code2 },
    ]
  },
  { 
    name: "GitHub/GitLab", 
    slug: "github",
    icon: GithubIcon, 
    description: "Centralizan el código, automatizan los flujos de trabajo y potencian la colaboración, convirtiéndose en el centro de operaciones de cualquier proyecto.",
    practicalAbilities: [
        { title: "Automatización con GitHub Actions", description: "Configuro flujos de trabajo (CI/CD) para automatizar pruebas y despliegues, acelerando la entrega de valor a los usuarios.", icon: Zap },
        { title: "Revisión de Código (Pull Requests)", description: "Facilito la colaboración y aseguro la calidad del código a través de un proceso de revisión estructurado, esencial en mentorías de equipo.", icon: GitBranch },
        { title: "Gestión de Proyectos", description: "Utilizo las herramientas de gestión de proyectos (Issues, Projects) para organizar tareas y mantener la visibilidad del progreso.", icon: Briefcase },
    ]
  },
  { 
    name: "CI/CD", 
    slug: "cicd",
    icon: SiGithubactions, 
    description: "La automatización es la clave para entregar software de alta calidad de forma rápida y fiable, minimizando el riesgo de errores humanos.",
    practicalAbilities: [
        { title: "Pipelines de Despliegue Automatizado", description: "Diseño pipelines que automatizan el proceso desde el `git push` hasta la producción, asegurando despliegues rápidos y consistentes.", icon: Zap },
        { title: "Pruebas Automatizadas", description: "Integro pruebas unitarias, de integración y end-to-end en el pipeline para detectar errores tempranamente y garantizar la calidad.", icon: Shield },
        { title: "Entrega Continua y Segura", description: "Configuro despliegues automáticos a entornos de staging y producción, utilizando estrategias como blue-green para minimizar el riesgo.", icon: Briefcase },
    ]
  },
  { 
    name: "Linux", 
    slug: "linux",
    icon: LinuxIcon, 
    description: "Es el sistema operativo de la nube. Su dominio me permite administrar, asegurar y optimizar el entorno donde viven las aplicaciones.",
    practicalAbilities: [
        { title: "Administración de Servidores", description: "Configuro, aseguro y mantengo servidores Linux para alojar aplicaciones web de alto rendimiento, como parte de mis planes de soporte.", icon: Server },
        { title: "Scripting en Bash", description: "Automatizo tareas de administración de sistemas y despliegue con scripts de Bash, reduciendo el trabajo manual y los errores humanos.", icon: Zap },
        { title: "Gestión de Redes y Seguridad", description: "Configuro firewalls (iptables, ufw) y gestiono la red para proteger las aplicaciones y los datos de los clientes contra amenazas.", icon: Shield },
    ]
  },
  { 
    name: "Vercel", 
    slug: "vercel",
    icon: SiVercel, 
    description: "Es la plataforma definitiva para desplegar aplicaciones Next.js, ofreciendo un rendimiento global inigualable y una experiencia de desarrollo sin fricciones.",
    practicalAbilities: [
        { title: "Despliegue Continuo (GitOps)", description: "Integro repositorios de GitHub para un despliegue automático en cada `push`, permitiendo una entrega de funcionalidades extremadamente rápida.", icon: Zap },
        { title: "Gestión de Dominios y DNS", description: "Configuro dominios personalizados y gestiono los registros DNS para que los sitios de mis clientes estén en línea de forma profesional y rápida.", icon: Server },
        { title: "Edge Functions", description: "Utilizo funciones en el borde de la red para ejecutar lógica de backend con baja latencia, ideal para personalización y A/B testing.", icon: Code2 },
    ]
  },
  { 
    name: "Kubernetes", 
    slug: "kubernetes",
    icon: SiKubernetes,
    description: "Es el estándar para orquestar aplicaciones en contenedores a gran escala, garantizando alta disponibilidad, resiliencia y escalabilidad automática.",
    practicalAbilities: [
        { title: "Orquestación de Contenedores", description: "Gestiono el ciclo de vida de aplicaciones en contenedores para alta disponibilidad y escalabilidad, fundamental para sistemas críticos.", icon: Layers },
        { title: "Despliegues sin Downtime", description: "Realizo actualizaciones de aplicaciones utilizando estrategias como 'rolling updates' para no afectar a los usuarios durante el mantenimiento.", icon: Zap },
        { title: "Auto-escalado (HPA)", description: "Configuro el escalado automático de aplicaciones basado en el uso de CPU y memoria, garantizando rendimiento y control de costos.", icon: Briefcase },
    ]
  },
  { 
    name: "OpenShift", 
    slug: "openshift",
    icon: OpenShiftIcon, 
    description: "Es la solución Kubernetes preferida por el mundo empresarial, ofreciendo un ecosistema de desarrollo seguro y robusto para entornos corporativos.",
    practicalAbilities: [
        { title: "Desarrollo y Despliegue Empresarial", description: "Utilizo las herramientas integradas para un ciclo de vida de desarrollo de software seguro y eficiente en grandes organizaciones.", icon: Briefcase },
        { title: "Seguridad y Cumplimiento Normativo", description: "Aplico políticas de seguridad y cumplo con los estándares corporativos, una necesidad en sectores regulados como finanzas o salud.", icon: Shield },
        { title: "Pipelines CI/CD con Tekton", description: "Construyo y gestiono pipelines de CI/CD nativos en la plataforma para una automatización completa y segura dentro del entorno corporativo.", icon: Zap },
    ]
  },
  { 
    name: "Tailwind CSS", 
    slug: "tailwindcss",
    icon: SiTailwindcss, 
    description: "Me permite construir interfaces de usuario complejas y personalizadas a una velocidad increíble, sin sacrificar la consistencia del diseño.",
    practicalAbilities: [
        { title: "Diseño de Interfaces a Medida", description: "Creo diseños únicos y consistentes sin salir del HTML, aplicando la filosofía 'utility-first' para una máxima personalización.", icon: Code2 },
        { title: "Sistemas de Diseño Escalables", description: "Adapto y extiendo el tema de Tailwind para crear sistemas de diseño que se alinean con la identidad de marca del cliente y son fáciles de mantener.", icon: Layers },
        { title: "Desarrollo Rápido de UI", description: "Acelero significativamente el proceso de maquetación de interfaces complejas y responsivas, entregando prototipos funcionales en tiempo récord.", icon: Zap },
    ]
  },
  { 
    name: "PostgreSQL", 
    slug: "postgresql",
    icon: SiPostgresql, 
    description: "Es una base de datos relacional extremadamente robusta, fiable y extensible, ideal para aplicaciones que demandan integridad y consistencia de datos.",
    practicalAbilities: [
        { title: "Diseño de Esquemas Relacionales", description: "Modelo estructuras de datos eficientes y normalizadas para garantizar la integridad y el rendimiento de la información crítica del negocio.", icon: Database },
        { title: "Consultas SQL Optimizadas", description: "Escribo consultas complejas y optimizadas (con JOINs, subqueries, etc.) para obtener datos de manera eficiente en aplicaciones de alto rendimiento.", icon: Code2 },
        { title: "Gestión de Transacciones ACID", description: "Aseguro la consistencia de los datos en operaciones críticas (como pagos o movimientos de inventario) utilizando el sistema transaccional de PostgreSQL.", icon: Shield },
    ]
  }
];
