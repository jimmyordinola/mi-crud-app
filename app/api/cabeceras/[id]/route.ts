// app/api/cabeceras/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';
import type { RequestContext } from 'next/dist/server/web/spec-extension/request-context';

// Obtener una cabecera por ID (GET /api/cabeceras/[id])
export async function GET(
  _request: NextRequest,
  context: RequestContext // Cambiado el tipo de argumento aquí
) {
  const { id } = context.params as { id: string }; // Convertimos 'context.params' con un tipo seguro
  try {
    const cabecera = await prisma.cabecera.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        sprint: true,
        detalles: {
          include: {
            categoria: true,
            metodo: true,
            modulo: true,
            documento: true,
          },
        },
      },
    });
    if (cabecera) {
      return NextResponse.json(cabecera);
    } else {
      return NextResponse.json(
        { error: 'Cabecera no encontrada' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error obteniendo la cabecera:', error);
    return NextResponse.json(
      { error: 'Error obteniendo la cabecera' },
      { status: 500 }
    );
  }
}

// Actualizar una cabecera por ID (PUT /api/cabeceras/[id])
export async function PUT(
  _request: NextRequest,
  context: RequestContext // Cambiado el tipo de argumento aquí
) {
  const { id } = context.params as { id: string }; // Convertimos 'context.params' con un tipo seguro
  try {
    const { idSprint, fecha, observacion, sgcan } = await _request.json();
    const updatedCabecera = await prisma.cabecera.update({
      where: { id: parseInt(id, 10) },
      data: {
        idSprint,
        fecha: new Date(fecha),
        observacion,
        sgcan,
      },
    });
    return NextResponse.json(updatedCabecera);
  } catch (error) {
    console.error('Error actualizando la cabecera:', error);
    return NextResponse.json(
      { error: 'Error actualizando la cabecera' },
      { status: 500 }
    );
  }
}

// Eliminar una cabecera por ID (DELETE /api/cabeceras/[id])
export async function DELETE(
  _request: NextRequest,
  context: RequestContext // Cambiado el tipo de argumento aquí
) {
  const { id } = context.params as { id: string }; // Convertimos 'context.params' con un tipo seguro
  try {
    await prisma.cabecera.delete({
      where: { id: parseInt(id, 10) },
    });
    return NextResponse.json({ message: 'Cabecera eliminada' }, { status: 200 });
  } catch (error) {
    console.error('Error eliminando la cabecera:', error);
    return NextResponse.json(
      { error: 'Error eliminando la cabecera' },
      { status: 500 }
    );
  }
}
