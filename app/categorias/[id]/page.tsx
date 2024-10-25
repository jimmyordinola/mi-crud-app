// app/categorias/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Categoria {
  id: number;
  categoria: string;
}

export default function CategoriaDetail() {
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [categoriaName, setCategoriaName] = useState('');
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    fetch(`/api/categorias/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoria(data);
        setCategoriaName(data.categoria);
      });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/categorias/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ categoria: categoriaName }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push('/categorias');
  };

  const handleDelete = async () => {
    await fetch(`/api/categorias/${id}`, {
      method: 'DELETE',
    });
    router.push('/categorias');
  };

  if (!categoria) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Detalle de la Categoría</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={categoriaName}
          onChange={(e) => setCategoriaName(e.target.value)}
        />
        <button type="submit">Actualizar</button>
      </form>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
}
