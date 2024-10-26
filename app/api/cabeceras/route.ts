// app/api/cabeceras/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// Obtener todas las cabeceras (GET /api/cabeceras)
export async function GET(_request: NextRequest) {
  try {
    const cabeceras = await prisma.cabecera.findMany({
      include: {
        sprint: true,
      },
    });
    return NextResponse.json(cabeceras);
  } catch (error) {
    console.error('Error obteniendo las cabeceras:', error);
    return NextResponse.json({ error: 'Error obteniendo las cabeceras' }, { status: 500 });
  }
}

// Crear una nueva cabecera (POST /api/cabeceras)
export async function POST(_request: NextRequest) {
  try {
    const { idSprint, fecha, observacion, sgcan } = await _request.json();
    const newCabecera = await prisma.cabecera.create({
      data: {
        idSprint,
        fecha: new Date(fecha),
        observacion,
        sgcan,
      },
    });
    return NextResponse.json(newCabecera, { status: 201 });
  } catch (error) {
    console.error('Error creando la cabecera:', error);
    return NextResponse.json({ error: 'Error creando la cabecera' }, { status: 500 });
  }
}
