import { ContactForm } from './contact-form';

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Contact Me</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Have a project in mind, want to collaborate, or just say hi? Fill out the form below.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-2xl">
        <ContactForm />
      </div>
    </div>
  );
}
