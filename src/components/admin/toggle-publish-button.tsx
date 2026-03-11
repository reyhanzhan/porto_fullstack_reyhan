"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toggleProjectPublish } from "@/app/admin/actions";

interface Props {
  projectId: string;
  published: boolean;
}

export function TogglePublishButton({ projectId, published }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      size="icon"
      title={published ? "Unpublish" : "Publish"}
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProjectPublish(projectId, !published);
        });
      }}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : published ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </Button>
  );
}
