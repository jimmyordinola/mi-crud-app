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
      esquema1 = 0,
      esquema2 = 0,
      esquema3 = 0,
      esquema4 = 0,
      esquema5 = 0,
      esquema6 = 0,
      es = 0,
      flujo = 0,
      avance = 0,
      observacion = '',
      observado = false,
    } = await request.json();

    // Validación de campos requeridos
    if (
      idCabecera === undefined ||
      idCategoria === undefined ||
      idMetodo === undefined ||
      idModulo === undefined ||
      idDocumento === undefined
    ) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

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
