"use server";

import { z } from "zod";
import { Firestore, FieldValue } from 'firebase-admin/firestore';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, App, cert } from 'firebase-admin/app';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

const adminApp = getApps().length > 0
  ? getApps()[0]
  : initializeApp({
      credential: cert(serviceAccount!),
    });

const db = getFirestore(adminApp as App);

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
    const docRef = db.collection('contacts').doc();
    await docRef.set({
      formType,
      ...rest,
      createdAt: FieldValue.serverTimestamp(),
    });

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
