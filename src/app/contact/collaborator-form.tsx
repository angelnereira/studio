"use client";

import { useFormStatus } from "react-dom";
import { useEffect, useActionState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
      {pending ? "Enviando..." : "Enviar Mensaje"}
    </Button>
  );
}

export function CollaboratorForm() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(onContactSubmit, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success' && state.formType === 'collaborator') {
      toast({
        title: "¡Mensaje Recibido!",
        description: "Gracias por tu interés en colaborar. He guardado tu propuesta.",
      });
      formRef.current?.reset();
    } else if (state.status === 'error' && state.formType === 'collaborator' && state.message && !state.issues) {
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
      <input type="hidden" name="formType" value="collaborator" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Tu Nombre</Label>
          <Input id="name" name="name" placeholder="Nombre y Apellido" />
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
            <Label htmlFor="linkedin">Perfil de LinkedIn (Opcional)</Label>
            <Input id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/..." />
            {state.issues?.linkedin && <p className="text-sm font-medium text-destructive">{state.issues.linkedin}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio o GitHub (Opcional)</Label>
            <Input id="portfolio" name="portfolio" placeholder="https://github.com/..." />
            {state.issues?.portfolio && <p className="text-sm font-medium text-destructive">{state.issues.portfolio}</p>}
          </div>
      </div>
      <div className="space-y-2">
          <Label htmlFor="expertise">Área de Expertise (Opcional)</Label>
          <Select name="expertise">
            <SelectTrigger id="expertise">
              <SelectValue placeholder="Selecciona tu área principal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frontend">Frontend Development</SelectItem>
              <SelectItem value="backend">Backend Development</SelectItem>
              <SelectItem value="fullstack">Full-Stack Development</SelectItem>
              <SelectItem value="devops">DevOps / SRE</SelectItem>
              <SelectItem value="mobile">Mobile Development (iOS/Android)</SelectItem>
              <SelectItem value="ux-ui">UX/UI Design</SelectItem>
              <SelectItem value="data-science-ai">Data Science / AI / ML</SelectItem>
              <SelectItem value="project-management">Project Management</SelectItem>
              <SelectItem value="other">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      <div className="space-y-2">
        <Label htmlFor="subject">¿De qué trata la colaboración?</Label>
        <Input id="subject" name="subject" placeholder="Asunto principal de tu propuesta" />
        {state.issues?.subject && <p className="text-sm font-medium text-destructive">{state.issues.subject}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Propuesta o Idea</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Describe la colaboración que tienes en mente, el proyecto, o la idea que quieres discutir."
          className="min-h-[150px]"
        />
        {state.issues?.message && <p className="text-sm font-medium text-destructive">{state.issues.message}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}
