// components/EngineerAvatar.tsx
"use client";
import { useState } from 'react';
import styles from './EngineerAvatar.module.css';

interface EngineerAvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export default function EngineerAvatar({ 
  src = 'https://picsum.photos/seed/dev-avatar/500/500',
  alt = 'Software Engineer Avatar',
  size = 'lg',
  animated = true 
}: EngineerAvatarProps) {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div className={`${styles.avatarContainer} ${styles[size]}`}>
      {/* Fondo entrelazado con gradiente */}
      <div className={styles.backgroundMesh}>
        <svg className={styles.meshSvg} viewBox="0 0 400 400">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsla(var(--primary) / 0.5)" />
              <stop offset="100%" stopColor="hsla(var(--accent) / 0.6)" />
            </linearGradient>
            <pattern id="circuit" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20h40M20 0v40" stroke="hsl(var(--primary-foreground))" strokeOpacity="0.1" strokeWidth="1"/>
              <circle cx="20" cy="20" r="2" fill="hsl(var(--primary))" fillOpacity="0.2"/>
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#gradient1)" />
          <rect width="400" height="400" fill="url(#circuit)" />
        </svg>
      </div>
      
      {/* Avatar cuadrado */}
      <div className={styles.avatarWrapper}>
        <img
          src={src}
          alt={alt}
          data-ai-hint="software developer avatar"
          className={`${styles.avatar} ${loaded ? styles.loaded : ''}`}
          onLoad={() => setLoaded(true)}
        />
        
        {/* Borde animado */}
        {animated && (
          <div className={styles.borderAnimation}></div>
        )}
      </div>
      
      {/* Elementos decorativos de código */}
      <div className={styles.codeElements}>
        <span className={styles.tag}>&lt;dev&gt;</span>
        <span className={styles.bracket}>{'{ }'}</span>
        <span className={styles.function}>fn()</span>
      </div>
    </div>
  );
}
