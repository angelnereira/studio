
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Resend from "next-auth/providers/resend"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Resend({
            from: "onboarding@resend.dev", // Update this to your verified domain later, e.g., login@angelnereira.com
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            // Add role to session for RBAC
            session.user.role = user.role;
            return session;
        },
        async signIn({ user }) {
            // Security: Only allow specific email(s) to sign in initially
            // Cambia "tu-email@gmail.com" por tu correo real autorizado
            const allowedEmails = ["angel.nereira@gmail.com", "contact@angelnereira.com", "angel@angelnereira.com"];
            if (user.email && allowedEmails.includes(user.email)) {
                return true;
            }
            return false; // Block everyone else
        }
    },
    pages: {
        signIn: '/admin/login',
    }
})
