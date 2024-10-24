// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: 'Error obteniendo los posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { title, content } = await request.json();
  try {
    const post = await prisma.post.create({
      data: { title, content },
    });
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error creando el post' }, { status: 500 });
  }
}
