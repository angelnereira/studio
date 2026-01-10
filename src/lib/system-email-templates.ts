// System Email Templates - Pre-defined templates for the Email Marketing Studio
// These templates are available by default without needing to create them in the database

export interface SystemTemplate {
    id: string;
    name: string;
    category: string;
    subject: string;
    content: string;
    description: string;
}

export const systemTemplates: SystemTemplate[] = [
    {
        id: "sys-welcome",
        name: "🎉 Bienvenida",
        category: "transactional",
        subject: "Bienvenido/a, {{name}} - Gracias por conectar",
        description: "Email de bienvenida para nuevos contactos",
        content: `
<div style="font-family: 'Inter', sans-serif; background-color: #080c0a; color: #fff; padding: 32px;">
    <div style="max-width: 500px; margin: 0 auto; background: rgba(13,20,16,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px;">
            <div style="width: 48px; height: 48px; background-color: #DFFF00; border-radius: 8px; margin: 0 auto; display: inline-flex; align-items: center; justify-content: center; color: #000; font-weight: bold; font-size: 20px;">AN</div>
        </div>
        <h1 style="color: #fff; font-size: 24px; text-align: center; margin-bottom: 16px;">Bienvenido/a, {{name}}</h1>
        <p style="color: #9ca3af; font-size: 14px; line-height: 24px;">Gracias por conectar. Soy Ángel Nereira, Ingeniero de Software Full Stack.</p>
        <p style="color: #9ca3af; font-size: 14px; line-height: 24px;">He recibido tu solicitud y estoy revisando los detalles de tu proyecto. Este es el inicio de la construcción de algo escalable.</p>
        <div style="text-align: center; margin: 32px 0;">
            <a href="https://angelnereira.com" style="background-color: #DFFF00; color: #000; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Ver Portafolio</a>
        </div>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;">
        <p style="color: #6b7280; font-size: 12px; text-align: center;">Especialista en FinTech, SaaS y PWA Offline-First · Panamá</p>
    </div>
</div>
        `.trim(),
    },
    {
        id: "sys-service-inquiry",
        name: "📋 Confirmación de Consulta",
        category: "transactional",
        subject: "Hemos recibido tu consulta sobre {{serviceName}}",
        description: "Confirma cuando un cliente pregunta por un servicio",
        content: `
<div style="font-family: 'Inter', sans-serif; background-color: #080c0a; color: #fff; padding: 32px;">
    <div style="max-width: 500px; margin: 0 auto; background: rgba(13,20,16,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px;">
            <div style="width: 48px; height: 48px; background-color: #DFFF00; border-radius: 8px; margin: 0 auto; display: inline-flex; align-items: center; justify-content: center; color: #000; font-weight: bold; font-size: 20px;">AN</div>
        </div>
        <h1 style="color: #fff; font-size: 24px; text-align: center; margin-bottom: 16px;">¡Gracias por tu interés, {{name}}!</h1>
        <p style="color: #9ca3af; font-size: 14px; line-height: 24px;">He recibido tu consulta sobre el servicio de <strong style="color: #DFFF00;">{{serviceName}}</strong>.</p>
        <div style="background: rgba(19,109,86,0.15); border: 1px solid #136D56; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="color: #fff; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">📋 Detalles de tu consulta</p>
            <p style="color: #9ca3af; font-size: 14px; margin: 0;"><strong>Servicio:</strong> {{serviceName}}<br><strong>Paquete:</strong> {{packageName}}</p>
        </div>
        <p style="color: #9ca3af; font-size: 14px; line-height: 24px;">Me pondré en contacto contigo en las próximas <strong style="color: #fff;">24-48 horas</strong> para discutir los detalles de tu proyecto.</p>
        <div style="text-align: center; margin: 32px 0;">
            <a href="https://angelnereira.com/services" style="background-color: #DFFF00; color: #000; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Ver Servicios</a>
        </div>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;">
        <p style="color: #6b7280; font-size: 12px; text-align: center;">Ángel Nereira · Ingeniero de Software Full Stack</p>
    </div>
</div>
        `.trim(),
    },
    {
        id: "sys-promotion",
        name: "🚀 Promoción con Descuento",
        category: "promotion",
        subject: "🚀 Oferta Especial: {{discountPercentage}}% de descuento en {{serviceName}}",
        description: "Campañas de promoción con códigos de descuento",
        content: `
<div style="font-family: 'Inter', sans-serif; background-color: #080c0a; color: #fff; padding: 32px;">
    <div style="max-width: 500px; margin: 0 auto; background: rgba(13,20,16,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px;">
            <div style="width: 48px; height: 48px; background-color: #DFFF00; border-radius: 8px; margin: 0 auto; display: inline-flex; align-items: center; justify-content: center; color: #000; font-weight: bold; font-size: 20px;">AN</div>
        </div>
        <div style="text-align: center; margin: 16px 0;">
            <span style="background-color: #FF6B35; color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">Oferta Limitada</span>
        </div>
        <h1 style="color: #fff; font-size: 26px; text-align: center; margin: 16px 0;">🚀 Oferta Especial de Lanzamiento</h1>
        <p style="color: #9ca3af; font-size: 14px; line-height: 24px; text-align: center;">Hola {{name}}, tengo una oferta especial para ti.</p>
        <div style="background: linear-gradient(135deg, rgba(19,109,86,0.2), rgba(223,255,0,0.1)); border: 2px solid #DFFF00; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
            <p style="color: #9ca3af; font-size: 14px; margin: 0 0 8px 0;">{{serviceName}}</p>
            <p style="color: #6b7280; font-size: 24px; text-decoration: line-through; margin: 0;">${{ originalPrice }}</p>
            <p style="color: #DFFF00; font-size: 36px; font-weight: bold; margin: 0;">${{ discountedPrice }}</p>
            <p style="color: #FF6B35; font-size: 16px; font-weight: bold; margin: 8px 0 0 0;">¡Ahorras {{discountPercentage}}%!</p>
        </div>
        <div style="background: rgba(255,255,255,0.05); border: 1px dashed #6b7280; border-radius: 8px; padding: 16px; margin: 24px 0; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0 0 8px 0;">Usa este código al contactar:</p>
            <p style="color: #DFFF00; font-size: 20px; font-weight: bold; font-family: monospace; letter-spacing: 2px; margin: 0;">{{promoCode}}</p>
        </div>
        <div style="text-align: center; margin: 32px 0;">
            <a href="https://angelnereira.com/services" style="background-color: #DFFF00; color: #000; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Aprovechar Oferta Ahora</a>
        </div>
        <div style="background: rgba(255,107,53,0.1); border: 1px solid #FF6B35; border-radius: 8px; padding: 12px 16px; text-align: center;">
            <p style="color: #9ca3af; font-size: 13px; margin: 0;">⏰ Oferta válida hasta <strong style="color: #FF6B35;">{{expirationDate}}</strong></p>
        </div>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;">
        <p style="color: #6b7280; font-size: 12px; text-align: center;">Ángel Nereira · <a href="https://angelnereira.com" style="color: #DFFF00;">angelnereira.com</a></p>
    </div>
</div>
        `.trim(),
    },
    {
        id: "sys-quote-followup",
        name: "💬 Seguimiento de Cotización",
        category: "sales",
        subject: "Seguimiento de tu cotización - ¿Cómo puedo ayudarte?",
        description: "Para leads que solicitaron cotización pero no han respondido",
        content: `
<div style="font-family: 'Inter', sans-serif; background-color: #080c0a; color: #fff; padding: 32px;">
    <div style="max-width: 500px; margin: 0 auto; background: rgba(13,20,16,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px;">
            <div style="width: 48px; height: 48px; background-color: #DFFF00; border-radius: 8px; margin: 0 auto; display: inline-flex; align-items: center; justify-content: center; color: #000; font-weight: bold; font-size: 20px;">AN</div>
        </div>
        <h1 style="color: #fff; font-size: 24px; text-align: center; margin-bottom: 16px;">Hola {{name}} 👋</h1>
        <p style="color: #9ca3af; font-size: 14px; line-height: 24px;">Hace {{daysSinceQuote}} días me contactaste interesado/a en nuestro servicio de <strong style="color: #DFFF00;">{{serviceName}}</strong>. Quería darle seguimiento y ver cómo puedo ayudarte.</p>
        <div style="background: rgba(19,109,86,0.1); border: 1px solid #136D56; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="color: #6b7280; font-size: 12px; margin: 0 0 12px 0;">Ref: {{quoteId}}</p>
            <p style="color: #fff; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">📋 Resumen de tu cotización</p>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="color: #9ca3af; font-size: 14px; padding: 4px 0;">Servicio:</td><td style="color: #fff; font-size: 14px; text-align: right;">{{serviceName}}</td></tr>
                <tr><td style="color: #9ca3af; font-size: 14px; padding: 4px 0;">Paquete:</td><td style="color: #fff; font-size: 14px; text-align: right;">{{packageName}}</td></tr>
                <tr><td style="color: #9ca3af; font-size: 14px; padding: 8px 0; border-top: 1px solid rgba(255,255,255,0.1);">Inversión:</td><td style="color: #DFFF00; font-size: 18px; font-weight: bold; text-align: right; border-top: 1px solid rgba(255,255,255,0.1);">{{estimatedPrice}}</td></tr>
            </table>
        </div>
        <p style="color: #9ca3af; font-size: 14px; line-height: 24px;">¿Tienes alguna duda? Estoy aquí para ayudarte.</p>
        <div style="text-align: center; margin: 32px 0;">
            <a href="https://angelnereira.com/contact" style="background-color: #DFFF00; color: #000; padding: 14px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Agendar Llamada</a>
        </div>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;">
        <p style="color: #6b7280; font-size: 12px; text-align: center;">Ángel Nereira · Ingeniero de Software Full Stack</p>
    </div>
</div>
        `.trim(),
    },
    {
        id: "sys-project-complete",
        name: "✅ Proyecto Completado",
        category: "transactional",
        subject: "🎉 ¡Tu proyecto {{projectName}} ha sido completado!",
        description: "Notificación cuando se entrega un proyecto",
        content: `
<div style="font-family: 'Inter', sans-serif; background-color: #080c0a; color: #fff; padding: 32px;">
    <div style="max-width: 520px; margin: 0 auto; background: rgba(13,20,16,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px;">
            <div style="width: 48px; height: 48px; background-color: #DFFF00; border-radius: 8px; margin: 0 auto; display: inline-flex; align-items: center; justify-content: center; color: #000; font-weight: bold; font-size: 20px;">AN</div>
        </div>
        <div style="text-align: center; margin: 16px 0;">
            <span style="background-color: #22C55E; color: #fff; padding: 8px 20px; border-radius: 20px; font-size: 14px; font-weight: bold;">✓ Proyecto Completado</span>
        </div>
        <h1 style="color: #fff; font-size: 26px; text-align: center; margin: 24px 0;">¡Felicidades, {{name}}! 🎉</h1>
        <p style="color: #9ca3af; font-size: 14px; line-height: 24px; text-align: center;">Tu proyecto <strong style="color: #DFFF00;">{{projectName}}</strong> está listo.</p>
        <div style="background: linear-gradient(135deg, rgba(19,109,86,0.2), rgba(223,255,0,0.1)); border: 2px solid #DFFF00; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0 0 8px 0;">Tu proyecto está en vivo en:</p>
            <a href="{{projectUrl}}" style="color: #DFFF00; font-size: 18px; font-weight: bold; text-decoration: none;">{{projectUrl}}</a>
            <p style="color: #6b7280; font-size: 11px; margin: 12px 0 0 0;">Fecha de entrega: {{completionDate}}</p>
        </div>
        <p style="color: #DFFF00; font-size: 12px; font-weight: bold; text-transform: uppercase; margin: 24px 0 12px 0;">📦 Entregables</p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 16px;">
            <p style="color: #9ca3af; font-size: 14px; margin: 8px 0;">✅ Sitio web responsivo</p>
            <p style="color: #9ca3af; font-size: 14px; margin: 8px 0;">✅ Panel de administración</p>
            <p style="color: #9ca3af; font-size: 14px; margin: 8px 0;">✅ Optimización SEO</p>
            <p style="color: #9ca3af; font-size: 14px; margin: 8px 0;">✅ SSL configurado</p>
        </div>
        <div style="text-align: center; margin: 32px 0;">
            <a href="{{projectUrl}}" style="background-color: #DFFF00; color: #000; padding: 14px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Ver Mi Proyecto</a>
        </div>
        <p style="color: #9ca3af; font-size: 14px; line-height: 24px;">¡Éxito con tu nuevo proyecto!<br><strong style="color: #fff;">— Ángel Nereira</strong></p>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;">
        <p style="color: #6b7280; font-size: 12px; text-align: center;">Ángel Nereira · <a href="https://angelnereira.com" style="color: #DFFF00;">angelnereira.com</a></p>
    </div>
</div>
        `.trim(),
    },
    {
        id: "sys-services-showcase",
        name: "💼 Catálogo de Servicios",
        category: "marketing",
        subject: "Conoce todos nuestros servicios de desarrollo de software",
        description: "Presenta todos los servicios disponibles a nuevos contactos",
        content: `
<div style="font-family: 'Inter', sans-serif; background-color: #080c0a; color: #fff; padding: 32px;">
    <div style="max-width: 560px; margin: 0 auto; background: rgba(13,20,16,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px;">
            <div style="width: 48px; height: 48px; background-color: #DFFF00; border-radius: 8px; margin: 0 auto; display: inline-flex; align-items: center; justify-content: center; color: #000; font-weight: bold; font-size: 20px;">AN</div>
        </div>
        <h1 style="color: #fff; font-size: 24px; text-align: center; margin-bottom: 16px;">Soluciones de Software Enterprise</h1>
        <p style="color: #9ca3af; font-size: 14px; line-height: 24px; text-align: center;">Hola {{name}}, aquí tienes un resumen de todos los servicios que ofrezco.</p>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;">
        
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
            <table style="width: 100%;"><tr>
                <td style="width: 40px; vertical-align: top; font-size: 24px;">🚀</td>
                <td><p style="color: #fff; font-size: 16px; font-weight: 600; margin: 0;">Desarrollo Web</p><p style="color: #9ca3af; font-size: 13px; margin: 4px 0;">Landing pages y apps empresariales</p><p style="color: #DFFF00; font-size: 14px; font-weight: bold; margin: 0;">Desde $720</p></td>
            </tr></table>
        </div>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
            <table style="width: 100%;"><tr>
                <td style="width: 40px; vertical-align: top; font-size: 24px;">🛒</td>
                <td><p style="color: #fff; font-size: 16px; font-weight: 600; margin: 0;">E-commerce</p><p style="color: #9ca3af; font-size: 13px; margin: 4px 0;">Tiendas online con pagos integrados</p><p style="color: #DFFF00; font-size: 14px; font-weight: bold; margin: 0;">Desde $720</p></td>
            </tr></table>
        </div>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
            <table style="width: 100%;"><tr>
                <td style="width: 40px; vertical-align: top; font-size: 24px;">💼</td>
                <td><p style="color: #fff; font-size: 16px; font-weight: 600; margin: 0;">Gestión de Negocios</p><p style="color: #9ca3af; font-size: 13px; margin: 4px 0;">Inventario, planilla y facturación</p><p style="color: #DFFF00; font-size: 14px; font-weight: bold; margin: 0;">Desde $1,500</p></td>
            </tr></table>
        </div>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
            <table style="width: 100%;"><tr>
                <td style="width: 40px; vertical-align: top; font-size: 24px;">📱</td>
                <td><p style="color: #fff; font-size: 16px; font-weight: 600; margin: 0;">Apps Móviles</p><p style="color: #9ca3af; font-size: 13px; margin: 4px 0;">iOS y Android multiplataforma</p><p style="color: #DFFF00; font-size: 14px; font-weight: bold; margin: 0;">Desde $3,200</p></td>
            </tr></table>
        </div>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
            <table style="width: 100%;"><tr>
                <td style="width: 40px; vertical-align: top; font-size: 24px;">🤖</td>
                <td><p style="color: #fff; font-size: 16px; font-weight: 600; margin: 0;">Soluciones con IA</p><p style="color: #9ca3af; font-size: 13px; margin: 4px 0;">Chatbots y análisis predictivo</p><p style="color: #DFFF00; font-size: 14px; font-weight: bold; margin: 0;">Desde $960</p></td>
            </tr></table>
        </div>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
            <table style="width: 100%;"><tr>
                <td style="width: 40px; vertical-align: top; font-size: 24px;">📄</td>
                <td><p style="color: #fff; font-size: 16px; font-weight: 600; margin: 0;">Sistemas Fiscales DGI</p><p style="color: #9ca3af; font-size: 13px; margin: 4px 0;">Facturación electrónica Panamá</p><p style="color: #DFFF00; font-size: 14px; font-weight: bold; margin: 0;">Desde $2,400</p></td>
            </tr></table>
        </div>
        
        <div style="text-align: center; margin: 32px 0;">
            <a href="https://angelnereira.com/services" style="background-color: #DFFF00; color: #000; padding: 14px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Ver Todos los Servicios</a>
        </div>
        <div style="background: rgba(19,109,86,0.15); border: 1px solid #136D56; border-radius: 8px; padding: 16px; text-align: center;">
            <p style="color: #fff; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">💡 ¿Proyecto personalizado?</p>
            <p style="color: #9ca3af; font-size: 13px; margin: 0;">Usa la <a href="https://angelnereira.com/calculadora" style="color: #DFFF00;">calculadora de presupuestos</a> para una estimación.</p>
        </div>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;">
        <p style="color: #6b7280; font-size: 12px; text-align: center;">Ángel Nereira · Ingeniero de Software Full Stack · Panamá</p>
    </div>
</div>
        `.trim(),
    },
    {
        id: "sys-newsletter",
        name: "📰 Newsletter Mensual",
        category: "newsletter",
        subject: "🚀 Novedades en Desarrollo de Software - {{edition}}",
        description: "Boletín mensual con artículos y servicio destacado",
        content: `
<div style="font-family: 'Inter', sans-serif; background-color: #080c0a; color: #fff; padding: 32px;">
    <div style="max-width: 560px; margin: 0 auto; background: rgba(13,20,16,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 32px;">
        <div style="text-align: center; margin-bottom: 16px;">
            <div style="width: 48px; height: 48px; background-color: #DFFF00; border-radius: 8px; margin: 0 auto; display: inline-flex; align-items: center; justify-content: center; color: #000; font-weight: bold; font-size: 20px;">AN</div>
            <p style="color: #6b7280; font-size: 12px; margin: 16px 0 0 0;">Edición: {{edition}}</p>
        </div>
        <h1 style="color: #fff; font-size: 26px; text-align: center; margin: 24px 0;">🚀 Novedades en Desarrollo de Software</h1>
        <p style="color: #9ca3af; font-size: 14px; line-height: 24px;">Hola {{name}},</p>
        <p style="color: #9ca3af; font-size: 14px; line-height: 24px;">Este mes exploramos las últimas tendencias en desarrollo web, mejores prácticas en FinTech, y te comparto un proyecto reciente.</p>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;">
        
        <p style="color: #DFFF00; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px 0;">📰 Artículos Destacados</p>
        
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
            <p style="color: #136D56; font-size: 10px; font-weight: bold; text-transform: uppercase; margin: 0 0 8px 0;">Arquitectura</p>
            <p style="color: #fff; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">Cómo elegir la arquitectura correcta para tu SaaS</p>
            <p style="color: #9ca3af; font-size: 13px; line-height: 20px; margin: 0 0 8px 0;">Microservicios vs Monolito: cuándo usar cada uno y por qué la mayoría de startups deberían empezar con un monolito.</p>
            <a href="https://angelnereira.com/blog" style="color: #DFFF00; font-size: 13px; font-weight: 500;">Leer más →</a>
        </div>
        
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;">
        
        <p style="color: #DFFF00; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px 0;">💼 Servicio Destacado</p>
        <div style="background: linear-gradient(135deg, rgba(19,109,86,0.2), rgba(223,255,0,0.1)); border: 1px solid #136D56; border-radius: 8px; padding: 20px;">
            <p style="color: #fff; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">Desarrollo Web - Lanzamiento Digital</p>
            <p style="color: #9ca3af; font-size: 14px; line-height: 22px; margin: 0 0 12px 0;">Lanza tu presencia digital con una landing page profesional optimizada para conversiones.</p>
            <p style="color: #DFFF00; font-size: 16px; font-weight: bold; margin: 0 0 16px 0;">Desde $720</p>
            <a href="https://angelnereira.com/services/web-development" style="background-color: #DFFF00; color: #000; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 13px;">Ver Servicio</a>
        </div>
        
        <p style="color: #9ca3af; font-size: 14px; line-height: 24px; margin-top: 24px;">¡Hasta la próxima edición!<br><strong style="color: #fff;">— Ángel</strong></p>
        
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;">
        <div style="text-align: center;">
            <a href="https://angelnereira.com" style="color: #DFFF00; font-size: 12px; margin-right: 16px;">Web</a>
            <a href="https://github.com/angelnereira" style="color: #9ca3af; font-size: 12px; margin-right: 16px;">GitHub</a>
            <a href="https://linkedin.com/in/angelnereira" style="color: #9ca3af; font-size: 12px;">LinkedIn</a>
        </div>
        <p style="color: #6b7280; font-size: 10px; text-align: center; margin-top: 16px;">Recibiste este correo porque te suscribiste al newsletter.<br><a href="#" style="color: #6b7280;">Desuscribirse</a></p>
    </div>
</div>
        `.trim(),
    },
];
