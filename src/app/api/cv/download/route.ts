import { NextRequest, NextResponse } from "next/server";
import { generateProfileBuffer } from "@/lib/profile-pdf-generator";

// Simple in-memory rate limiting map
// In production on Vercel Edge, you'd use Upstash Redis, but this works for basic Node runtimes
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const lang = searchParams.get("lang");

    if (lang !== "es" && lang !== "en") {
        return NextResponse.json({ error: "Invalid language. Use 'es' or 'en'." }, { status: 400 });
    }

    // Rate Limiting Logic
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const ipHash = Buffer.from(ip).toString('base64').substring(0, 16);

    const now = Date.now();
    const limitRecord = rateLimitMap.get(ipHash);

    if (limitRecord) {
        if (now > limitRecord.resetTime) {
            rateLimitMap.set(ipHash, { count: 1, resetTime: now + WINDOW_MS });
        } else {
            limitRecord.count++;
            if (limitRecord.count > RATE_LIMIT) {
                console.warn(`[Profile API] Rate limit exceeded for IP Hash: ${ipHash}`);
                return NextResponse.json({
                    error: lang === "es" ? "Demasiadas descargas. Intenta en 1 hora." : "Too many downloads. Try again in 1 hour."
                }, { status: 429 });
            }
        }
    } else {
        rateLimitMap.set(ipHash, { count: 1, resetTime: now + WINDOW_MS });
    }

    console.log(`[Profile API] Download requested. IP Hash: ${ipHash}, Lang: ${lang}`);

    try {
        const pdfBuffer = generateProfileBuffer(lang);

        const response = new NextResponse(pdfBuffer);
        response.headers.set("Content-Type", "application/pdf");
        response.headers.set("Content-Disposition", `attachment; filename="Angel_Nereira_Profile_${lang.toUpperCase()}_2026.pdf"`);
        response.headers.set("X-Content-Type-Options", "nosniff");
        response.headers.set("Cache-Control", "no-store, max-age=0");

        return response;
    } catch (err) {
        console.error(`[Profile API] Error generating PDF:`, err);
        return NextResponse.json({
            error: lang === "es" ? "Error interno al generar el perfil" : "Internal server error generating profile"
        }, { status: 500 });
    }
}
