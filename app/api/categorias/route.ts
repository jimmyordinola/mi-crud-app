// app/api/categorias/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// Obtener todas las categorías (GET /api/categorias)
export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany();
    return NextResponse.json(categorias);
  } catch (error) {
    console.error('Error obteniendo las categorías:', error);
    return NextResponse.json({ error: 'Error obteniendo las categorías' }, { status: 500 });
  }
}

// Crear una nueva categoría (POST /api/categorias)
export async function POST(request: NextRequest) {
  try {
    const { categoria } = await request.json();
    const newCategoria = await prisma.categoria.create({
      data: { categoria },
    });
    return NextResponse.json(newCategoria, { status: 201 });
  } catch (error) {
    console.error('Error creando la categoría:', error);
    return NextResponse.json({ error: 'Error creando la categoría' }, { status: 500 });
  }
}
