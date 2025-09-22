"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

const employerFormSchema = z.object({
  recruiterName: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce una dirección de correo válida."),
  companyName: z.string().min(2, "El nombre de la empresa es requerido."),
  jobTitle: z.string().min(3, "El título del puesto es requerido."),
  jobDescription: z.string().min(10, "La descripción debe tener al menos 10 caracteres."),
});

type EmployerFormValues = z.infer<typeof employerFormSchema>;

export function EmployerForm() {
  const { toast } = useToast();
  const form = useForm<EmployerFormValues>({
    resolver: zodResolver(employerFormSchema),
    defaultValues: {
      recruiterName: "",
      email: "",
      companyName: "",
      jobTitle: "",
      jobDescription: "",
    },
  });

  function onSubmit(data: EmployerFormValues) {
    console.log(data);
    toast({
      title: "¡Información Recibida!",
      description: "Gracias por considerarme. Revisaré la oportunidad y te contactaré pronto.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="recruiterName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tu Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del reclutador" {...field} />
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
                <FormLabel>Email de Contacto</FormLabel>
                <FormControl>
                  <Input placeholder="tu.email@empresa.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de la Empresa</FormLabel>
                <FormControl>
                  <Input placeholder="Mi Empresa S.A." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título del Puesto</FormLabel>
                <FormControl>
                  <Input placeholder="Senior Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="jobDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción o Enlace a la Vacante</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Pega aquí la descripción del puesto o un enlace a la publicación de la vacante."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Enviando..." : "Enviar Oportunidad"}
        </Button>
      </form>
    </Form>
  );
}
