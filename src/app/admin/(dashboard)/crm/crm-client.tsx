"use client"

import { useState, useTransition } from "react"
import { Contact, ActivityLog, CampaignRecipient } from "@prisma/client"
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    MoreHorizontal, Search, Trash2, Mail, User, Briefcase, UserPlus, Calendar,
    Send, MessageSquare, Clock, CheckCircle2, Eye, MousePointer, Loader2, Plus, Tag, X
} from "lucide-react"
import {
    updateContactStatus, deleteContact, addContactNote, getContactWithHistory,
    createContact, updateContactTags, type CreateContactInput
} from "./actions"
import { useToast } from "@/hooks/use-toast"
import { format, formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { useRouter } from "next/navigation"

// Types
type ContactWithCampaigns = Contact & {
    campaignRecipients?: { status: string; createdAt: Date }[]
}

type ContactWithHistory = Contact & {
    activityLogs: ActivityLog[]
    campaignRecipients: (CampaignRecipient & {
        campaign: { id: string; name: string; subject: string; sentAt: Date | null }
    })[]
}

interface CRMClientProps {
    initialContacts: ContactWithCampaigns[]
    availableTags: string[]
}

// Common tags suggestions
const SUGGESTED_TAGS = ["vip", "hot-lead", "follow-up", "priority", "pending-quote", "referred"]

export function CRMClient({ initialContacts, availableTags }: CRMClientProps) {
    const router = useRouter()
    const [contacts, setContacts] = useState(initialContacts)
    const [filter, setFilter] = useState("all")
    const [tagFilter, setTagFilter] = useState<string | null>(null)
    const [search, setSearch] = useState("")
    const [selectedContact, setSelectedContact] = useState<ContactWithHistory | null>(null)
    const [isLoadingHistory, setIsLoadingHistory] = useState(false)
    const [newNote, setNewNote] = useState("")
    const [isAddingNote, startAddNote] = useTransition()
    const [isAddContactOpen, setIsAddContactOpen] = useState(false)
    const [newContactData, setNewContactData] = useState<CreateContactInput>({
        name: "",
        email: "",
        formType: "client",
        company: "",
        service: "",
        message: "",
        tags: [],
    })
    const [isCreating, startCreateContact] = useTransition()
    const [newTagInput, setNewTagInput] = useState("")
    const { toast } = useToast()

    // Combine available tags with suggestions
    const allAvailableTags = [...new Set([...availableTags, ...SUGGESTED_TAGS])].sort()

    // Filter Logic
    const filteredContacts = contacts.filter((contact) => {
        const matchesType = filter === "all" || contact.formType === filter
        const matchesTag = !tagFilter || (contact.tags && contact.tags.includes(tagFilter))
        const matchesSearch =
            contact.name?.toLowerCase().includes(search.toLowerCase()) ||
            contact.email.toLowerCase().includes(search.toLowerCase()) ||
            contact.company?.toLowerCase().includes(search.toLowerCase())

        return matchesType && matchesTag && matchesSearch
    })

    // Load contact history when opening sheet
    const handleOpenSheet = async (contact: Contact) => {
        setIsLoadingHistory(true)
        setSelectedContact(contact as ContactWithHistory)

        const fullContact = await getContactWithHistory(contact.id)
        if (fullContact) {
            setSelectedContact(fullContact as ContactWithHistory)
        }
        setIsLoadingHistory(false)
    }

    // Create new contact
    const handleCreateContact = async () => {
        startCreateContact(async () => {
            const result = await createContact(newContactData)
            if (result.success) {
                toast({ title: "Contact Created", description: result.message })
                setIsAddContactOpen(false)
                setNewContactData({
                    name: "", email: "", formType: "client", company: "", service: "", message: "", tags: []
                })
                router.refresh()
            } else {
                toast({ title: "Error", description: result.message, variant: "destructive" })
            }
        })
    }

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
            if (selectedContact?.id === id) {
                handleOpenSheet({ ...selectedContact, status: newStatus })
            }
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
            setSelectedContact(null)
        }
    }

    const handleAddNote = async () => {
        if (!selectedContact || !newNote.trim()) return

        startAddNote(async () => {
            const result = await addContactNote(selectedContact.id, newNote)
            if (result.success) {
                toast({ title: "Note Added", description: "Activity logged" })
                setNewNote("")
                handleOpenSheet(selectedContact)
            } else {
                toast({ title: "Error", description: result.message, variant: "destructive" })
            }
        })
    }

    const handleUpdateTags = async (contactId: string, tags: string[]) => {
        const result = await updateContactTags(contactId, tags)
        if (result.success) {
            setContacts(prev => prev.map(c => c.id === contactId ? { ...c, tags } : c))
            if (selectedContact?.id === contactId) {
                setSelectedContact(prev => prev ? { ...prev, tags } : null)
            }
            toast({ title: "Tags Updated" })
        } else {
            toast({ title: "Error", description: result.message, variant: "destructive" })
        }
    }

    const addTagToNewContact = (tag: string) => {
        if (!newContactData.tags?.includes(tag)) {
            setNewContactData(prev => ({ ...prev, tags: [...(prev.tags || []), tag] }))
        }
        setNewTagInput("")
    }

    const addTagToContact = (tag: string) => {
        if (selectedContact && !selectedContact.tags?.includes(tag)) {
            handleUpdateTags(selectedContact.id, [...(selectedContact.tags || []), tag])
        }
    }

    const removeTagFromContact = (tag: string) => {
        if (selectedContact) {
            handleUpdateTags(selectedContact.id, (selectedContact.tags || []).filter(t => t !== tag))
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

    const getActivityIcon = (type: string) => {
        switch (type) {
            case "email_sent": return <Send className="w-3.5 h-3.5 text-blue-400" />
            case "email_opened": return <Eye className="w-3.5 h-3.5 text-green-400" />
            case "email_clicked": return <MousePointer className="w-3.5 h-3.5 text-purple-400" />
            case "status_change": return <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" />
            case "note": return <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
            default: return <Clock className="w-3.5 h-3.5 text-muted-foreground" />
        }
    }

    return (
        <div className="space-y-4">
            {/* Filters and Actions Bar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setFilter}>
                        <TabsList className="grid w-full grid-cols-5 sm:w-auto bg-black/40 border border-white/10">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="client">Clients</TabsTrigger>
                            <TabsTrigger value="employer">Jobs</TabsTrigger>
                            <TabsTrigger value="collaborator">Collabs</TabsTrigger>
                            <TabsTrigger value="invitation">Invites</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {/* Tag Filter */}
                    {allAvailableTags.length > 0 && (
                        <Select value={tagFilter || "all"} onValueChange={(v) => setTagFilter(v === "all" ? null : v)}>
                            <SelectTrigger className="w-[140px] bg-black/40 border-white/10">
                                <Tag className="w-3.5 h-3.5 mr-2" />
                                <SelectValue placeholder="All Tags" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Tags</SelectItem>
                                {allAvailableTags.map(tag => (
                                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search leads..."
                            className="pl-8 bg-black/20"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Add Contact Button */}
                    <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
                        <DialogTrigger asChild>
                            <Button className="gap-2">
                                <Plus className="w-4 h-4" /> Add Contact
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] bg-black/95 border-white/10">
                            <DialogHeader>
                                <DialogTitle>Add New Contact</DialogTitle>
                                <DialogDescription>Create a new lead or contact manually.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Name *</Label>
                                        <Input
                                            placeholder="John Doe"
                                            value={newContactData.name}
                                            onChange={(e) => setNewContactData(prev => ({ ...prev, name: e.target.value }))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email *</Label>
                                        <Input
                                            type="email"
                                            placeholder="john@example.com"
                                            value={newContactData.email}
                                            onChange={(e) => setNewContactData(prev => ({ ...prev, email: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Type</Label>
                                        <Select
                                            value={newContactData.formType}
                                            onValueChange={(v: "client" | "employer" | "collaborator" | "invitation") =>
                                                setNewContactData(prev => ({ ...prev, formType: v }))
                                            }
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="client">Client</SelectItem>
                                                <SelectItem value="employer">Employer</SelectItem>
                                                <SelectItem value="collaborator">Collaborator</SelectItem>
                                                <SelectItem value="invitation">Invitation</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Company</Label>
                                        <Input
                                            placeholder="Acme Inc."
                                            value={newContactData.company || ""}
                                            onChange={(e) => setNewContactData(prev => ({ ...prev, company: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Service Interest</Label>
                                    <Input
                                        placeholder="Web Development, E-commerce..."
                                        value={newContactData.service || ""}
                                        onChange={(e) => setNewContactData(prev => ({ ...prev, service: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Notes / Message</Label>
                                    <Textarea
                                        placeholder="Initial conversation notes..."
                                        value={newContactData.message || ""}
                                        onChange={(e) => setNewContactData(prev => ({ ...prev, message: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Tags</Label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {(newContactData.tags || []).map(tag => (
                                            <Badge key={tag} variant="secondary" className="gap-1">
                                                {tag}
                                                <X
                                                    className="w-3 h-3 cursor-pointer hover:text-red-400"
                                                    onClick={() => setNewContactData(prev => ({
                                                        ...prev,
                                                        tags: prev.tags?.filter(t => t !== tag)
                                                    }))}
                                                />
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Add tag..."
                                            value={newTagInput}
                                            onChange={(e) => setNewTagInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && newTagInput.trim()) {
                                                    e.preventDefault()
                                                    addTagToNewContact(newTagInput.trim().toLowerCase())
                                                }
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                if (newTagInput.trim()) addTagToNewContact(newTagInput.trim().toLowerCase())
                                            }}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {SUGGESTED_TAGS.filter(t => !newContactData.tags?.includes(t)).slice(0, 4).map(tag => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="cursor-pointer hover:bg-white/10 text-xs"
                                                onClick={() => addTagToNewContact(tag)}
                                            >
                                                + {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsAddContactOpen(false)}>Cancel</Button>
                                <Button onClick={handleCreateContact} disabled={isCreating || !newContactData.name || !newContactData.email}>
                                    {isCreating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                                    Create Contact
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Active Tag Filter Badge */}
            {tagFilter && (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Filtering by:</span>
                    <Badge variant="secondary" className="gap-1">
                        <Tag className="w-3 h-3" /> {tagFilter}
                        <X className="w-3 h-3 cursor-pointer hover:text-red-400" onClick={() => setTagFilter(null)} />
                    </Badge>
                </div>
            )}

            {/* Contacts Table */}
            <div className="rounded-md border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/10 hover:bg-transparent">
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead className="hidden md:table-cell">Tags</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
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
                                <TableCell className="hidden md:table-cell">
                                    <div className="flex flex-wrap gap-1">
                                        {(contact.tags || []).slice(0, 3).map(tag => (
                                            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                                        ))}
                                        {(contact.tags?.length || 0) > 3 && (
                                            <Badge variant="outline" className="text-xs">+{contact.tags!.length - 3}</Badge>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(contact.status)}
                                </TableCell>
                                <TableCell className="text-right text-xs text-muted-foreground">
                                    {format(new Date(contact.createdAt), "MMM d, yyyy")}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-1">
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="hidden group-hover:flex"
                                                    onClick={() => handleOpenSheet(contact)}
                                                >
                                                    View
                                                </Button>
                                            </SheetTrigger>
                                            <SheetContent className="w-[400px] sm:w-[600px] border-l border-white/10 bg-black/95 text-white p-0 flex flex-col">
                                                <SheetHeader className="px-6 pt-6 pb-4 border-b border-white/10">
                                                    <SheetTitle className="flex items-center gap-2 text-xl">
                                                        {getTypeIcon(selectedContact?.formType || contact.formType)}
                                                        {selectedContact?.name || contact.name}
                                                    </SheetTitle>
                                                    <SheetDescription className="flex items-center gap-4">
                                                        <span>{formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true, locale: es })}</span>
                                                        {getStatusBadge(selectedContact?.status || contact.status)}
                                                    </SheetDescription>
                                                </SheetHeader>

                                                <ScrollArea className="flex-1 px-6">
                                                    <div className="space-y-6 py-4">
                                                        {/* Contact Info */}
                                                        <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
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
                                                                {contact.service && <InfoItem label="Service" value={contact.service} />}
                                                                {contact.budget && <InfoItem label="Budget" value={contact.budget} />}
                                                                {contact.company && <InfoItem label="Company" value={contact.company} />}
                                                            </div>
                                                        </div>

                                                        {/* Tags Section */}
                                                        <div className="space-y-2">
                                                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                                                <Tag className="w-4 h-4" /> Tags
                                                            </h3>
                                                            <div className="flex flex-wrap gap-2">
                                                                {(selectedContact?.tags || []).map(tag => (
                                                                    <Badge key={tag} variant="secondary" className="gap-1">
                                                                        {tag}
                                                                        <X className="w-3 h-3 cursor-pointer hover:text-red-400" onClick={() => removeTagFromContact(tag)} />
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                            <div className="flex flex-wrap gap-1 pt-1">
                                                                {allAvailableTags.filter(t => !(selectedContact?.tags || []).includes(t)).slice(0, 5).map(tag => (
                                                                    <Badge
                                                                        key={tag}
                                                                        variant="outline"
                                                                        className="cursor-pointer hover:bg-white/10 text-xs"
                                                                        onClick={() => addTagToContact(tag)}
                                                                    >
                                                                        + {tag}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Message */}
                                                        {(contact.message || contact.jobDescription) && (
                                                            <div className="bg-muted/20 p-4 rounded-md border border-white/5">
                                                                <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-2">Message</span>
                                                                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                                                                    {contact.message || contact.jobDescription}
                                                                </p>
                                                            </div>
                                                        )}

                                                        {/* Email History */}
                                                        <div className="space-y-3">
                                                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                                                <Mail className="w-4 h-4" /> Emails Sent
                                                            </h3>
                                                            {isLoadingHistory ? (
                                                                <div className="flex items-center justify-center py-4">
                                                                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                                                                </div>
                                                            ) : selectedContact?.campaignRecipients?.length ? (
                                                                <div className="space-y-2">
                                                                    {selectedContact.campaignRecipients.map((recipient) => (
                                                                        <div key={recipient.id} className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-start gap-3">
                                                                            <div className={`p-1.5 rounded ${recipient.status === 'sent' || recipient.status === 'delivered' ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                                                                                <Send className={`w-3 h-3 ${recipient.status === 'sent' || recipient.status === 'delivered' ? 'text-green-400' : 'text-gray-400'}`} />
                                                                            </div>
                                                                            <div className="flex-1 min-w-0">
                                                                                <p className="text-sm font-medium truncate">{recipient.campaign.subject}</p>
                                                                                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                                                                    <span>{recipient.campaign.sentAt ? format(new Date(recipient.campaign.sentAt), "d MMM yyyy") : "Draft"}</span>
                                                                                    {recipient.openedAt && (
                                                                                        <span className="text-green-400 flex items-center gap-1">
                                                                                            <Eye className="w-3 h-3" /> Opened
                                                                                        </span>
                                                                                    )}
                                                                                    {recipient.clickedAt && (
                                                                                        <span className="text-purple-400 flex items-center gap-1">
                                                                                            <MousePointer className="w-3 h-3" /> Clicked
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <p className="text-sm text-muted-foreground py-2">No emails sent yet.</p>
                                                            )}
                                                        </div>

                                                        {/* Activity Log */}
                                                        <div className="space-y-3">
                                                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                                                <Clock className="w-4 h-4" /> Activity Log
                                                            </h3>

                                                            {/* Add Note */}
                                                            <div className="flex gap-2">
                                                                <Textarea
                                                                    placeholder="Add a note..."
                                                                    className="min-h-[60px] bg-black/20 text-sm resize-none"
                                                                    value={newNote}
                                                                    onChange={(e) => setNewNote(e.target.value)}
                                                                />
                                                                <Button
                                                                    size="sm"
                                                                    className="self-end"
                                                                    onClick={handleAddNote}
                                                                    disabled={isAddingNote || !newNote.trim()}
                                                                >
                                                                    {isAddingNote ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                                                </Button>
                                                            </div>

                                                            {isLoadingHistory ? (
                                                                <div className="flex items-center justify-center py-4">
                                                                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                                                                </div>
                                                            ) : selectedContact?.activityLogs?.length ? (
                                                                <div className="space-y-2">
                                                                    {selectedContact.activityLogs.map((log) => (
                                                                        <div key={log.id} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                                                                            <div className="p-1.5 rounded bg-white/5 mt-0.5">
                                                                                {getActivityIcon(log.type)}
                                                                            </div>
                                                                            <div className="flex-1 min-w-0">
                                                                                <p className="text-sm">{log.title}</p>
                                                                                <span className="text-xs text-muted-foreground">
                                                                                    {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true, locale: es })}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <p className="text-sm text-muted-foreground py-2">No activity yet.</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </ScrollArea>

                                                {/* Actions Footer */}
                                                <div className="p-4 border-t border-white/10 flex justify-between items-center bg-black/40">
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleDelete(contact.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                                                    </Button>

                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => window.open(`mailto:${contact.email}`)}
                                                        >
                                                            <Mail className="w-4 h-4 mr-2" /> Email
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleStatusChange(contact.id, contact.status === "closed" ? "new" : "closed")}
                                                            className={contact.status === "closed" ? "" : "bg-green-600 hover:bg-green-700"}
                                                        >
                                                            {contact.status === "closed" ? "Reopen" : "Close Deal"}
                                                        </Button>
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
                                                <DropdownMenuItem onClick={() => window.open(`mailto:${contact.email}`)}>
                                                    <Mail className="w-4 h-4 mr-2" /> Send Email
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
