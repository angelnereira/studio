import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type FormType = 'client' | 'employer' | 'collaborator' | 'invitation';

interface EmailData {
  formType: FormType;
  data: any;
}

function formatClientEmail(data: any): string {
  return `
    <h2>Nuevo Cliente Potencial</h2>
    <p><strong>Nombre:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.company ? `<p><strong>Empresa:</strong> ${data.company}</p>` : ''}
    ${data.country ? `<p><strong>País:</strong> ${data.country}</p>` : ''}
    ${data.industry ? `<p><strong>Industria:</strong> ${data.industry}</p>` : ''}
    <p><strong>Servicio Solicitado:</strong> ${data.service}</p>
    <p><strong>Presupuesto:</strong> ${data.budget}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${data.message}</p>
  `;
}

function formatEmployerEmail(data: any): string {
  return `
    <h2>Nueva Oportunidad Laboral</h2>
    <p><strong>Nombre del Reclutador:</strong> ${data.recruiterName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Empresa:</strong> ${data.companyName}</p>
    <p><strong>Título del Puesto:</strong> ${data.jobTitle}</p>
    ${data.country ? `<p><strong>País:</strong> ${data.country}</p>` : ''}
    ${data.industry ? `<p><strong>Industria:</strong> ${data.industry}</p>` : ''}
    ${data.salaryOffer ? `<p><strong>Oferta Salarial:</strong> ${data.salaryOffer}</p>` : ''}
    ${data.contractType ? `<p><strong>Tipo de Contrato:</strong> ${data.contractType}</p>` : ''}
    <p><strong>Descripción del Puesto:</strong></p>
    <p>${data.jobDescription}</p>
  `;
}

function formatCollaboratorEmail(data: any): string {
  return `
    <h2>Nueva Propuesta de Colaboración</h2>
    <p><strong>Nombre:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.linkedin ? `<p><strong>LinkedIn:</strong> <a href="${data.linkedin}">${data.linkedin}</a></p>` : ''}
    ${data.portfolio ? `<p><strong>Portfolio:</strong> <a href="${data.portfolio}">${data.portfolio}</a></p>` : ''}
    ${data.expertise ? `<p><strong>Especialidad:</strong> ${data.expertise}</p>` : ''}
    <p><strong>Asunto:</strong> ${data.subject}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${data.message}</p>
  `;
}

function formatInvitationEmail(data: any): string {
  return `
    <h2>Nueva Invitación a Evento</h2>
    <p><strong>Nombre del Organizador:</strong> ${data.inviterName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Nombre del Evento:</strong> ${data.eventName}</p>
    <p><strong>Tipo de Evento:</strong> ${data.eventType}</p>
    <p><strong>Rol Propuesto:</strong> ${data.proposedRole}</p>
    <p><strong>Fecha del Evento:</strong> ${new Date(data.eventDate).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}</p>
    ${data.eventTime ? `<p><strong>Hora:</strong> ${data.eventTime}</p>` : ''}
    <p><strong>Ubicación:</strong> ${data.eventLocation}</p>
    <p><strong>Motivo de la Invitación:</strong></p>
    <p>${data.invitationReason}</p>
  `;
}

const emailFormatters = {
  client: formatClientEmail,
  employer: formatEmployerEmail,
  collaborator: formatCollaboratorEmail,
  invitation: formatInvitationEmail,
};

const emailSubjects = {
  client: 'Nuevo Cliente Potencial - Formulario de Contacto',
  employer: 'Nueva Oportunidad Laboral',
  collaborator: 'Nueva Propuesta de Colaboración',
  invitation: 'Nueva Invitación a Evento',
};

export async function sendContactEmail({ formType, data }: EmailData): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY no está configurada');
      return { success: false, error: 'Configuración de email no disponible' };
    }

    const formatter = emailFormatters[formType];
    const subject = emailSubjects[formType];

    if (!formatter) {
      return { success: false, error: 'Tipo de formulario no válido' };
    }

    const htmlContent = formatter(data);

    const result = await resend.emails.send({
      from: 'Contacto Portfolio <onboarding@resend.dev>', // Temporal: cambiar a contact@angelnereira.com cuando el dominio esté verificado
      to: 'angelnereira15@gmail.com', // Tu email personal donde recibirás los contactos
      subject: subject,
      html: htmlContent,
      reply_to: data.email, // Permite responder directamente al remitente
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
