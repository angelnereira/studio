"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

async function requireSession() {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");
    return session;
}

const uploadSchema = z.object({
    name: z.string().min(1, "Name required").max(120),
    language: z.enum(["en", "es"]),
    kind: z.enum(["short", "profile", "custom"]).default("custom"),
    base64: z.string().min(1, "PDF content required"),
    mimeType: z.string().default("application/pdf"),
    size: z.number().int().positive(),
    setAsDefault: z.boolean().default(false),
});

export type CVAssetActionState = {
    success: boolean;
    message: string;
    assetId?: string;
};

const MAX_SIZE_MB = 8; // Generous for CV PDFs; Resend cap is 40MB total.

export async function uploadCVAsset(
    input: z.infer<typeof uploadSchema>,
): Promise<CVAssetActionState> {
    await requireSession();
    const parsed = uploadSchema.safeParse(input);
    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues.map((i) => i.message).join(", "),
        };
    }
    const { name, language, kind, base64, mimeType, size, setAsDefault } = parsed.data;
    if (size > MAX_SIZE_MB * 1024 * 1024) {
        return { success: false, message: `File exceeds ${MAX_SIZE_MB}MB limit.` };
    }
    if (mimeType !== "application/pdf") {
        return { success: false, message: "Only PDF files are supported." };
    }

    try {
        const buffer = Buffer.from(base64, "base64");
        const asset = await prisma.cVAsset.create({
            data: {
                name: name.trim(),
                language,
                kind,
                mimeType,
                data: buffer,
                size,
                isDefault: false,
            },
            select: { id: true },
        });

        if (setAsDefault) {
            await setDefaultCVAsset(asset.id, language);
        }
        revalidatePath("/admin/cv-assets");
        return { success: true, message: "Uploaded", assetId: asset.id };
    } catch (err) {
        console.error("[uploadCVAsset] error:", err);
        return {
            success: false,
            message: err instanceof Error ? err.message : "Upload failed",
        };
    }
}

export async function setDefaultCVAsset(
    assetId: string,
    language: "en" | "es",
): Promise<CVAssetActionState> {
    await requireSession();
    try {
        // Only one default per language.
        await prisma.$transaction([
            prisma.cVAsset.updateMany({
                where: { language, isDefault: true },
                data: { isDefault: false },
            }),
            prisma.cVAsset.update({
                where: { id: assetId },
                data: { isDefault: true, language },
            }),
        ]);
        revalidatePath("/admin/cv-assets");
        return { success: true, message: `Set as default ${language.toUpperCase()} CV` };
    } catch (err) {
        return {
            success: false,
            message: err instanceof Error ? err.message : "Failed to set default",
        };
    }
}

export async function deleteCVAsset(assetId: string): Promise<CVAssetActionState> {
    await requireSession();
    try {
        await prisma.cVAsset.delete({ where: { id: assetId } });
        revalidatePath("/admin/cv-assets");
        return { success: true, message: "Deleted" };
    } catch (err) {
        return {
            success: false,
            message: err instanceof Error ? err.message : "Failed to delete",
        };
    }
}

export async function listCVAssets() {
    await requireSession();
    return prisma.cVAsset.findMany({
        orderBy: [{ language: "asc" }, { isDefault: "desc" }, { createdAt: "desc" }],
        select: {
            id: true,
            name: true,
            language: true,
            kind: true,
            mimeType: true,
            size: true,
            isDefault: true,
            createdAt: true,
            // Don't return the binary blob in the list view.
        },
    });
}
