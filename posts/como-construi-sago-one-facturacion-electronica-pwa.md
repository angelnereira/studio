---
title: "Cómo Construí Sago One: Facturación Electrónica PWA Offline-First"
date: "2024-07-29"
author: "Ángel Nereira"
excerpt: "El desafío técnico de crear una aplicación web progresiva (PWA) certificada por la DGI de Panamá, capaz de operar sin internet y firmar documentos fiscalmente válidos con criptografía avanzada."
tags: ["PWA", "Next.js", "Criptografía", "Facturación Electrónica", "Startups"]
coverImage: "/projects/sago-one/dashboard.png"
ogImage: "/projects/sago-one/dashboard.png"
---

### El Desafío: Fiscalización en Movimiento

Panamá dio un salto inmenso con la Ley 256 de Facturación Electrónica. Sin embargo, para muchas MIPYMEs, el salto se sintió como un abismo. Las soluciones existentes eran costosas, requerían servidores locales o dependían de una conexión a internet 100% estable.

Me propuse crear **Sago One** con una visión clara: una aplicación web progresiva (PWA) que funcionara tan fluido como una app nativa, permitiendo facturar desde una tablet en medio de una montaña sin señal, y sincronizar cuando volviera la conexión.

### Arquitectura Offline-First con IndexedDB y Vercel

Construir una PWA "de verdad" va más allá de un `manifest.json`. La arquitectura de Sago One se basa en el principio **"Local First, Cloud Second"**:

1.  **Frontend (Next.js 15)**: Usé App Router para optimizar el Code Splitting.
2.  **Base de Datos Local (Dexie.js / IndexedDB)**: Toda la lógica de negocio (crear factura, calcular ITBMS, validar stock) ocurre en el navegador del cliente.
3.  **Sincronización (BullMQ + Redis)**: Cuando hay conexión, un Service Worker intercepta las peticiones y las encola. El backend procesa estas colas para garantizar que ninguna factura se pierda, incluso si el usuario cierra la app.

```typescript
// Lógica simplificada de sincronización
if (navigator.onLine) {
  await syncQueue.process();
} else {
  // Guardar en cola local persistente
  await localDb.pendingInvoices.add(invoiceData);
  toast.info("Factura guardada localmente. Se enviará al detectar red.");
}
```

### Seguridad: Criptografía en el Navegador

El mayor reto no fue la UI, sino la seguridad. Para facturar electrónicamente, se necesita un **Certificado Digital**. Guardar este certificado en la nube representa un riesgo masivo.

La solución fue implementar un sistema híbrido de **Cifrado AES-256**:

1.  Las credenciales del PAC y el certificado se cifran en el cliente antes de enviarse.
2.  La llave de descifrado nunca se guarda en texto plano en la base de datos (Neon Postgres).
3.  Se utilizan variables de entorno rotativas en Vercel para firmar los payloads de la API.

### Integración SOAP con DGI y PACs

La DGI de Panamá utiliza protocolos SOAP antiguos con XML firmados (XMLDSig). Integrar esto en un entorno moderno de Node.js/Edge Runtime fue... interesante.

Tuve que desarrollar un **parser personalizado de XML** para transformar los objetos JSON de la aplicación en las estructuras XML estrictas que exige la ley tributaria, asegurando la canonicalización correcta para la firma digital.

```xml
<!-- Fragmento de XML firmado generado por Sago One -->
<rFE:FacturaElectronica>
  <rFE:Encabezado>
    <rFE:IdDoc>
      <rFE:TipoEmision>01</rFE:TipoEmision>
       <!-- ... -->
    </rFE:IdDoc>
  </rFE:Encabezado>
  <ds:Signature>
    <!-- Firma Digital Canonicalizada -->
  </ds:Signature>
</rFE:FacturaElectronica>
```

### Resultados

Hoy, Sago One no es solo un proyecto de portafolio; es una herramienta viva. Reduce el tiempo de emisión de facturas de minutos a milisegundos y democratiza el acceso a tecnología fiscal de punta para pequeños empresarios.

Este proyecto me enseñó que la complejidad técnica (criptografía, sincronización offline, cumplimiento legal) puede esconderse detrás de una interfaz simple y hermosa, si se diseña con empatía por el usuario final.
