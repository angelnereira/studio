"use server";

import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export type FormState = {
  message: string;
  status: 'idle' | 'success' | 'error';
  issues?: string[];
};

const anyFormSchema = z.object({
  formType: z.enum(['client', 'employer', 'collaborator', 'invitation']),
}).passthrough();


export async function onContactSubmit(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  
  const formData = Object.fromEntries(data);
  const parsed = anyFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Invalid form data",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  const { formType, ...rest } = parsed.data;

  try {
    const docData = {
      formType,
      ...rest,
      createdAt: serverTimestamp(),
    };
    
    // Convert Date objects to strings
    if (docData.eventDate instanceof Date) {
      docData.eventDate = docData.eventDate.toISOString();
    }

    await addDoc(collection(db, 'contacts'), docData);

    return {
      status: "success",
      message: "Tu mensaje ha sido recibido. Gracias por contactarme.",
    };
  } catch (error) {
    console.error("Error saving to Firestore:", error);
    return {
      status: "error",
      message: "Ocurrió un error al guardar tu mensaje. Por favor, inténtalo de nuevo.",
    };
  }
}
