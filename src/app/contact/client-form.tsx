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
import { services } from "@/lib/services";
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
      {pending ? "Enviando..." : "Enviar Propuesta"}
    </Button>
  );
}

export function ClientForm() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(onContactSubmit, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success' && state.formType === 'client') {
      toast({
        title: "¡Mensaje Enviado!",
        description: state.message,
        "data-testid": "success-toast",
      });
      formRef.current?.reset();
    } else if (state.status === 'error' && state.formType === 'client' && state.message && !state.issues) {
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
      <input type="hidden" name="formType" value="client" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre Completo</Label>
          <Input id="name" name="name" placeholder="Tu nombre" />
          {state.issues?.name && <p className="text-sm font-medium text-destructive">{state.issues.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="tu.email@ejemplo.com" />
          {state.issues?.email && <p className="text-sm font-medium text-destructive">{state.issues.email}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company">Empresa (Opcional)</Label>
          <Input id="company" name="company" placeholder="Nombre de tu empresa" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">País (Opcional)</Label>
          <Input id="country" name="country" placeholder="País de residencia" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="service">Servicio de Interés</Label>
          <Select name="service">
            <SelectTrigger id="service">
              <SelectValue placeholder="Selecciona un servicio" />
            </SelectTrigger>
            <SelectContent>
              {services.filter(s => s.published).map(service => (
                  <SelectItem key={service.slug} value={service.slug}>{service.title}</SelectItem>
              ))}
              <SelectItem value="other">Otro</SelectItem>
            </SelectContent>
          </Select>
          {state.issues?.service && <p className="text-sm font-medium text-destructive">{state.issues.service}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">Presupuesto Estimado</Label>
          <Select name="budget">
            <SelectTrigger id="budget">
              <SelectValue placeholder="Selecciona un rango" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="<1k">Menos de $1,000</SelectItem>
              <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
              <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
              <SelectItem value=">10k">Más de $10,000</SelectItem>
            </SelectContent>
          </Select>
          {state.issues?.budget && <p className="text-sm font-medium text-destructive">{state.issues.budget}</p>}
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
        <Label htmlFor="message">Cuéntame sobre tu proyecto</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Describe tus necesidades, objetivos y cualquier detalle relevante."
          className="min-h-[150px]"
        />
        {state.issues?.message && <p className="text-sm font-medium text-destructive">{state.issues.message}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}
