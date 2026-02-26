import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatCardProps {
    title: string
    value: string | number
    icon: React.ElementType
    color: string
    change?: string
}

export function StatCard({ title, value, icon: Icon, color, change }: StatCardProps) {
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
                {change && (
                    <p className="text-xs text-muted-foreground mt-1">
                        {change}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
