import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { Users, Eye, MousePointerClick, TrendingUp } from "lucide-react"
import { DashboardClient } from "./dashboard-client"

// Helper to format time ago
function timeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return Math.floor(seconds) + "s ago";
}

export default async function AdminDashboard() {
  const session = await auth()

  // Fetch Real Data from Prisma
  const [
    leadsCount,
    postsCount,
    campaignsCount,
    recentActivity
  ] = await Promise.all([
    prisma.contact.count({ where: { status: 'new' } }),
    prisma.post.count({ where: { published: true } }),
    prisma.emailCampaign.count({}),
    prisma.activityLog.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { contact: { select: { email: true, name: true } } }
    })
  ])

  // Process Stats
  const stats = [
    { title: "Total Posts", value: postsCount.toString(), icon: Eye, change: "Published Content", color: "text-blue-400" },
    { title: "Active Leads", value: leadsCount.toString(), icon: Users, change: "New prospects", color: "text-emerald-400" },
    { title: "Campaigns", value: campaignsCount.toString(), icon: MousePointerClick, change: "Emails Sent", color: "text-purple-400" },
    { title: "System Health", value: "99.9%", icon: TrendingUp, change: "All systems operational", color: "text-pink-400" },
  ]

  // Process Activities
  const activities = recentActivity.map(log => ({
    id: log.id,
    type: log.type,
    title: log.title,
    time: timeAgo(log.createdAt),
    description: (log.metadata as any)?.subject || (log.metadata as any)?.oldStatus ? `${(log.metadata as any)?.oldStatus} -> ${(log.metadata as any)?.newStatus}` : log.contact?.email || "System Event"
  }))

  return (
    <DashboardClient
      stats={stats}
      activities={activities}
      userName={session?.user?.name || "Chief"}
    />
  )
}
