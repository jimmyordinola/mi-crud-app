// app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (post) {
      return NextResponse.json(post);
    } else {
      return NextResponse.json({ error: 'Post no encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error obteniendo el post:', error);
    return NextResponse.json({ error: 'Error obteniendo el post' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const { title, content } = await request.json();

  try {
    const post = await prisma.post.update({
      where: { id },
      data: { title, content },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error actualizando el post:', error);
    return NextResponse.json({ error: 'Error actualizando el post' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  try {
    await prisma.post.delete({ where: { id } });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error('Error eliminando el post:', error);
    return NextResponse.json({ error: 'Error eliminando el post' }, { status: 500 });
  }
}
