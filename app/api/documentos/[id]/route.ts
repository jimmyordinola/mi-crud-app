// app/api/documentos/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// Obtener un documento por ID (GET /api/documentos/[id])
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const documento = await prisma.documento.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        modulo: true, // Incluimos los datos del módulo relacionado
      },
    });
    if (documento) {
      return NextResponse.json(documento);
    } else {
      return NextResponse.json({ error: 'Documento no encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error obteniendo el documento:', error);
    return NextResponse.json({ error: 'Error obteniendo el documento' }, { status: 500 });
  }
}

// Actualizar un documento por ID (PUT /api/documentos/[id])
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const { documento, idModulo } = await request.json();
    const updatedDocumento = await prisma.documento.update({
      where: { id: parseInt(id, 10) },
      data: {
        documento,
        idModulo,
      },
    });
    return NextResponse.json(updatedDocumento);
  } catch (error) {
    console.error('Error actualizando el documento:', error);
    return NextResponse.json({ error: 'Error actualizando el documento' }, { status: 500 });
  }
}

// Eliminar un documento por ID (DELETE /api/documentos/[id])
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await prisma.documento.delete({
      where: { id: parseInt(id, 10) },
    });
    return NextResponse.json({ message: 'Documento eliminado' }, { status: 200 });
  } catch (error) {
    console.error('Error eliminando el documento:', error);
    return NextResponse.json({ error: 'Error eliminando el documento' }, { status: 500 });
  }
}
