"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit, Menu, Moon, Sun, Download } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import * as React from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Servicios" },
  { href: "/skills", label: "Skills" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contacto" },
];

export function SiteHeader() {
  const [isSheetOpen, setSheetOpen] = React.useState(false);
  const pathname = usePathname();

  const { setTheme, theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2 group">
            <div className="w-8 h-8 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20 group-hover:border-primary/50 transition-colors duration-300">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold sm:inline-block">Ángel Nereira</span>
              <span className="text-xs text-muted-foreground hidden sm:inline-block -mt-1">Ingeniero de Software</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" asChild>
              <a href="/Angel_Nereira_CV.pdf" download>
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">CV</span>
              </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="sr-only">Menú Móvil</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-2 mb-8">
                   <BrainCircuit className="h-6 w-6 text-primary" />
                  <span className="font-bold">Ángel Nereira</span>
                </div>
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSheetOpen(false)}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-foreground/80",
                        pathname === item.href ? "text-foreground" : "text-foreground/60"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <a
                    href="/Angel_Nereira_CV.pdf"
                    download
                    className="text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 flex items-center"
                    onClick={() => setSheetOpen(false)}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Descargar CV
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
