// app/api/modulos/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// Obtener un módulo por ID (GET /api/modulos/[id])
export async function GET(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  const { id } = context.params; // Acceso directo a `params`
  try {
    const modulo = await prisma.modulo.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (modulo) {
      return NextResponse.json(modulo);
    } else {
      return NextResponse.json({ error: 'Módulo no encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error obteniendo el módulo:', error);
    return NextResponse.json({ error: 'Error obteniendo el módulo' }, { status: 500 });
  }
}

// Actualizar un módulo por ID (PUT /api/modulos/[id])
export async function PUT(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  const { id } = context.params; // Acceso directo a `params`
  try {
    const { modulo } = await request.json();
    const updatedModulo = await prisma.modulo.update({
      where: { id: parseInt(id, 10) },
      data: { modulo },
    });
    return NextResponse.json(updatedModulo);
  } catch (error) {
    console.error('Error actualizando el módulo:', error);
    return NextResponse.json({ error: 'Error actualizando el módulo' }, { status: 500 });
  }
}

// Eliminar un módulo por ID (DELETE /api/modulos/[id])
export async function DELETE(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  const { id } = context.params; // Acceso directo a `params`
  try {
    await prisma.modulo.delete({
      where: { id: parseInt(id, 10) },
    });
    return NextResponse.json({ message: 'Módulo eliminado' }, { status: 200 });
  } catch (error) {
    console.error('Error eliminando el módulo:', error);
    return NextResponse.json({ error: 'Error eliminando el módulo' }, { status: 500 });
  }
}
