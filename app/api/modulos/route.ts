// app/api/modulos/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// Obtener todos los módulos (GET /api/modulos)
export async function GET() {
  try {
    const modulos = await prisma.modulo.findMany();
    return NextResponse.json(modulos);
  } catch (error) {
    console.error('Error obteniendo los módulos:', error);
    return NextResponse.json({ error: 'Error obteniendo los módulos' }, { status: 500 });
  }
}

// Crear un nuevo módulo (POST /api/modulos)
export async function POST(request: NextRequest) {
  try {
    const { modulo } = await request.json();
    const newModulo = await prisma.modulo.create({
      data: { modulo },
    });
    return NextResponse.json(newModulo, { status: 201 });
  } catch (error) {
    console.error('Error creando el módulo:', error);
    return NextResponse.json({ error: 'Error creando el módulo' }, { status: 500 });
  }
}
