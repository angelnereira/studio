import { Suspense } from "react"
import { LoginUI } from "./login-ui"

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <LoginUI />
        </Suspense>
    )
}
