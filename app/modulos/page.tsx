// app/modulos/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Modulo {
  id: number;
  modulo: string;
}

export default function ModulosPage() {
  const [modulos, setModulos] = useState<Modulo[]>([]);

  useEffect(() => {
    fetch('/api/modulos')
      .then((res) => res.json())
      .then((data) => setModulos(data));
  }, []);

  return (
    <div>
      <h1>Lista de Módulos</h1>
      <Link href="/modulos/nuevo">Crear Nuevo Módulo</Link>
      <ul>
        {modulos.map((modulo) => (
          <li key={modulo.id}>
            <Link href={`/modulos/${modulo.id}`}>{modulo.modulo}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
