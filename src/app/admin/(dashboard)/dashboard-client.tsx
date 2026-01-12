"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, Eye, MousePointerClick, TrendingUp, Plus, Mail, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

interface StatData {
    title: string;
    value: string;
    icon: any;
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
    stats: StatData[];
    activities: ActivityItem[];
    userName?: string;
}

export function DashboardClient({ stats, activities, userName = "Chief" }: DashboardClientProps) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        Welcome back, {userName}
                    </h2>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Your digital empire is running smoothly. Here's what's happening today.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button asChild className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:scale-105">
                        <Link href="/admin/blog/new">
                            <Plus className="mr-2 h-4 w-4" /> New Post
                        </Link>
                    </Button>
                </div>
            </motion.div>

            <motion.div variants={item} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                ))}
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <motion.div variants={item} className="col-span-4">
                    <Card className="h-full bg-black/40 border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Real-time updates from your platform</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {activities.length > 0 ? activities.map((act) => (
                                    <div key={act.id} className="flex items-center">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none text-white">{act.title}</p>
                                            <p className="text-sm text-muted-foreground">{act.description}</p>
                                        </div>
                                        <div className="ml-auto font-medium text-xs text-muted-foreground">{act.time}</div>
                                    </div>
                                )) : (
                                    <div className="text-sm text-muted-foreground py-8 text-center">No recent activity</div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={item} className="col-span-3">
                    <Card className="h-full bg-gradient-to-br from-purple-900/10 to-blue-900/10 border-white/10 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Fast track your workflow</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <Button variant="outline" className="w-full justify-start h-12 text-lg font-light hover:bg-white/5 hover:text-primary hover:border-primary/50 transition-all group" asChild>
                                <Link href="/admin/emails">
                                    <div className="p-2 rounded-full bg-primary/10 mr-3 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    Send Proposal
                                </Link>
                            </Button>
                            <Button variant="outline" className="w-full justify-start h-12 text-lg font-light hover:bg-white/5 hover:text-purple-400 hover:border-purple-500/50 transition-all group" asChild>
                                <Link href="/admin/blog/new">
                                    <div className="p-2 rounded-full bg-purple-500/10 mr-3 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                        <FileText className="h-4 w-4" />
                                    </div>
                                    Write Article
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    )
}

function StatCard({ title, value, icon: Icon, change, color }: any) {
    return (
        <Card className="bg-black/40 border-white/10 backdrop-blur-sm hover:translate-y-[-4px] transition-transform duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                    {change}
                </p>
            </CardContent>
        </Card>
    )
}
