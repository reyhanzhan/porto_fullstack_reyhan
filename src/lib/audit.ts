import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

type AuditAction = "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT";

export async function createAuditLog(params: {
  action: AuditAction;
  entity: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}) {
  const session = await auth();
  
  await db.auditLog.create({
    data: {
      userId: session?.user?.id ?? null,
      action: params.action,
      entity: params.entity,
      entityId: params.entityId,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      metadata: (params.metadata as any) ?? undefined,
    },
  });
}
