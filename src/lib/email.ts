import { Resend } from 'resend';

type FormType = 'client' | 'employer' | 'collaborator' | 'invitation';

interface EmailData {
  formType: FormType;
  data: any;
}

// Base email template with professional styling
function wrapInEmailTemplate(content: string, title: string, accentColor: string = '#7c3aed'): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f0f23; color: #e2e8f0;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0f0f23;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #1a1a2e; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, ${accentColor} 0%, #5b21b6 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                ${title}
              </h1>
              <p style="margin: 8px 0 0; color: rgba(255, 255, 255, 0.8); font-size: 14px;">
                angelnereira.com • ${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 32px 40px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #16162a; padding: 24px 40px; text-align: center; border-top: 1px solid #2d2d4a;">
              <p style="margin: 0; color: #64748b; font-size: 12px;">
                Este mensaje fue enviado desde el formulario de contacto de
                <a href="https://angelnereira.com" style="color: ${accentColor}; text-decoration: none;">angelnereira.com</a>
              </p>
              <p style="margin: 8px 0 0; color: #475569; font-size: 11px;">
                © ${new Date().getFullYear()} Ángel Nereira. Todos los derechos reservados.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Helper to create styled info rows
function infoRow(label: string, value: string, isLink: boolean = false): string {
  const displayValue = isLink
    ? `<a href="${value}" style="color: #a78bfa; text-decoration: none; word-break: break-all;">${value}</a>`
    : `<span style="color: #f1f5f9;">${value}</span>`;

  return `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #2d2d4a;">
        <span style="color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">${label}</span>
        ${displayValue}
      </td>
    </tr>`;
}

// Helper to create message section
function messageSection(title: string, content: string): string {
  return `
    <div style="margin-top: 24px; padding: 20px; background-color: #16162a; border-radius: 12px; border-left: 4px solid #7c3aed;">
      <h3 style="margin: 0 0 12px; color: #e2e8f0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">${title}</h3>
      <p style="margin: 0; color: #cbd5e1; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${content}</p>
    </div>`;
}

// Mapping for service names
const serviceNames: Record<string, string> = {
  'web-development': 'Desarrollo Web',
  'ai-solutions': 'Soluciones con IA',
  'data-engineering': 'Ingeniería de Datos',
  'software-consulting': 'Consultoría de Software',
  'mobile-development': 'Desarrollo Móvil',
  'tienda-online-ecommerce': 'Tienda Online (E-commerce)',
  'other': 'Otro',
};

// Mapping for budget names
const budgetNames: Record<string, string> = {
  '<1k': 'Menos de $1,000',
  '1k-5k': '$1,000 - $5,000',
  '5k-10k': '$5,000 - $10,000',
  '>10k': 'Más de $10,000',
};

// Mapping for industry names
const industryNames: Record<string, string> = {
  'technology': 'Tecnología y Software',
  'ecommerce': 'E-commerce y Retail',
  'finance': 'Finanzas y Banca',
  'health': 'Salud y Bienestar',
  'education': 'Educación',
  'professional-services': 'Servicios Profesionales',
  'real-estate': 'Bienes Raíces',
  'transport-logistics': 'Transporte y Logística',
  'other': 'Otro',
};

function formatClientEmail(data: any): string {
  const serviceName = serviceNames[data.service] || data.service;
  const budgetName = budgetNames[data.budget] || data.budget;
  const industryName = data.industry ? (industryNames[data.industry] || data.industry) : null;

  const content = `
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      ${infoRow('Nombre', data.name)}
      ${infoRow('Email', data.email)}
      ${data.company ? infoRow('Empresa', data.company) : ''}
      ${data.country ? infoRow('País', data.country) : ''}
      ${industryName ? infoRow('Industria', industryName) : ''}
      ${infoRow('Servicio de Interés', serviceName)}
      ${infoRow('Presupuesto Estimado', budgetName)}
    </table>
    ${messageSection('Descripción del Proyecto', data.message)}
    
    <div style="margin-top: 24px; text-align: center;">
      <a href="mailto:${data.email}?subject=Re: Consulta desde angelnereira.com" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
        Responder a ${data.name.split(' ')[0]}
      </a>
    </div>`;

  return wrapInEmailTemplate(content, '👤 Nuevo Cliente Potencial', '#7c3aed');
}

function formatEmployerEmail(data: any): string {
  const industryName = data.industry ? (industryNames[data.industry] || data.industry) : null;

  const content = `
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      ${infoRow('Reclutador', data.recruiterName)}
      ${infoRow('Email', data.email)}
      ${infoRow('Empresa', data.companyName)}
      ${infoRow('Puesto', data.jobTitle)}
      ${data.country ? infoRow('País', data.country) : ''}
      ${industryName ? infoRow('Industria', industryName) : ''}
      ${data.salaryOffer ? infoRow('Oferta Salarial', data.salaryOffer) : ''}
      ${data.contractType ? infoRow('Tipo de Contrato', data.contractType) : ''}
    </table>
    ${messageSection('Descripción del Puesto', data.jobDescription)}
    
    <div style="margin-top: 24px; text-align: center;">
      <a href="mailto:${data.email}?subject=Re: Oportunidad - ${data.jobTitle}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
        Responder a ${data.recruiterName.split(' ')[0]}
      </a>
    </div>`;

  return wrapInEmailTemplate(content, '💼 Nueva Oportunidad Laboral', '#059669');
}

function formatCollaboratorEmail(data: any): string {
  const content = `
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      ${infoRow('Nombre', data.name)}
      ${infoRow('Email', data.email)}
      ${data.linkedin ? infoRow('LinkedIn', data.linkedin, true) : ''}
      ${data.portfolio ? infoRow('Portfolio', data.portfolio, true) : ''}
      ${data.expertise ? infoRow('Especialidad', data.expertise) : ''}
      ${infoRow('Asunto', data.subject)}
    </table>
    ${messageSection('Propuesta', data.message)}
    
    <div style="margin-top: 24px; text-align: center;">
      <a href="mailto:${data.email}?subject=Re: ${data.subject}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
        Responder a ${data.name.split(' ')[0]}
      </a>
    </div>`;

  return wrapInEmailTemplate(content, '🤝 Nueva Propuesta de Colaboración', '#0891b2');
}

function formatInvitationEmail(data: any): string {
  const eventDate = new Date(data.eventDate).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const content = `
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      ${infoRow('Organizador', data.inviterName)}
      ${infoRow('Email', data.email)}
      ${infoRow('Evento', data.eventName)}
      ${infoRow('Tipo de Evento', data.eventType)}
      ${infoRow('Rol Propuesto', data.proposedRole)}
      ${infoRow('Fecha', eventDate)}
      ${data.eventTime ? infoRow('Hora', data.eventTime) : ''}
      ${infoRow('Ubicación', data.eventLocation)}
    </table>
    ${messageSection('Motivo de la Invitación', data.invitationReason)}
    
    <div style="margin-top: 24px; text-align: center;">
      <a href="mailto:${data.email}?subject=Re: Invitación - ${data.eventName}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #d946ef 0%, #a21caf 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
        Responder a ${data.inviterName.split(' ')[0]}
      </a>
    </div>`;

  return wrapInEmailTemplate(content, '📅 Nueva Invitación a Evento', '#d946ef');
}

const emailFormatters = {
  client: formatClientEmail,
  employer: formatEmployerEmail,
  collaborator: formatCollaboratorEmail,
  invitation: formatInvitationEmail,
};

const emailSubjects = {
  client: '[Portfolio] Nuevo Cliente Potencial',
  employer: '[Portfolio] Nueva Oportunidad Laboral',
  collaborator: '[Portfolio] Nueva Propuesta de Colaboración',
  invitation: '[Portfolio] Nueva Invitación a Evento',
};

export async function sendContactEmail({ formType, data }: EmailData): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.RESEND_API_KEY_SEND) {
      console.error('RESEND_API_KEY_SEND no está configurada');
      return { success: false, error: 'Configuración de email no disponible' };
    }

    const resend = new Resend(process.env.RESEND_API_KEY_SEND);

    const formatter = emailFormatters[formType];
    const subject = emailSubjects[formType];

    if (!formatter) {
      return { success: false, error: 'Tipo de formulario no válido' };
    }

    const htmlContent = formatter(data);

    const result = await resend.emails.send({
      from: 'Portfolio Contact <contact@angelnereira.com>',
      to: 'contact@angelnereira.com',
      subject: subject,
      html: htmlContent,
      reply_to: data.email,
      headers: {
        'X-Entity-Ref-ID': `portfolio-${formType}-${Date.now()}`,
      },
    });

    if (result.error) {
      console.error('Error al enviar email:', result.error);
      return { success: false, error: result.error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error al enviar email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
  }
}
