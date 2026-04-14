import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Shield } from "lucide-react";

async function getAuditLogs() {
  return db.auditLog.findMany({
    take: 50,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
  });
}

const actionConfig: Record<
  string,
  { variant: "success" | "secondary" | "destructive" | "warning"; bg: string }
> = {
  CREATE: {
    variant: "success",
    bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  UPDATE: {
    variant: "warning",
    bg: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  DELETE: {
    variant: "destructive",
    bg: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  LOGIN: {
    variant: "secondary",
    bg: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  LOGOUT: {
    variant: "secondary",
    bg: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
  },
};

export default async function AuditLogsPage() {
  const logs = await getAuditLogs();

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Audit Logs</h1>
            <p className="text-sm text-zinc-500">
              Complete record of all system actions for compliance and
              observability
            </p>
          </div>
        </div>
      </div>

      {logs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-4">
              <FileText className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No audit logs</h3>
            <p className="text-sm text-zinc-500">
              System actions will be recorded here automatically.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="text-left px-5 py-3.5 font-medium text-zinc-500 text-xs uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="text-left px-5 py-3.5 font-medium text-zinc-500 text-xs uppercase tracking-wider">
                    User
                  </th>
                  <th className="text-left px-5 py-3.5 font-medium text-zinc-500 text-xs uppercase tracking-wider">
                    Action
                  </th>
                  <th className="text-left px-5 py-3.5 font-medium text-zinc-500 text-xs uppercase tracking-wider">
                    Entity
                  </th>
                  <th className="text-left px-5 py-3.5 font-medium text-zinc-500 text-xs uppercase tracking-wider hidden lg:table-cell">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                {logs.map((log) => {
                  const config = actionConfig[log.action] || actionConfig.LOGOUT;
                  return (
                    <tr
                      key={log.id}
                      className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
                    >
                      <td className="px-5 py-3.5 text-xs text-zinc-500 font-mono whitespace-nowrap">
                        {log.createdAt.toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-500 shrink-0">
                            {(
                              log.user?.name?.[0] ||
                              log.user?.email?.[0] ||
                              "S"
                            ).toUpperCase()}
                          </div>
                          <span className="text-xs font-medium">
                            {log.user?.name || log.user?.email || "System"}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${config.bg}`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs">
                        <span className="font-medium">{log.entity}</span>
                        {log.entityId && (
                          <span className="text-zinc-400 ml-1 font-mono">
                            #{log.entityId.slice(0, 8)}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-zinc-500 hidden lg:table-cell max-w-xs">
                        {log.metadata ? (
                          <code className="font-mono text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded break-all">
                            {JSON.stringify(log.metadata).slice(0, 80)}
                            {JSON.stringify(log.metadata).length > 80 && "…"}
                          </code>
                        ) : (
                          <span className="text-zinc-300 dark:text-zinc-700">
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
