import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { DashboardClient } from "./dashboard-client"
import { cacheWrap } from "@/lib/cache"
import { getActiveVisitors, getDailyViews, getTotalSiteVisits } from "@/lib/analytics"

interface ActivityLogMetadata {
  subject?: string;
  oldStatus?: string;
  newStatus?: string;
}

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

  // Fetch Real Data from Prisma (cached in Redis for 2 min)
  const [dbStats, recentActivity, analyticsData] = await Promise.all([
    cacheWrap('dash:stats', 120, () =>
      Promise.all([
        prisma.contact.count({ where: { status: 'new' } }),
        prisma.post.count({ where: { published: true } }),
        prisma.emailCampaign.count({}),
        prisma.application.count({}),
        prisma.jobVacancy.count({}),
      ])
    ),
    cacheWrap('dash:activity', 60, () =>
      prisma.activityLog.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { contact: { select: { email: true, name: true } } }
      })
    ),
    Promise.all([
      getActiveVisitors(),
      getDailyViews(),
      getTotalSiteVisits(),
    ]),
  ]);

  const [leadsCount, postsCount, campaignsCount, applicationsCount, vacanciesCount] = dbStats;
  const [activeVisitors, dailyViews, totalVisits] = analyticsData;

  // Process Stats
  const stats = [
    { title: "Published Posts", value: postsCount.toString(), icon: "eye", change: "Blog content", color: "text-blue-400" },
    { title: "Active Leads", value: leadsCount.toString(), icon: "users", change: "New prospects", color: "text-emerald-400" },
    { title: "Campaigns", value: campaignsCount.toString(), icon: "mouse-pointer", change: "Emails sent", color: "text-purple-400" },
    { title: "Applications", value: applicationsCount.toString(), icon: "briefcase", change: `${vacanciesCount} vacancies tracked`, color: "text-orange-400" },
    { title: "Live Visitors", value: activeVisitors.toString(), icon: "activity", change: "Right now", color: "text-rose-400" },
    { title: "Views Today", value: dailyViews.toString(), icon: "bar-chart", change: `${totalVisits} total`, color: "text-cyan-400" },
  ]

  // Process Activities
  const activities = recentActivity.map(log => ({
    id: log.id,
    type: log.type,
    title: log.title,
    time: timeAgo(log.createdAt),
    description: (() => {
      const meta = log.metadata as unknown as ActivityLogMetadata | null;
      if (meta?.subject) return meta.subject;
      if (meta?.oldStatus) return `${meta.oldStatus} -> ${meta.newStatus}`;
      return log.contact?.email || "System Event";
    })()
  }))

  return (
    <DashboardClient
      stats={stats}
      activities={activities}
      userName={session?.user?.name || "Chief"}
    />
  )
}
