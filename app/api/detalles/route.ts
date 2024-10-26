// app/api/detalles/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// Obtener todos los detalles (GET /api/detalles)
export async function GET() {
  try {
    const detalles = await prisma.detalle.findMany({
      include: {
        cabecera: true,
        categoria: true,
        metodo: true,
        modulo: true,
        documento: true,
      },
    });
    return NextResponse.json(detalles);
  } catch (error) {
    console.error('Error obteniendo los detalles:', error);
    return NextResponse.json({ error: 'Error obteniendo los detalles' }, { status: 500 });
  }
}

// Crear un nuevo detalle (POST /api/detalles)
export async function POST(request: NextRequest) {
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

    const newDetalle = await prisma.detalle.create({
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
    return NextResponse.json(newDetalle, { status: 201 });
  } catch (error) {
    console.error('Error creando el detalle:', error);
    return NextResponse.json({ error: 'Error creando el detalle' }, { status: 500 });
  }
}
