import { db } from "@/db/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function PATCH(req: Request, { params }: Params) {
  const body = await req.json();
  const updated = await db
    .update(tasks)
    .set({ ...body })
    .where(eq(tasks.id, Number(params.id)))
    .returning();
  return NextResponse.json(updated[0]);
}

export async function DELETE(_: Request, { params }: Params) {
  await db.delete(tasks).where(eq(tasks.id, Number(params.id)));
  return NextResponse.json({ message: "Deleted" });
}
