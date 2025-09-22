import { ContactForm } from './contact-form';
import { AnimatedDiv } from '@/components/animated-div';

export default function ContactPage() {
  return (
    <>
      <AnimatedDiv>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Contact Me</h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Have a project in mind, want to collaborate, or just say hi? Fill out the form below.
          </p>
        </div>
      </AnimatedDiv>
      <AnimatedDiv delay={0.2}>
        <div className="mx-auto mt-12 max-w-2xl">
          <ContactForm />
        </div>
      </AnimatedDiv>
    </>
  );
}
