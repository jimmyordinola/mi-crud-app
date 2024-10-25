// app/api/metodos/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// Obtener todos los métodos (GET /api/metodos)
export async function GET(request: NextRequest) {
  try {
    const metodos = await prisma.metodo.findMany({
      include: {
        categoria: true, // Incluimos los datos de la categoría relacionada
      },
    });
    return NextResponse.json(metodos);
  } catch (error) {
    console.error('Error obteniendo los métodos:', error);
    return NextResponse.json({ error: 'Error obteniendo los métodos' }, { status: 500 });
  }
}

// Crear un nuevo método (POST /api/metodos)
export async function POST(request: NextRequest) {
  try {
    const { codigo, metodo, idCategoria } = await request.json();
    const newMetodo = await prisma.metodo.create({
      data: {
        codigo,
        metodo,
        idCategoria,
      },
    });
    return NextResponse.json(newMetodo, { status: 201 });
  } catch (error) {
    console.error('Error creando el método:', error);
    return NextResponse.json({ error: 'Error creando el método' }, { status: 500 });
  }
}
