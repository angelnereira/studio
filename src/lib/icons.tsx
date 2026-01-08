
import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

// Nombre: git
// Descripción: Icono estilizado de Git.
export const GitIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M18 6L6 18" /><path d="M6 9v6" />
    </svg>
);

// Nombre: github
// Descripción: Icono estilizado de GitHub.
export const GithubIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

// Nombre: ci-cd
// Descripción: Icono estilizado de CI/CD.
export const CiCdIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" /><path d="m12 6-3.5 3.5" /><path d="M12 6h3.5" /><path d="M12 6v3.5" /><path d="m12 18 3.5-3.5" /><path d="M12 18h-3.5" /><path d="M12 18v-3.5" />
    </svg>
);

// Nombre: linux
// Descripción: Icono estilizado de Linux (Tux).
export const LinuxIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M13.84 11.33c-.1-1.04.1-2.12.53-3.15.44-1.04.53-2.24.23-3.3l.2.3c.3 1.03.03 2.2-.5 3.2-.54 1-.84 2.1-.73 3.15" /><path d="M15.45 13.11c.88.94 1.45 2.1 1.45 3.39 0 2.7-2.2 4.9-5 4.9s-5-2.2-5-4.9c0-1.28.57-2.45 1.45-3.39" /><path d="M10.16 11.33c.1-1.04-.1-2.12-.53-3.15-.44-1.04-.53-2.24-.23-3.3l-.2.3c-.3 1.03-.03 2.2.5 3.2.54 1 .84 2.1.73 3.15" /><path d="M12 13.5a1.5 1.5 0 0 0-3 0" /><path d="M12.01 2.01a.01.01 0 1 0 0 .02" /><path d="M12.01 2.01a.01.01 0 1 0 0 .02" /><path d="M12 18.5c.33.33.67.5 1 .5s.67-.17 1-.5" />
    </svg>
);

// Nombre: openshift
// Descripción: Icono estilizado de OpenShift.
export const OpenShiftIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12.38 2.01 6.23 4.41a2 2 0 0 0-1.23 1.83v9.52a2 2 0 0 0 1.23 1.83l6.15 2.4a2 2 0 0 0 1.54 0l6.15-2.4a2 2 0 0 0 1.23-1.83V6.24a2 2 0 0 0-1.23-1.83l-6.15-2.4a2 2 0 0 0-1.54 0z" /><path d="m16.5 8-9 4.5" /><path d="m12 12.25 4.5 2.25" /><path d="M12 17v-4.75" />
    </svg>
);

// Nombre: prisma
// Descripción: Icono estilizado de Prisma ORM.
export const PrismaIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
        <path d="M12 22V12" />
        <path d="M12 12L3 7" />
        <path d="M12 12l9-5" />
    </svg>
);

// Nombre: neon
// Descripción: Icono estilizado de Neon Database.
export const NeonIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

// Nombre: oracle-cloud
// Descripción: Icono estilizado de Oracle Cloud Infrastructure.
export const OracleCloudIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <ellipse cx="12" cy="12" rx="10" ry="5" />
        <path d="M2 12v4c0 2.76 4.48 5 10 5s10-2.24 10-5v-4" />
        <path d="M2 8v4" />
        <path d="M22 8v4" />
        <ellipse cx="12" cy="8" rx="10" ry="5" />
    </svg>
);
