"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { onContactSubmit, FormState } from "./actions";

const invitationFormSchema = z.object({
  inviterName: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce una dirección de correo válida."),
  eventName: z.string().min(3, "El nombre del evento es requerido."),
  eventType: z.string({ required_error: "Por favor, selecciona un tipo de evento." }),
  proposedRole: z.string({ required_error: "Por favor, selecciona un rol." }),
  eventDate: z.date({
    required_error: "La fecha del evento es requerida.",
  }),
  eventTime: z.string().optional(),
  eventLocation: z.string().min(3, "La ubicación es requerida."),
  invitationReason: z.string().min(10, "El motivo debe tener al menos 10 caracteres."),
});

type InvitationFormValues = z.infer<typeof invitationFormSchema>;

const initialState: FormState = {
  message: "",
  status: "idle",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? "Enviando..." : "Enviar Invitación"}
    </Button>
  );
}

export function InvitationForm() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(onContactSubmit, initialState);
  const form = useForm<InvitationFormValues>({
    resolver: zodResolver(invitationFormSchema),
  });

  useEffect(() => {
    if (state.status === 'success' && state.message) {
      toast({
        title: "¡Invitación Recibida!",
        description: "Gracias por la invitación. Revisaré los detalles y te contactaré pronto.",
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
          formData.append('formType', 'invitation');
          form.handleSubmit(() => formAction(formData))();
        }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="inviterName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tu Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de quien invita" {...field} />
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
                  <Input placeholder="tu.email@ejemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Evento</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Tech Conf 2024" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Tipo de Evento</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="conferencia">Conferencia</SelectItem>
                        <SelectItem value="taller">Taller / Workshop</SelectItem>
                        <SelectItem value="meetup">Meetup / Comunidad</SelectItem>
                        <SelectItem value="reunion-negocios">Reunión de Negocios</SelectItem>
                        <SelectItem value="podcast-entrevista">Podcast / Entrevista</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="proposedRole"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Rol Propuesto</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu rol" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="expositor">Expositor / Ponente</SelectItem>
                        <SelectItem value="panelista">Panelista</SelectItem>
                        <SelectItem value="asistente-especial">Asistente Especial</SelectItem>
                        <SelectItem value="mentor">Mentor</SelectItem>
                        <SelectItem value="entrevistado">Entrevistado</SelectItem>
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
                control={form.control}
                name="eventDate"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Fecha del Evento</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                                date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="eventTime"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Hora (Opcional)</FormLabel>
                    <FormControl>
                    <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>

         <FormField
            control={form.control}
            name="eventLocation"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Ubicación o Enlace</FormLabel>
                <FormControl>
                    <Input placeholder="Dirección física o URL de la reunión" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
       
        <FormField
          control={form.control}
          name="invitationReason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivo de la Invitación</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe brevemente el evento y el motivo de la invitación."
                  className="min-h-[120px]"
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
