"use client";

import { useFormStatus } from "react-dom";
import { useEffect, useActionState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { onContactSubmit, FormState } from "./actions";
import { Label } from "@/components/ui/label";


const initialState: FormState = {
  message: "",
  status: "idle",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? "Enviando..." : "Enviar Oportunidad"}
    </Button>
  );
}

export function EmployerForm() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(onContactSubmit, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success' && state.formType === 'employer') {
      toast({
        title: "¡Información Recibida!",
        description: "Gracias por considerarme. Revisaré la oportunidad y te contactaré pronto.",
      });
      formRef.current?.reset();
    } else if (state.status === 'error' && state.formType === 'employer' && state.message && !state.issues) {
       toast({
        variant: "destructive",
        title: "Error al enviar",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-6"
    >
      <input type="hidden" name="formType" value="employer" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="recruiterName">Tu Nombre</Label>
          <Input id="recruiterName" name="recruiterName" placeholder="Nombre del reclutador" />
          {state.issues?.recruiterName && <p className="text-sm font-medium text-destructive">{state.issues.recruiterName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email de Contacto</Label>
          <Input id="email" name="email" type="email" placeholder="tu.email@empresa.com" />
          {state.issues?.email && <p className="text-sm font-medium text-destructive">{state.issues.email}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="companyName">Nombre de la Empresa</Label>
          <Input id="companyName" name="companyName" placeholder="Mi Empresa S.A." />
          {state.issues?.companyName && <p className="text-sm font-medium text-destructive">{state.issues.companyName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Título del Puesto</Label>
          <Input id="jobTitle" name="jobTitle" placeholder="Senior Software Engineer" />
          {state.issues?.jobTitle && <p className="text-sm font-medium text-destructive">{state.issues.jobTitle}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="country">País (Opcional)</Label>
            <Input id="country" name="country" placeholder="País de la empresa" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salaryOffer">Oferta Salarial (Opcional)</Label>
            <Input id="salaryOffer" name="salaryOffer" placeholder="Ej: $50k - $70k USD" />
          </div>
      </div>
      <div className="space-y-2">
          <Label htmlFor="industry">Rubro de la Empresa (Opcional)</Label>
          <Select name="industry">
            <SelectTrigger id="industry">
              <SelectValue placeholder="Selecciona el rubro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Tecnología y Software</SelectItem>
              <SelectItem value="ecommerce">E-commerce y Retail</SelectItem>
              <SelectItem value="finance">Finanzas y Banca</SelectItem>
              <SelectItem value="health">Salud y Bienestar</SelectItem>
              <SelectItem value="education">Educación</SelectItem>
              <SelectItem value="professional-services">Servicios Profesionales</SelectItem>
              <SelectItem value="real-estate">Bienes Raíces</SelectItem>
              <SelectItem value="transport-logistics">Transporte y Logística</SelectItem>
              <SelectItem value="other">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contractType">Tipo de Contrato (Opcional)</Label>
          <Select name="contractType">
            <SelectTrigger id="contractType">
              <SelectValue placeholder="Selecciona el tipo de contrato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Tiempo Completo</SelectItem>
              <SelectItem value="part-time">Tiempo Parcial</SelectItem>
              <SelectItem value="contract">Contrato / Freelance</SelectItem>
              <SelectItem value="internship">Pasantía</SelectItem>
            </SelectContent>
          </Select>
        </div>
      <div className="space-y-2">
        <Label htmlFor="jobDescription">Descripción o Enlace a la Vacante</Label>
        <Textarea
          id="jobDescription"
          name="jobDescription"
          placeholder="Pega aquí la descripción del puesto o un enlace a la publicación de la vacante."
          className="min-h-[150px]"
        />
        {state.issues?.jobDescription && <p className="text-sm font-medium text-destructive">{state.issues.jobDescription}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}
