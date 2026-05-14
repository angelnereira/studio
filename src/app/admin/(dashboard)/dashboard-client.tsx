"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Users, Eye, MousePointerClick, TrendingUp, Mail, FileText,
    Briefcase, Search, Activity, BarChart, Inbox,
} from "lucide-react"
import { StatCard } from "@/components/admin/stat-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

interface StatData {
    title: string;
    value: string;
    icon: string;
    change: string;
    color: string;
}

interface ActivityItem {
    id: string;
    type: string;
    title: string;
    time: string;
    description?: string;
}

interface DashboardClientProps {
    trafficStats: StatData[];
    studioStats: StatData[];
    activities: ActivityItem[];
    userName?: string;
}

const iconMap: Record<string, React.ElementType> = {
    "eye": Eye,
    "users": Users,
    "mouse-pointer": MousePointerClick,
    "trending-up": TrendingUp,
    "briefcase": Briefcase,
    "mail": Mail,
    "activity": Activity,
    "bar-chart": BarChart,
    "file-text": FileText,
    "inbox": Inbox,
}

function DashboardStatCard({ title, value, icon, change, color }: StatData) {
    const Icon = iconMap[icon] || TrendingUp
    return <StatCard title={title} value={value} icon={Icon} color={color} change={change} />
}

const QUICK_ACTIONS: {
    href: string;
    icon: React.ElementType;
    label: string;
    description: string;
    color: string;
}[] = [
    { href: "/admin/inbox", icon: Inbox, label: "Inbox", description: "Read and reply to messages", color: "text-primary" },
    { href: "/admin/blog/create", icon: FileText, label: "New article", description: "Publish a blog post", color: "text-sky-400" },
    { href: "/admin/emails", icon: Mail, label: "Email marketing", description: "Campaigns and templates", color: "text-purple-400" },
    { href: "/admin/crm", icon: Users, label: "CRM & leads", description: "Contacts and pipeline", color: "text-emerald-400" },
    { href: "/admin/applications/new", icon: Briefcase, label: "New application", description: "Track a job vacancy", color: "text-orange-400" },
    { href: "/admin/job-analysis", icon: Search, label: "AI job analysis", description: "Break down a job offer", color: "text-cyan-400" },
]

export function DashboardClient({ trafficStats, studioStats, activities, userName = "Chief" }: DashboardClientProps) {
    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.05 } },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            <motion.div variants={item}>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    Welcome back, {userName}
                </h1>
                <p className="text-muted-foreground mt-2">
                    Your digital empire at a glance.
                </p>
            </motion.div>

            <motion.section variants={item} className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
                    <Activity className="h-3.5 w-3.5" /> Site traffic
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {trafficStats.map((stat, i) => <DashboardStatCard key={i} {...stat} />)}
                </div>
            </motion.section>

            <motion.section variants={item} className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
                    <TrendingUp className="h-3.5 w-3.5" /> Studio activity
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {studioStats.map((stat, i) => <DashboardStatCard key={i} {...stat} />)}
                </div>
            </motion.section>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <motion.div variants={item} className="lg:col-span-4">
                    <Card className="h-full bg-black/40 border-white/10 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Recent activity</CardTitle>
                            <CardDescription>Latest events across your studio</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-5">
                                {activities.length > 0 ? activities.map((act) => (
                                    <div key={act.id} className="flex items-start gap-3 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                                        <div className="mt-1.5 h-2 w-2 rounded-full bg-primary/70 shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium leading-tight text-white truncate">{act.title}</p>
                                            {act.description && (
                                                <p className="text-xs text-muted-foreground mt-0.5 truncate">{act.description}</p>
                                            )}
                                        </div>
                                        <div className="text-xs text-muted-foreground shrink-0">{act.time}</div>
                                    </div>
                                )) : (
                                    <div className="text-sm text-muted-foreground py-10 text-center">
                                        No recent activity yet.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={item} className="lg:col-span-3">
                    <Card className="h-full bg-black/40 border-white/10 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Quick actions</CardTitle>
                            <CardDescription>Jump straight into your workflow</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-2">
                            {QUICK_ACTIONS.map((action) => (
                                <Button
                                    key={action.href}
                                    asChild
                                    variant="ghost"
                                    className="w-full h-auto justify-start py-2.5 px-3 hover:bg-white/5"
                                >
                                    <Link href={action.href} className="flex items-center gap-3">
                                        <div className={`p-1.5 rounded-md bg-white/5 ${action.color}`}>
                                            <action.icon className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 min-w-0 text-left">
                                            <p className="text-sm font-medium text-white leading-tight">{action.label}</p>
                                            <p className="text-xs text-muted-foreground truncate">{action.description}</p>
                                        </div>
                                    </Link>
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    )
}
