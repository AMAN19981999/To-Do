// import { db } from '@/db/db';
// import { tasks } from '@/db/schema';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   const allTasks = await db.select().from(tasks);
//   return NextResponse.json(allTasks);
// }

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { title } = body;
//   const newTask = await db.insert(tasks).values({ title }).returning();
//   return NextResponse.json(newTask);
// }
