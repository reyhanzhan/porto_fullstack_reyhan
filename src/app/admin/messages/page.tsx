import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { MessageStatusButton } from "@/components/admin/message-status-button";
import { Mail, Inbox, Building2, User, Calendar } from "lucide-react";

async function getMessages() {
  return db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
}

const statusConfig: Record<
  string,
  { variant: "success" | "secondary" | "warning" | "destructive"; dot: string }
> = {
  NEW: { variant: "warning", dot: "bg-amber-500" },
  READ: { variant: "secondary", dot: "bg-zinc-400" },
  REPLIED: { variant: "success", dot: "bg-emerald-500" },
  ARCHIVED: { variant: "secondary", dot: "bg-zinc-300" },
};

export default async function AdminMessagesPage() {
  const messages = await getMessages();
  const newCount = messages.filter((m) => m.status === "NEW").length;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-600">
            <Mail className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
            <p className="text-sm text-zinc-500">
              {messages.length} total &middot;{" "}
              {newCount > 0 ? (
                <span className="text-amber-600 dark:text-amber-400 font-medium">
                  {newCount} unread
                </span>
              ) : (
                "All read"
              )}
            </p>
          </div>
        </div>
      </div>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-4">
              <Inbox className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No messages yet</h3>
            <p className="text-sm text-zinc-500">
              Messages from the contact form will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3 stagger-children">
          {messages.map((msg) => {
            const config = statusConfig[msg.status] || statusConfig.NEW;
            return (
              <Card
                key={msg.id}
                className="group overflow-hidden transition-all hover:shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      {/* Subject + Status */}
                      <div className="flex items-center gap-2.5 mb-2">
                        <h3 className="font-semibold text-sm truncate">
                          {msg.subject}
                        </h3>
                        <Badge variant={config.variant} className="gap-1 shrink-0">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${config.dot} ${msg.status === "NEW" ? "animate-pulse" : ""}`}
                          />
                          {msg.status}
                        </Badge>
                      </div>

                      {/* Sender Info */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                          <User className="h-3 w-3" />
                          {msg.name}
                        </span>
                        <span className="text-xs text-zinc-400">
                          &lt;{msg.email}&gt;
                        </span>
                        {msg.company && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                            <Building2 className="h-3 w-3" />
                            {msg.company}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400">
                          <Calendar className="h-3 w-3" />
                          {formatDate(msg.createdAt)}
                        </span>
                      </div>

                      {/* Message Preview */}
                      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-900/50 p-3">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                          {msg.message}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 pt-1">
                      <MessageStatusButton
                        messageId={msg.id}
                        currentStatus={msg.status}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
