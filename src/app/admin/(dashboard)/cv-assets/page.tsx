import { listCVAssets } from "./actions";
import { CVAssetsClient } from "./cv-assets-client";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "CV Assets | Admin",
};

export default async function CVAssetsPage() {
    const assets = await listCVAssets();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">CV Assets</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Sube tu CV en PDF en cada idioma. Marca uno como default y se adjuntará
                    automáticamente cuando envíes una aplicación en ese idioma.
                </p>
            </div>
            <CVAssetsClient
                assets={assets.map(a => ({
                    ...a,
                    createdAt: a.createdAt.toISOString(),
                }))}
            />
        </div>
    );
}
