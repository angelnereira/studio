import { Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto flex h-24 flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <div className="text-center text-sm text-muted-foreground md:text-left">
          <p className="font-medium text-foreground">“Solucionar problemas para disfrutar la vida.”</p>
          <p>Construido por Ángel Nereira. © {new Date().getFullYear()} Todos los Derechos Reservados.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="text-muted-foreground transition-colors hover:text-primary">
            <Link href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-muted-foreground transition-colors hover:text-primary">
            <Link href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-muted-foreground transition-colors hover:text-primary">
            <Link href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
