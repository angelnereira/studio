"use client"

import { useState } from "react"
import { Contact } from "@prisma/client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { MoreHorizontal, Search, Trash2, Mail, User, Briefcase, UserPlus, Calendar } from "lucide-react"
import { updateContactStatus, deleteContact } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"

interface CRMClientProps {
    initialContacts: Contact[]
}

export function CRMClient({ initialContacts }: CRMClientProps) {
    const [contacts, setContacts] = useState(initialContacts)
    const [filter, setFilter] = useState("all")
    const [search, setSearch] = useState("")
    const { toast } = useToast()

    // Filter Logic
    const filteredContacts = contacts.filter((contact) => {
        const matchesType = filter === "all" || contact.formType === filter
        const matchesSearch =
            contact.name?.toLowerCase().includes(search.toLowerCase()) ||
            contact.email.toLowerCase().includes(search.toLowerCase()) ||
            contact.company?.toLowerCase().includes(search.toLowerCase())

        return matchesType && matchesSearch
    })

    // Optimistic Update Helpers
    const handleStatusChange = async (id: string, newStatus: string) => {
        const oldContacts = [...contacts]
        setContacts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c))

        const result = await updateContactStatus(id, newStatus)
        if (result.message !== "Status updated") {
            setContacts(oldContacts)
            toast({ title: "Error", description: "Failed to update status", variant: "destructive" })
        } else {
            toast({ title: "Status Updated", description: `Marked as ${newStatus}` })
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This cannot be undone.")) return

        const oldContacts = [...contacts]
        setContacts(prev => prev.filter(c => c.id !== id))

        const result = await deleteContact(id)
        if (result.message !== "Contact deleted") {
            setContacts(oldContacts)
            toast({ title: "Error", description: "Failed to delete contact", variant: "destructive" })
        } else {
            toast({ title: "Deleted", description: "Contact removed from database" })
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "client": return <Briefcase className="w-4 h-4 text-blue-400" />
            case "employer": return <UserPlus className="w-4 h-4 text-purple-400" />
            case "collaborator": return <User className="w-4 h-4 text-green-400" />
            case "invitation": return <Calendar className="w-4 h-4 text-yellow-400" />
            default: return <Mail className="w-4 h-4 text-gray-400" />
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "new": return <Badge variant="default" className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">New</Badge>
            case "contacted": return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">Contacted</Badge>
            case "closed": return <Badge variant="outline" className="text-green-500 border-green-500/20">Closed</Badge>
            case "spam": return <Badge variant="destructive" className="bg-red-500/10 text-red-400 border-red-500/20">Spam</Badge>
            default: return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setFilter}>
                    <TabsList className="grid w-full grid-cols-5 sm:w-auto bg-black/40 border border-white/10">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="client">Clients</TabsTrigger>
                        <TabsTrigger value="employer">Jobs</TabsTrigger>
                        <TabsTrigger value="collaborator">Collabs</TabsTrigger>
                        <TabsTrigger value="invitation">Invites</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search leads..."
                        className="pl-8 bg-black/20"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="rounded-md border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/10 hover:bg-transparent">
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead className="hidden md:table-cell">Details</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredContacts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        ) : filteredContacts.map((contact) => (
                            <TableRow key={contact.id} className="border-white/5 hover:bg-white/5 group">
                                <TableCell className="font-medium">
                                    <div className="p-2 rounded-lg bg-white/5 w-fit">
                                        {getTypeIcon(contact.formType)}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{contact.name || "Unknown"}</span>
                                        <span className="text-xs text-muted-foreground font-mono">{contact.email}</span>
                                        {contact.company && <span className="text-xs text-primary mt-1">{contact.company}</span>}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell max-w-[300px]">
                                    <p className="truncate text-sm text-muted-foreground">
                                        {contact.message || contact.jobTitle || contact.eventType || "No message"}
                                    </p>
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(contact.status)}
                                </TableCell>
                                <TableCell className="text-right text-xs text-muted-foreground">
                                    {format(new Date(contact.createdAt), "MMM d, yyyy")}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end">
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button variant="ghost" size="sm" className="hidden group-hover:flex">View</Button>
                                            </SheetTrigger>
                                            <SheetContent className="w-[400px] sm:w-[540px] border-l border-white/10 bg-black/95 text-white">
                                                <SheetHeader className="mb-6">
                                                    <SheetTitle className="flex items-center gap-2 text-2xl">
                                                        {getTypeIcon(contact.formType)}
                                                        {contact.name}
                                                    </SheetTitle>
                                                    <SheetDescription>
                                                        Received on {format(new Date(contact.createdAt), "PPP p")}
                                                    </SheetDescription>
                                                </SheetHeader>

                                                <div className="space-y-6">
                                                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2">
                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                            <div>
                                                                <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Email</span>
                                                                <a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a>
                                                            </div>
                                                            {contact.country && (
                                                                <div>
                                                                    <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Country</span>
                                                                    <span>{contact.country}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Dynamic Fields based on Type */}
                                                    <div className="space-y-4">
                                                        <h3 className="text-lg font-semibold border-b border-white/10 pb-2">Project Details</h3>

                                                        {contact.formType === "client" && (
                                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                                {contact.service && <InfoItem label="Service" value={contact.service} />}
                                                                {contact.budget && <InfoItem label="Budget" value={contact.budget} />}
                                                                {contact.industry && <InfoItem label="Industry" value={contact.industry} />}
                                                                {contact.company && <InfoItem label="Company" value={contact.company} />}
                                                            </div>
                                                        )}

                                                        {contact.formType === "employer" && (
                                                            <div className="grid grid-cols-1 gap-4 text-sm">
                                                                <InfoItem label="Company" value={contact.companyName} />
                                                                <InfoItem label="Job Title" value={contact.jobTitle} />
                                                                <InfoItem label="Salary Offer" value={contact.salaryOffer} />
                                                            </div>
                                                        )}

                                                        {/* Message */}
                                                        <div className="bg-muted/20 p-4 rounded-md border border-white/5">
                                                            <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-2">Message / Details</span>
                                                            <p className="whitespace-pre-wrap text-sm leading-relaxed">
                                                                {contact.message || contact.jobDescription || contact.invitationReason || "No additional message provided."}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => handleDelete(contact.id)}
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-2" /> Delete Lead
                                                        </Button>

                                                        <div className="flex gap-2">
                                                            <Button variant="outline" size="sm" onClick={() => handleStatusChange(contact.id, "spam")}>
                                                                Mark Spam
                                                            </Button>
                                                            <Button onClick={() => handleStatusChange(contact.id, "contacted")}>
                                                                Mark Contacted
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SheetContent>
                                        </Sheet>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(contact.email)}>
                                                    Copy email
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuLabel>Set Status</DropdownMenuLabel>
                                                <DropdownMenuRadioGroup value={contact.status} onValueChange={(v) => handleStatusChange(contact.id, v)}>
                                                    <DropdownMenuRadioItem value="new">New</DropdownMenuRadioItem>
                                                    <DropdownMenuRadioItem value="contacted">Contacted</DropdownMenuRadioItem>
                                                    <DropdownMenuRadioItem value="closed">Closed</DropdownMenuRadioItem>
                                                    <DropdownMenuRadioItem value="spam">Spam</DropdownMenuRadioItem>
                                                </DropdownMenuRadioGroup>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleDelete(contact.id)} className="text-red-400 focus:text-red-500">
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

function InfoItem({ label, value }: { label: string, value: string | null | undefined }) {
    if (!value) return null
    return (
        <div>
            <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">{label}</span>
            <span className="font-medium text-white">{value}</span>
        </div>
    )
}
