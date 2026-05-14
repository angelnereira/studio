"use client";

import { useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, Trash2, Star, Loader2, CheckCircle2 } from "lucide-react";
import { uploadCVAsset, setDefaultCVAsset, deleteCVAsset } from "./actions";

interface CVAssetView {
    id: string;
    name: string;
    language: string;
    kind: string;
    mimeType: string;
    size: number;
    isDefault: boolean;
    createdAt: string;
}

interface CVAssetsClientProps {
    assets: CVAssetView[];
}

function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function CVAssetsClient({ assets }: CVAssetsClientProps) {
    const router = useRouter();
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState("");
    const [language, setLanguage] = useState<"en" | "es">("es");
    const [kind, setKind] = useState<"short" | "profile" | "custom">("short");
    const [setAsDefault, setSetAsDefault] = useState(true);
    const [file, setFile] = useState<File | null>(null);
    const [pending, startTransition] = useTransition();

    const enDefault = assets.find(a => a.language === "en" && a.isDefault);
    const esDefault = assets.find(a => a.language === "es" && a.isDefault);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        if (!f.name.toLowerCase().endsWith(".pdf")) {
            toast({ title: "PDF requerido", description: "Sube un archivo .pdf", variant: "destructive" });
            return;
        }
        setFile(f);
        if (!name.trim()) {
            setName(f.name.replace(/\.pdf$/i, ""));
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast({ title: "Falta archivo", description: "Selecciona un PDF primero", variant: "destructive" });
            return;
        }
        if (!name.trim()) {
            toast({ title: "Falta nombre", description: "Ponle un nombre al CV", variant: "destructive" });
            return;
        }

        const reader = new FileReader();
        reader.onload = async () => {
            const dataUrl = reader.result as string;
            const base64 = dataUrl.split(",")[1] ?? "";
            startTransition(async () => {
                const res = await uploadCVAsset({
                    name: name.trim(),
                    language,
                    kind,
                    base64,
                    mimeType: file.type || "application/pdf",
                    size: file.size,
                    setAsDefault,
                });
                if (res.success) {
                    toast({ title: "✅ Subido", description: res.message });
                    setName("");
                    setFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                    router.refresh();
                } else {
                    toast({ title: "Error", description: res.message, variant: "destructive" });
                }
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSetDefault = (asset: CVAssetView) => {
        startTransition(async () => {
            const res = await setDefaultCVAsset(asset.id, asset.language === "es" ? "es" : "en");
            toast({
                title: res.success ? "Default actualizado" : "Error",
                description: res.message,
                variant: res.success ? "default" : "destructive",
            });
            if (res.success) router.refresh();
        });
    };

    const handleDelete = (asset: CVAssetView) => {
        if (!confirm(`¿Eliminar "${asset.name}"?`)) return;
        startTransition(async () => {
            const res = await deleteCVAsset(asset.id);
            toast({
                title: res.success ? "Eliminado" : "Error",
                description: res.message,
                variant: res.success ? "default" : "destructive",
            });
            if (res.success) router.refresh();
        });
    };

    return (
        <div className="space-y-6">
            {/* Defaults summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Card className="border-white/10 bg-black/40">
                    <CardContent className="p-4 flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">ES</Badge>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">Default español</p>
                            <p className="text-sm font-medium truncate">
                                {esDefault?.name ?? <span className="text-muted-foreground">sin definir</span>}
                            </p>
                        </div>
                        {esDefault && <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />}
                    </CardContent>
                </Card>
                <Card className="border-white/10 bg-black/40">
                    <CardContent className="p-4 flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">EN</Badge>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">Default English</p>
                            <p className="text-sm font-medium truncate">
                                {enDefault?.name ?? <span className="text-muted-foreground">not set</span>}
                            </p>
                        </div>
                        {enDefault && <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />}
                    </CardContent>
                </Card>
            </div>

            {/* Upload card */}
            <Card className="border-white/10 bg-black/40">
                <CardHeader>
                    <CardTitle className="text-base md:text-lg">Subir nuevo CV</CardTitle>
                    <CardDescription className="text-xs">
                        PDF max 8MB. El idioma marcado como default se adjuntará automáticamente
                        cuando envíes una aplicación en ese idioma.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label className="text-xs">Nombre</Label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ej: CV Ángel Nereira ES"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs">Idioma</Label>
                            <Select value={language} onValueChange={(v: "en" | "es") => setLanguage(v)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="es">Español</SelectItem>
                                    <SelectItem value="en">English</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs">Tipo</Label>
                            <Select value={kind} onValueChange={(v: "short" | "profile" | "custom") => setKind(v)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="short">CV corto</SelectItem>
                                    <SelectItem value="profile">Perfil largo</SelectItem>
                                    <SelectItem value="custom">Custom</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs">Archivo PDF</Label>
                            <Input ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFile} />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            id="set-default"
                            type="checkbox"
                            checked={setAsDefault}
                            onChange={(e) => setSetAsDefault(e.target.checked)}
                            className="h-4 w-4"
                        />
                        <Label htmlFor="set-default" className="text-xs cursor-pointer">
                            Marcar como default para {language === "es" ? "español" : "inglés"}
                        </Label>
                    </div>

                    <Button onClick={handleUpload} disabled={pending || !file || !name.trim()} className="w-full sm:w-auto">
                        {pending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                        Subir CV
                    </Button>
                </CardContent>
            </Card>

            {/* List of existing assets */}
            <Card className="border-white/10 bg-black/40">
                <CardHeader>
                    <CardTitle className="text-base md:text-lg">CVs guardados ({assets.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {assets.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                            <FileText className="h-10 w-10 mx-auto mb-3 opacity-50" />
                            <p>Aún no hay CVs guardados.</p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-white/10">
                            {assets.map((a) => (
                                <li key={a.id} className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                                    <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <p className="text-sm font-medium truncate">{a.name}</p>
                                            <Badge variant="outline" className="text-[10px]">{a.language.toUpperCase()}</Badge>
                                            <Badge variant="outline" className="text-[10px]">{a.kind}</Badge>
                                            {a.isDefault && (
                                                <Badge className="text-[10px] bg-primary/15 text-primary border-primary/40">
                                                    <Star className="h-3 w-3 mr-1" /> default
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-muted-foreground">
                                            {formatBytes(a.size)} · subido {new Date(a.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        {!a.isDefault && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleSetDefault(a)}
                                                disabled={pending}
                                            >
                                                <Star className="h-3.5 w-3.5 mr-1" /> Default
                                            </Button>
                                        )}
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 text-red-400 hover:text-red-300"
                                            onClick={() => handleDelete(a)}
                                            disabled={pending}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
