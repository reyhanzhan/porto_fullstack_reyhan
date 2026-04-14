import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FolderKanban,
  Mail,
  Eye,
  FileText,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Activity,
  LayoutDashboard,
} from "lucide-react";
import { AdminChart } from "@/components/admin/dashboard-chart";
import Link from "next/link";

async function getDashboardData() {
  const [projectCount, messageCount, pageViewCount, recentLogs] =
    await Promise.all([
      db.project.count(),
      db.contactMessage.count(),
      db.pageView.count(),
      db.auditLog.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true, email: true } } },
      }),
    ]);

  const newMessages = await db.contactMessage.count({
    where: { status: "NEW" },
  });

  const publishedProjects = await db.project.count({
    where: { published: true },
  });

  // Page views per day (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentViews = await db.pageView.findMany({
    where: { createdAt: { gte: sevenDaysAgo } },
    select: { createdAt: true },
  });

  // Group by date
  const viewsByDay: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = date.toISOString().split("T")[0];
    viewsByDay[key] = 0;
  }
  recentViews.forEach((v: { createdAt: Date }) => {
    const key = v.createdAt.toISOString().split("T")[0];
    if (viewsByDay[key] !== undefined) viewsByDay[key]++;
  });

  const chartData = Object.entries(viewsByDay).map(([date, views]) => ({
    date: new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    views,
  }));

  return {
    projectCount,
    publishedProjects,
    messageCount,
    newMessages,
    pageViewCount,
    recentLogs,
    chartData,
  };
}

const actionColors: Record<string, string> = {
  CREATE: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  UPDATE: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  DELETE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  LOGIN: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  LOGOUT: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
};

export default async function AdminDashboard() {
  const data = await getDashboardData();

  const kpis = [
    {
      label: "Total Projects",
      value: data.projectCount,
      icon: FolderKanban,
      sub: `${data.publishedProjects} published`,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      href: "/admin/projects",
    },
    {
      label: "Messages",
      value: data.messageCount,
      icon: Mail,
      sub: data.newMessages > 0 ? `${data.newMessages} unread` : "All read",
      highlight: data.newMessages > 0,
      color: "from-violet-500 to-violet-600",
      bgColor: "bg-violet-50 dark:bg-violet-900/20",
      iconColor: "text-violet-600 dark:text-violet-400",
      href: "/admin/messages",
    },
    {
      label: "Page Views",
      value: data.pageViewCount,
      icon: Eye,
      sub: "All time",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      href: "/admin",
    },
    {
      label: "Audit Entries",
      value: data.recentLogs.length,
      icon: Activity,
      sub: "Recent actions",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      iconColor: "text-amber-600 dark:text-amber-400",
      href: "/admin/audit-logs",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 dark:from-zinc-100 dark:to-zinc-300">
            <LayoutDashboard className="h-5 w-5 text-white dark:text-zinc-900" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-sm text-zinc-500">
              Overview of your portfolio system performance
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger-children">
        {kpis.map((kpi) => (
          <Link key={kpi.label} href={kpi.href}>
            <Card className="group relative overflow-hidden transition-all hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer">
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${kpi.color}`} />
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${kpi.bgColor}`}>
                    <kpi.icon className={`h-5 w-5 ${kpi.iconColor}`} />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-zinc-300 group-hover:text-zinc-500 dark:text-zinc-700 dark:group-hover:text-zinc-400 transition-colors" />
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight">{kpi.value}</p>
                <div className="mt-1 flex items-center gap-2">
                  <p className="text-xs text-zinc-500">
                    {kpi.highlight ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 text-amber-700 dark:text-amber-400 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                        {kpi.sub}
                      </span>
                    ) : (
                      kpi.sub
                    )}
                  </p>
                </div>
                <p className="mt-2 text-[11px] font-medium text-zinc-400">{kpi.label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-zinc-400" />
                <h2 className="text-base font-semibold">Page Views</h2>
                <Badge variant="secondary" className="text-[10px]">
                  7 days
                </Badge>
              </div>
            </div>
            <AdminChart data={data.chartData} />
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-zinc-400" />
                <h2 className="text-base font-semibold">Recent Activity</h2>
              </div>
              <Link
                href="/admin/audit-logs"
                className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                View all
              </Link>
            </div>
            {data.recentLogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Activity className="h-8 w-8 text-zinc-200 dark:text-zinc-800 mb-2" />
                <p className="text-sm text-zinc-400">No activity yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {data.recentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-3 rounded-lg p-2 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                  >
                    <div className={`mt-0.5 shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase ${actionColors[log.action] || actionColors.LOGOUT}`}>
                      {log.action}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium truncate">
                        {log.entity}
                        {log.entityId && (
                          <span className="text-zinc-400 ml-1">
                            #{log.entityId.slice(0, 8)}
                          </span>
                        )}
                      </p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">
                        {log.user?.name || "System"} &middot;{" "}
                        {log.createdAt.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
