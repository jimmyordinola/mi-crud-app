// app/categorias/nuevo/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NuevaCategoria() {
  const [categoriaName, setCategoriaName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/categorias', {
      method: 'POST',
      body: JSON.stringify({ categoria: categoriaName }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push('/categorias');
  };

  return (
    <div>
      <h1>Crear Nueva Categoría</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={categoriaName}
          onChange={(e) => setCategoriaName(e.target.value)}
          placeholder="Nombre de la Categoría"
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
