"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useFormStatus } from "react-dom";
import { useEffect, useActionState, startTransition } from "react";

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

const employerFormSchema = z.object({
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

type EmployerFormValues = z.infer<typeof employerFormSchema>;

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
  const form = useForm<EmployerFormValues>({
    resolver: zodResolver(employerFormSchema),
    defaultValues: {
      recruiterName: "",
      email: "",
      companyName: "",
      jobTitle: "",
      jobDescription: "",
      country: "",
      industry: "",
      salaryOffer: "",
      contractType: "",
    },
  });

  useEffect(() => {
    if (state.status === 'success' && state.message) {
      toast({
        title: "¡Información Recibida!",
        description: "Gracias por considerarme. Revisaré la oportunidad y te contactaré pronto.",
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

  const onSubmit = (data: EmployerFormValues) => {
    const formData = new FormData();
    formData.append('formType', 'employer');
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value as string);
      }
    });

    startTransition(() => {
      formAction(formData);
    });
  };


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="País de la empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="salaryOffer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Oferta Salarial (Opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: $50k - $70k USD" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
         <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rubro de la Empresa (Opcional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el rubro" />
                    </SelectTrigger>
                  </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="contractType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Contrato (Opcional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de contrato" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="full-time">Tiempo Completo</SelectItem>
                    <SelectItem value="part-time">Tiempo Parcial</SelectItem>
                    <SelectItem value="contract">Contrato / Freelance</SelectItem>
                    <SelectItem value="internship">Pasantía</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
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
        <SubmitButton />
      </form>
    </Form>
  );
}
