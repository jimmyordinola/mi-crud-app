// app/metodos/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Metodo {
  id: number;
  codigo: string;
  metodo: string;
  idCategoria: number;
  categoria: {
    id: number;
    categoria: string;
  };
}

export default function MetodosPage() {
  const [metodos, setMetodos] = useState<Metodo[]>([]);

  useEffect(() => {
    fetch('/api/metodos')
      .then((res) => res.json())
      .then((data) => setMetodos(data));
  }, []);

  return (
    <div>
      <h1>Lista de Métodos</h1>
      <Link href="/metodos/nuevo">Crear Nuevo Método</Link>
      <ul>
        {metodos.map((metodo) => (
          <li key={metodo.id}>
            <Link href={`/metodos/${metodo.id}`}>
              {metodo.codigo} - {metodo.metodo} (Categoría: {metodo.categoria.categoria})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
