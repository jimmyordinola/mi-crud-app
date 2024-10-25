// app/modulos/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Modulo {
  id: number;
  modulo: string;
}

export default function ModuloDetail() {
  const [modulo, setModulo] = useState<Modulo | null>(null);
  const [moduloName, setModuloName] = useState('');
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    fetch(`/api/modulos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setModulo(data);
        setModuloName(data.modulo);
      });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/modulos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ modulo: moduloName }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push('/modulos');
  };

  const handleDelete = async () => {
    await fetch(`/api/modulos/${id}`, {
      method: 'DELETE',
    });
    router.push('/modulos');
  };

  if (!modulo) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Detalle del Módulo</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={moduloName}
          onChange={(e) => setModuloName(e.target.value)}
        />
        <button type="submit">Actualizar</button>
      </form>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
}
