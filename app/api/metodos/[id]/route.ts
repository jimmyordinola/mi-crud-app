// app/api/metodos/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// Obtener un método por ID (GET /api/metodos/[id])
export async function GET(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  const { id } = context.params; // Acceso directo a `params`
  try {
    const metodo = await prisma.metodo.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        categoria: true, // Incluye los datos de la categoría relacionada
      },
    });
    if (metodo) {
      return NextResponse.json(metodo);
    } else {
      return NextResponse.json({ error: 'Método no encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error obteniendo el método:', error);
    return NextResponse.json({ error: 'Error obteniendo el método' }, { status: 500 });
  }
}

// Actualizar un método por ID (PUT /api/metodos/[id])
export async function PUT(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  const { id } = context.params; // Acceso directo a `params`
  try {
    const { codigo, metodo, idCategoria } = await request.json();
    const updatedMetodo = await prisma.metodo.update({
      where: { id: parseInt(id, 10) },
      data: {
        codigo,
        metodo,
        idCategoria,
      },
    });
    return NextResponse.json(updatedMetodo);
  } catch (error) {
    console.error('Error actualizando el método:', error);
    return NextResponse.json({ error: 'Error actualizando el método' }, { status: 500 });
  }
}

// Eliminar un método por ID (DELETE /api/metodos/[id])
export async function DELETE(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  const { id } = context.params; // Acceso directo a `params`
  try {
    await prisma.metodo.delete({
      where: { id: parseInt(id, 10) },
    });
    return NextResponse.json({ message: 'Método eliminado' }, { status: 200 });
  } catch (error) {
    console.error('Error eliminando el método:', error);
    return NextResponse.json({ error: 'Error eliminando el método' }, { status: 500 });
  }
}
