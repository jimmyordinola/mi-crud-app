// app/api/sprints/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// Obtener todos los sprints (GET /api/sprints)
export async function GET(request: NextRequest) {
  try {console.log('hola');
    const sprints = await prisma.sprint.findMany();
    return NextResponse.json(sprints);
  } catch (error) {
    console.error('Error obteniendo los sprints:', error);
    return NextResponse.json({ error: 'Error obteniendo los sprints' }, { status: 500 });
  }
}

// Crear un nuevo sprint (POST /api/sprints)
export async function POST(request: NextRequest) {
  try {
    const { sprint } = await request.json();
    const newSprint = await prisma.sprint.create({
      data: { sprint },
    });
    return NextResponse.json(newSprint, { status: 201 });
  } catch (error) {
    console.error('Error creando el sprint:', error);
    return NextResponse.json({ error: 'Error creando el sprint' }, { status: 500 });
  }
}
