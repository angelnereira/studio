---
title: "Stack 2026: Por qué uso Go, Rust y Kotlin junto a Next.js"
date: "2026-05-14"
author: "Ángel Nereira"
excerpt: "El stack de Sago One y mis herramientas open-source (HKA-SDK, Gravital-Shell/Share/Talk) no son una colección caprichosa. Es la composición que sale después de cinco años exigiéndole ROI medible a cada decisión técnica."
tags: ["Go", "Rust", "Kotlin", "Next.js", "Arquitectura", "FinTech"]
coverImage: "/blog/stack-2026.png"
ogImage: "/blog/stack-2026.png"
---

### Cinco lenguajes, una sola decisión arquitectónica

Cuando alguien pregunta por mi stack, espera una sola respuesta — TypeScript, Go, "lo de moda". La realidad es que cada lenguaje en mi caja de herramientas resuelve un problema concreto que los demás no resuelven bien. No los uso por currículum: los uso porque cada uno me ha pagado en producción.

#### TypeScript / Next.js 15 — el producto

Es el lenguaje donde escribo el 80% de mi código de producto. Sago One y Plenty Market corren sobre Next.js 15 con React Server Components, TypeScript estricto y Prisma para tipado end-to-end desde la base de datos. La razón es comercial: el _time-to-market_ y la mantenibilidad de TypeScript no tienen competencia para un equipo pequeño que debe sostener una plataforma B2B con SLA real.

#### Go — donde no se puede negociar latencia

En Sago One hay un microservicio Go que genera códigos fiscales **CUFE/CAFE offline** aplicando el algoritmo Módulo 10 a ~15µs por operación, con seguimiento de contingencia de 72 horas. Reescribirlo en TypeScript implicaría medir en milisegundos en vez de microsegundos y arriesgar la criticidad fiscal. Ese microservicio terminó extraído como [HKA-SDK](https://github.com/angelnereira/HKA-SDK): un gateway SOAP fiscal multi-tenant que abstrae la complejidad del PAC y que cualquier proyecto fiscal panameño puede integrar sin reimplementar.

#### Rust — tooling de sistemas sin GC

Cuando construyo algo que debe convivir con código nativo de Android o procesar audio en tiempo real, paso a Rust. [**Gravital-Share**](https://github.com/angelnereira/Gravital-Share) resuelve un problema concreto de enrutamiento: garantizar que los dispositivos conectados al hotspot de un Android atraviesen el túnel VPN del anfitrión, manipulando iptables/nftables dinámicamente. [**Gravital-Talk**](https://github.com/angelnereira/Gravital-Talk) es una librería de comunicación / audio con un pipeline DSP propio construido sobre los años que pasé como audio engineer. Las garantías de memoria de Rust no son una preferencia estética — son la diferencia entre un componente que se embebe en otras apps y uno que las hace crashear.

#### Kotlin — Android nativo cuando hace falta

[**Gravital-Shell**](https://github.com/angelnereira/Gravital-Shell) ejecuta entornos Alpine Linux aislados sin root sobre Android, con PTY real, sesiones múltiples y un gestor de paquetes APK. No es una "emulación de terminal con bash bonito" — es una terminal Linux profesional en el bolsillo. Construirlo requirió Kotlin con JNI para coordinar `proot` y primitivas nativas, y eso solo se hace bien en el lenguaje canónico del sistema.

### El hilo conductor: cada lenguaje en su capa

Estos lenguajes no compiten entre sí. Sago One los compone:

- **Edge / Frontend**: Next.js 15 + TypeScript en Vercel Edge para el dashboard, el POS táctil con Web Bluetooth (ESC/POS), y los flujos de cliente.
- **Backend de producto**: Node.js + Prisma con multi-tenancy enforced por Row Level Security en PostgreSQL (Neon Serverless).
- **Microservicios críticos**: Go para los pipelines fiscales, validación SOAP y generación offline de códigos.
- **Sistema operativo / red**: Rust para herramientas nativas Android y procesamiento de audio.
- **Móvil**: Kotlin para integración profunda con el SO Android.

### El ROI invisible: deuda técnica que nunca se paga

Lo que rara vez aparece en una propuesta comercial es la deuda técnica que un stack mal elegido genera. Si el equipo que mantiene Sago One escribiera el microservicio Go en JavaScript, cada llamada al PAC pagaría su impuesto en milisegundos. Multiplicado por miles de facturas diarias y la ventana de 72 horas de contingencia, eso es la diferencia entre cumplir la ley o pagar multas.

Lo mismo en Rust: si Gravital-Share filtrara tráfico por un segundo cuando cae la VPN, deja de ser una solución de seguridad y se vuelve una vulnerabilidad. La elección de Rust no es por hype — es porque el modelo de memoria garantiza que ese segundo no exista.

### Conclusión

El stack no es una preferencia. Es la respuesta a una pregunta muy concreta: **¿en qué capa de la pila tecnológica el lenguaje que elija va a ahorrar más dinero al cliente?** Esa es la única métrica que sostengo cuando defiendo cada decisión.

Si quieres ver la evidencia de cada uno corriendo, los repos están abiertos: [angelnereira en GitHub](https://github.com/angelnereira).
