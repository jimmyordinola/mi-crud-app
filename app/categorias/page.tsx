// app/categorias/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Categoria {
  id: number;
  categoria: string;
}

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    fetch('/api/categorias')
      .then((res) => res.json())
      .then((data) => setCategorias(data));
  }, []);

  return (
    <div>
      <h1>Lista de Categorías</h1>
      <Link href="/categorias/nuevo">Crear Nueva Categoría</Link>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            <Link href={`/categorias/${categoria.id}`}>{categoria.categoria}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
