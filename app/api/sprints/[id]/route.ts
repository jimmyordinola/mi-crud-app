// app/api/sprints/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// Obtener un sprint por ID (GET /api/sprints/[id])
export async function GET(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  const { id } = context.params; // Acceso directo a `params`
  try {
    const sprint = await prisma.sprint.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (sprint) {
      return NextResponse.json(sprint);
    } else {
      return NextResponse.json({ error: 'Sprint no encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error obteniendo el sprint:', error);
    return NextResponse.json({ error: 'Error obteniendo el sprint' }, { status: 500 });
  }
}

// Actualizar un sprint por ID (PUT /api/sprints/[id])
export async function PUT(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  const { id } = context.params; // Acceso directo a `params`
  try {
    const { sprint } = await request.json();
    const updatedSprint = await prisma.sprint.update({
      where: { id: parseInt(id, 10) },
      data: { sprint },
    });
    return NextResponse.json(updatedSprint);
  } catch (error) {
    console.error('Error actualizando el sprint:', error);
    return NextResponse.json({ error: 'Error actualizando el sprint' }, { status: 500 });
  }
}

// Eliminar un sprint por ID (DELETE /api/sprints/[id])
export async function DELETE(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  const { id } = context.params; // Acceso directo a `params`
  try {
    await prisma.sprint.delete({
      where: { id: parseInt(id, 10) },
    });
    return NextResponse.json({ message: 'Sprint eliminado' }, { status: 200 });
  } catch (error) {
    console.error('Error eliminando el sprint:', error);
    return NextResponse.json({ error: 'Error eliminando el sprint' }, { status: 500 });
  }
}
