// app/api/categorias/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// Obtener una categoría por ID (GET /api/categorias/[id])
export async function GET(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  const { id } = context.params;
  try {
    const categoria = await prisma.categoria.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (categoria) {
      return NextResponse.json(categoria);
    } else {
      return NextResponse.json({ error: 'Categoría no encontrada' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error obteniendo la categoría:', error);
    return NextResponse.json({ error: 'Error obteniendo la categoría' }, { status: 500 });
  }
}

// Actualizar una categoría por ID (PUT /api/categorias/[id])
export async function PUT(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  const { id } = context.params;
  try {
    const { categoria } = await request.json();
    const updatedCategoria = await prisma.categoria.update({
      where: { id: parseInt(id, 10) },
      data: { categoria },
    });
    return NextResponse.json(updatedCategoria);
  } catch (error) {
    console.error('Error actualizando la categoría:', error);
    return NextResponse.json({ error: 'Error actualizando la categoría' }, { status: 500 });
  }
}

// Eliminar una categoría por ID (DELETE /api/categorias/[id])
export async function DELETE(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  const { id } = context.params;
  try {
    await prisma.categoria.delete({
      where: { id: parseInt(id, 10) },
    });
    return NextResponse.json({ message: 'Categoría eliminada' }, { status: 200 });
  } catch (error) {
    console.error('Error eliminando la categoría:', error);
    return NextResponse.json({ error: 'Error eliminando la categoría' }, { status: 500 });
  }
}
