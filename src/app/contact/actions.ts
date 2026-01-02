"use server";

import { z } from "zod";
// import { prisma } from "@/lib/prisma";
import { sendContactEmail } from "@/lib/email";

// Define schemas for each form
const clientSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce una dirección de correo válida."),
  company: z.string().optional(),
  country: z.string().optional(),
  industry: z.string().optional(),
  service: z.string({ required_error: "Por favor, selecciona un servicio." }),
  budget: z.string({ required_error: "Por favor, selecciona un presupuesto." }),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

const employerSchema = z.object({
  recruiterName: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce una dirección de correo válida."),
  companyName: z.string().min(2, "El nombre de la empresa es requerido."),
  jobTitle: z.string().min(3, "El título del puesto es requerido."),
  jobDescription: z.string().min(10, "La descripción debe tener al menos 10 caracteres."),
  country: z.string().optional(),
  industry: z.string().optional(),
  salaryOffer: z.string().optional(),
  contractType: z.string().optional(),
});

const collaboratorSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce una dirección de correo válida."),
  linkedin: z.string().url("Por favor, introduce una URL válida.").optional().or(z.literal('')),
  portfolio: z.string().url("Por favor, introduce una URL válida.").optional().or(z.literal('')),
  expertise: z.string().optional(),
  subject: z.string().min(5, "El asunto debe tener al menos 5 caracteres."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

const invitationSchema = z.object({
  inviterName: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce una dirección de correo válida."),
  eventName: z.string().min(3, "El nombre del evento es requerido."),
  eventType: z.string({ required_error: "Por favor, selecciona un tipo de evento." }),
  proposedRole: z.string({ required_error: "Por favor, selecciona un rol." }),
  eventDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "La fecha del evento es requerida." }),
  eventTime: z.string().optional(),
  eventLocation: z.string().min(3, "La ubicación es requerida."),
  invitationReason: z.string().min(10, "El motivo debe tener al menos 10 caracteres."),
});


const formSchemas = {
  client: clientSchema,
  employer: employerSchema,
  collaborator: collaboratorSchema,
  invitation: invitationSchema,
};

type ZodIssues = { [key: string]: string };

export type FormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  issues?: ZodIssues;
  formType?: string;
};

export async function onContactSubmit(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  // React 19's useActionState adds numeric prefixes (e.g., "1_name") to form fields
  // We need to strip these prefixes to get the actual field names
  const rawFormData = Object.fromEntries(data);
  const formData: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(rawFormData)) {
    // Remove numeric prefix like "1_" or "0_" from field names
    const cleanKey = key.replace(/^\d+_/, '');
    formData[cleanKey] = value;
  }

  const formType = formData.formType as keyof typeof formSchemas;

  if (!formType || !formSchemas[formType]) {
    return {
      status: 'error',
      message: 'Tipo de formulario no válido.',
    };
  }

  const schema = formSchemas[formType];
  const parsed = schema.safeParse(formData);

  if (!parsed.success) {
    const issues: ZodIssues = {};
    parsed.error.issues.forEach(issue => {
      const path = issue.path[0];
      if (path) {
        issues[path] = issue.message;
      }
    });
    return {
      status: 'error',
      message: 'Por favor, corrige los errores en el formulario.',
      issues,
      formType
    };
  }

  try {
    // Preparar los datos para Prisma
    const contactData: any = {
      ...parsed.data,
      formType,
    };

    // Convertir campos vacíos de URL a null
    if (contactData.linkedin === '') contactData.linkedin = null;
    if (contactData.portfolio === '') contactData.portfolio = null;

    // Convertir eventDate string a Date si existe
    if (contactData.eventDate) {
      contactData.eventDate = new Date(contactData.eventDate);
    }

    // Guardar en la base de datos con Prisma
    /*
      // Guardar en la base de datos con Prisma (Opcional - No bloqueante)
      try {
        // await prisma.contact.create({
        //   data: contactData,
        // });
      } catch (dbError) {
        console.warn("Advertencia: No se pudo guardar en la base de datos, pero se intentará enviar el email.", dbError);
        // Continuar con el envío de email
      }
    */

    // Enviar email con los datos del formulario
    const emailResult = await sendContactEmail({
      formType,
      data: parsed.data,
    });

    if (!emailResult.success) {
      console.error('Error final al enviar email:', emailResult.error);
      return {
        status: 'error',
        message: 'No se pudo enviar el email. Por favor, intenta contactarme directamente a contact@angelnereira.com.',
        formType
      };
    }


    return {
      status: 'success',
      message: 'Tu mensaje ha sido recibido. Gracias por contactarme.',
      formType
    };
  } catch (error) {
    console.error("Error saving to database:", error);
    return {
      status: 'error',
      message: 'Ocurrió un error al guardar tu mensaje. Por favor, inténtalo de nuevo.',
      formType
    };
  }
}