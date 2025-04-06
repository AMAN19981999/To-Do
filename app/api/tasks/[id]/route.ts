import { db } from "@/db/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// PATCH /api/tasks/[id]
export async function PATCH(req: Request, context: { params: { id: string } }) {
  const body = await req.json();
  const updated = await db
    .update(tasks)
    .set({ ...body })
    .where(eq(tasks.id, Number(context.params.id)))
    .returning();

  return NextResponse.json(updated[0]);
}

// DELETE /api/tasks/[id]
export async function DELETE(req: Request, context: { params: { id: string } }) {
  await db.delete(tasks).where(eq(tasks.id, Number(context.params.id)));
  return NextResponse.json({ message: "Deleted" });
}
