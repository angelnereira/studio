"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useFormStatus } from "react-dom";
import { useEffect, useActionState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { onContactSubmit, FormState } from "./actions";


const collaboratorFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce una dirección de correo válida."),
  linkedin: z.string().url("Por favor, introduce una URL válida.").optional().or(z.literal('')),
  portfolio: z.string().url("Por favor, introduce una URL válida.").optional().or(z.literal('')),
  expertise: z.string().optional(),
  subject: z.string().min(5, "El asunto debe tener al menos 5 caracteres."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

type CollaboratorFormValues = z.infer<typeof collaboratorFormSchema>;

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
  const form = useForm<CollaboratorFormValues>({
    resolver: zodResolver(collaboratorFormSchema),
    defaultValues: {
      name: "",
      email: "",
      linkedin: "",
      portfolio: "",
      expertise: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    if (state.status === 'success' && state.message) {
      toast({
        title: "¡Mensaje Recibido!",
        description: "Gracias por tu interés en colaborar. He guardado tu propuesta.",
      });
      form.reset();
    } else if (state.status === 'error' && state.message) {
       toast({
        variant: "destructive",
        title: "Error al enviar",
        description: state.message + (state.issues ? `: ${state.issues.join(", ")}` : ''),
      });
    }
  }, [state, form, toast]);


  return (
    <Form {...form}>
      <form
        action={(formData) => {
          formData.append('formType', 'collaborator');
          form.handleSubmit(() => formAction(formData))();
        }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tu Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre y Apellido" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="tu.email@ejemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
         <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perfil de LinkedIn (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com/in/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="portfolio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio o GitHub (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
         <FormField
            control={form.control}
            name="expertise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Área de Expertise (Opcional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu área principal" />
                    </SelectTrigger>
                  </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>¿De qué trata la colaboración?</FormLabel>
              <FormControl>
                <Input placeholder="Asunto principal de tu propuesta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Propuesta o Idea</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe la colaboración que tienes en mente, el proyecto, o la idea que quieres discutir."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
}
