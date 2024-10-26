// app/api/documentos/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// Obtener todos los documentos (GET /api/documentos)
export async function GET() {
  try {
    const documentos = await prisma.documento.findMany({
      include: {
        modulo: true, // Incluimos los datos del módulo relacionado
      },
    });
    return NextResponse.json(documentos);
  } catch (error) {
    console.error('Error obteniendo los documentos:', error);
    return NextResponse.json({ error: 'Error obteniendo los documentos' }, { status: 500 });
  }
}

// Crear un nuevo documento (POST /api/documentos)
export async function POST(request: NextRequest) {
  try {
    const { documento, idModulo } = await request.json();
    const newDocumento = await prisma.documento.create({
      data: {
        documento,
        idModulo,
      },
    });
    return NextResponse.json(newDocumento, { status: 201 });
  } catch (error) {
    console.error('Error creando el documento:', error);
    return NextResponse.json({ error: 'Error creando el documento' }, { status: 500 });
  }
}
