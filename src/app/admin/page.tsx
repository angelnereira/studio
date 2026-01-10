
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Eye, MousePointerClick, TrendingUp } from "lucide-react"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AdminDashboard() {
  const session = await auth()

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome back, Chief. Here is your system status.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Visits" value="12,345" icon={Eye} change="+12% from last month" />
        <StatCard title="Active Leads" value="14" icon={Users} change="+3 new today" />
        <StatCard title="Click Rate" value="4.3%" icon={MousePointerClick} change="+1.2%" />
        <StatCard title="System Health" value="99.9%" icon={TrendingUp} change="All systems operational" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-black/40 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Activity log integration coming soon...</p>
              {/* Placeholder for activity timeline */}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-black/40 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quick action buttons will go here */}
            <div className="text-sm text-muted-foreground">Shortcuts to create post, send email, etc.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, change }: any) {
  return (
    <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {change}
        </p>
      </CardContent>
    </Card>
  )
}
