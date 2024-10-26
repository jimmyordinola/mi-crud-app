// app/api/detalles/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// Obtener un detalle por ID (GET /api/detalles/[id])
export async function GET(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  const { id } = context.params; // Acceso directo a `params` sin conversión a promesa
  try {
    const detalle = await prisma.detalle.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        cabecera: true,
        categoria: true,
        metodo: true,
        modulo: true,
        documento: true,
      },
    });
    if (detalle) {
      return NextResponse.json(detalle);
    } else {
      return NextResponse.json(
        { error: 'Detalle no encontrado' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error obteniendo el detalle:', error);
    return NextResponse.json(
      { error: 'Error obteniendo el detalle' },
      { status: 500 }
    );
  }
}

// Actualizar un detalle por ID (PUT /api/detalles/[id])
export async function PUT(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  const { id } = context.params; // Acceso directo a `params` sin conversión a promesa
  try {
    const {
      idCabecera,
      idCategoria,
      idMetodo,
      idModulo,
      idDocumento,
      esquema1,
      esquema2,
      esquema3,
      esquema4,
      esquema5,
      esquema6,
      es,
      flujo,
      avance,
      observacion,
      observado,
    } = await request.json();

    const updatedDetalle = await prisma.detalle.update({
      where: { id: parseInt(id, 10) },
      data: {
        idCabecera,
        idCategoria,
        idMetodo,
        idModulo,
        idDocumento,
        esquema1,
        esquema2,
        esquema3,
        esquema4,
        esquema5,
        esquema6,
        es,
        flujo,
        avance,
        observacion,
        observado,
      },
    });
    return NextResponse.json(updatedDetalle);
  } catch (error) {
    console.error('Error actualizando el detalle:', error);
    return NextResponse.json(
      { error: 'Error actualizando el detalle' },
      { status: 500 }
    );
  }
}

// Eliminar un detalle por ID (DELETE /api/detalles/[id])
export async function DELETE(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  const { id } = context.params; // Acceso directo a `params` sin conversión a promesa
  try {
    await prisma.detalle.delete({
      where: { id: parseInt(id, 10) },
    });
    return NextResponse.json({ message: 'Detalle eliminado' }, { status: 200 });
  } catch (error) {
    console.error('Error eliminando el detalle:', error);
    return NextResponse.json(
      { error: 'Error eliminando el detalle' },
      { status: 500 }
    );
  }
}
