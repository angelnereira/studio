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
import { services } from "@/lib/services";
import { onContactSubmit, FormState } from "./actions";

const clientFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce una dirección de correo válida."),
  company: z.string().optional(),
  country: z.string().optional(),
  industry: z.string().optional(),
  service: z.string({ required_error: "Por favor, selecciona un servicio."}),
  budget: z.string({ required_error: "Por favor, selecciona un presupuesto."}),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

type ClientFormValues = z.infer<typeof clientFormSchema>;

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
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      country: "",
      industry: "",
      message: "",
    },
  });

  useEffect(() => {
    if (state.status === 'success' && state.message) {
      toast({
        title: "¡Mensaje Enviado!",
        description: state.message,
        "data-testid": "success-toast",
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

  const onSubmit = (data: ClientFormValues) => {
    const formData = new FormData();
    formData.append('formType', 'client');
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre" {...field} />
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
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de tu empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="País de residencia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
           <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Servicio de Interés</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {services.filter(s => s.published).map(service => (
                       <SelectItem key={service.slug} value={service.slug}>{service.title}</SelectItem>
                    ))}
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Presupuesto Estimado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un rango" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="<1k">Menos de $1,000</SelectItem>
                    <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                    <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                    <SelectItem value=">10k">Más de $10,000</SelectItem>
                  </SelectContent>
                </Select>
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuéntame sobre tu proyecto</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe tus necesidades, objetivos y cualquier detalle relevante."
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
