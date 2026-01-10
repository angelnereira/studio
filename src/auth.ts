
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Resend from "next-auth/providers/resend"

// Validation of required environment variables
if (!process.env.RESEND_API_KEY) {
    console.warn("⚠️  RESEND_API_KEY is missing in environment variables!")
}

if (!process.env.AUTH_SECRET) {
    console.warn("⚠️  AUTH_SECRET is missing. Authentication will fail in production.")
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Resend({
            apiKey: process.env.RESEND_API_KEY,
            from: "login@angelnereira.com",
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                // Add role to session for RBAC if it exists on user
                // @ts-ignore
                session.user.role = user.role;
            }
            return session;
        },
        async signIn({ user }) {
            // Security: Only allow specific email(s) to sign in initially
            const allowedEmails = ["angel.nereira@gmail.com", "contact@angelnereira.com", "angel@angelnereira.com"];

            if (user.email && allowedEmails.includes(user.email)) {
                return true;
            }

            console.warn(`Login attempt denied for email: ${user.email}`);
            return false; // Block everyone else
        }
    },
    pages: {
        signIn: '/admin/login',
        verifyRequest: '/admin/verify-request',
        error: '/admin/login', // Redirect errors back to login page
    },
    debug: process.env.NODE_ENV === "development",
})
