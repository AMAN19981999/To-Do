


import { db } from "@/db/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
    const taskId = Number(context.params.id);
  
    if (isNaN(taskId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
  
    const body = await req.json();
    const updated = await db
      .update(tasks)
      .set({ ...body })
      .where(eq(tasks.id, taskId))
      .returning();
  
    return NextResponse.json(updated[0]);
  }

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params; 
  
    const taskId = Number(id);
    if (isNaN(taskId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
  
    await db.delete(tasks).where(eq(tasks.id, taskId));
    return NextResponse.json({ message: "Deleted" });
  }