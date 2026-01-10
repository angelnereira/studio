
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Resend from "next-auth/providers/resend"
import QRCode from "qrcode"

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
      from: "Ángel Nereira <login@angelnereira.com>",
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        const { host } = new URL(url)

        try {
          // Generate QR Code
          const qrCodeDataUrl = await QRCode.toDataURL(url, { margin: 1, width: 200 })

          const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${provider.apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: provider.from,
              to: email,
              subject: `Iniciar sesión en ${host}`,
              html: html({ url, host, email, qrCodeDataUrl }),
              text: text({ url, host }),
            }),
          })

          if (!response.ok) {
            const error = await response.text()
            throw new Error(error)
          }
        } catch (error) {
          console.error("Failed to send verification email", error)
          throw new Error("Failed to send verification email")
        }
      },
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
    },
    async redirect({ url, baseUrl }) {
      // If the url starts with baseUrl, allow it, otherwise redirect to admin
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl + "/admin"
    }
  },
  pages: {
    signIn: '/admin/login',
    verifyRequest: '/admin/verify-request',
    error: '/admin/login', // Redirect errors back to login page
  },
  debug: process.env.NODE_ENV === "development",
})

function html({ url, host, email, qrCodeDataUrl }: { url: string; host: string; email: string; qrCodeDataUrl?: string }) {
  const escapedHost = host.replace(/\./g, "&#8203;.")
  const brandColor = "#ccf381" // Tu color verde neon
  const textColor = "#000000"
  const backgroundColor = "#f9f9f9"

  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${backgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${brandColor}">
              <a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${brandColor}; display: inline-block; font-weight: bold;">Iniciar Sesión</a>
            </td>
          </tr>
          ${qrCodeDataUrl ? `
          <tr>
            <td align="center" style="padding-top: 20px;">
                <p style="font-size: 14px; font-family: Helvetica, Arial, sans-serif; color: #666; margin-bottom: 10px;">O escanea este código desde tu móvil:</p>
                <img src="${qrCodeDataUrl}" alt="QR Login Code" width="200" height="200" style="display: block; border: 1px solid #eee; border-radius: 8px;" />
            </td>
          </tr>
          ` : ''}
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        Si no solicitaste este correo, puedes ignorarlo con seguridad.
      </td>
    </tr>
  </table>
</body>
`
}

function text({ url, host }: { url: string; host: string }) {
  return `Iniciar sesión en ${host}\n${url}\n\n`
}
