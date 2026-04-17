"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Archive, ArchiveRestore, Trash2, Reply, Send } from "lucide-react";
import { archiveEmail, deleteInboundEmail, replyToInbound, type ReplyState } from "./actions";

interface Props {
    inboundId: string;
    archived: boolean;
    defaultReplySubject: string;
}

const initialReplyState: ReplyState = {};

export function InboxDetailActions({ inboundId, archived, defaultReplySubject }: Props) {
    const router = useRouter();
    const { toast } = useToast();
    const [showReply, setShowReply] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [replyState, replyAction] = useActionState(replyToInbound, initialReplyState);

    function handleArchive() {
        startTransition(async () => {
            await archiveEmail(inboundId, !archived);
            toast({ title: archived ? "Moved back to inbox" : "Archived" });
            router.refresh();
        });
    }

    function handleDelete() {
        if (!confirm("Delete this email permanently?")) return;
        startTransition(async () => {
            await deleteInboundEmail(inboundId);
            toast({ title: "Email deleted" });
            router.push("/admin/inbox");
        });
    }

    useEffect(() => {
        if (!showReply) return;
        if (replyState?.success) {
            toast({ title: replyState.message || "Reply sent" });
            setShowReply(false);
        } else if (replyState?.success === false && replyState.message) {
            toast({ title: replyState.message, variant: "destructive" });
        }
    }, [replyState, showReply, toast]);

    return (
        <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
                <Button
                    onClick={() => setShowReply((v) => !v)}
                    variant={showReply ? "secondary" : "default"}
                    className="gap-2"
                >
                    <Reply className="h-4 w-4" />
                    {showReply ? "Cancel reply" : "Reply"}
                </Button>
                <Button onClick={handleArchive} variant="outline" className="gap-2" disabled={isPending}>
                    {archived ? <ArchiveRestore className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
                    {archived ? "Unarchive" : "Archive"}
                </Button>
                <Button onClick={handleDelete} variant="ghost" className="gap-2 text-destructive" disabled={isPending}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                </Button>
            </div>

            {showReply && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Reply</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action={replyAction} className="space-y-4">
                            <input type="hidden" name="inboundId" value={inboundId} />
                            <div className="space-y-2">
                                <label className="text-xs uppercase text-muted-foreground">Subject</label>
                                <Input name="subject" defaultValue={defaultReplySubject} required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase text-muted-foreground">Message</label>
                                <Textarea name="body" rows={8} required />
                            </div>
                            <SubmitReply />
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

function SubmitReply() {
    return (
        <Button type="submit" className="gap-2">
            <Send className="h-4 w-4" />
            Send reply
        </Button>
    );
}

