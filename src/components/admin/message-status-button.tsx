"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { updateMessageStatus } from "@/app/admin/actions";

interface Props {
  messageId: string;
  currentStatus: string;
}

const nextStatus: Record<string, "READ" | "REPLIED" | "ARCHIVED"> = {
  NEW: "READ",
  READ: "REPLIED",
  REPLIED: "ARCHIVED",
};

const nextLabel: Record<string, string> = {
  NEW: "Mark Read",
  READ: "Mark Replied",
  REPLIED: "Archive",
};

export function MessageStatusButton({ messageId, currentStatus }: Props) {
  const [isPending, startTransition] = useTransition();
  const next = nextStatus[currentStatus];
  const label = nextLabel[currentStatus];

  if (!next) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await updateMessageStatus(messageId, next);
        });
      }}
    >
      {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : label}
    </Button>
  );
}
