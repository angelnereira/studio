import { Suspense } from "react";
import NewApplicationWizard from "./application-wizard";

export default function NewApplicationPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64">Loading...</div>}>
            <NewApplicationWizard />
        </Suspense>
    );
}
