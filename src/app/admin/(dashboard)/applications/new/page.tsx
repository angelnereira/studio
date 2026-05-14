import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import NewApplicationWizard from "./application-wizard";

export const dynamic = "force-dynamic";

export default async function NewApplicationPage() {
    // Lightweight: only the metadata we need to render the dropdown.
    // We deliberately exclude `data` (Bytes) so we don't pump the full PDF
    // into the client bundle.
    const cvAssets = await prisma.cVAsset.findMany({
        orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
        select: {
            id: true,
            name: true,
            language: true,
            kind: true,
            isDefault: true,
        },
    });

    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64">Loading...</div>}>
            <NewApplicationWizard cvAssets={cvAssets} />
        </Suspense>
    );
}
