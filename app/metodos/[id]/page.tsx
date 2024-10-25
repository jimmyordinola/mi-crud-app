// app/metodos/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

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

interface Categoria {
  id: number;
  categoria: string;
}

export default function MetodoDetail() {
  const [metodo, setMetodo] = useState<Metodo | null>(null);
  const [codigo, setCodigo] = useState('');
  const [metodoName, setMetodoName] = useState('');
  const [idCategoria, setIdCategoria] = useState<number | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    fetch(`/api/metodos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMetodo(data);
        setCodigo(data.codigo);
        setMetodoName(data.metodo);
        setIdCategoria(data.idCategoria);
      });
    fetch('/api/categorias')
      .then((res) => res.json())
      .then((data) => setCategorias(data));
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idCategoria) {
      alert('Por favor, selecciona una categoría.');
      return;
    }
    await fetch(`/api/metodos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ codigo, metodo: metodoName, idCategoria }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push('/metodos');
  };

  const handleDelete = async () => {
    await fetch(`/api/metodos/${id}`, {
      method: 'DELETE',
    });
    router.push('/metodos');
  };

  if (!metodo) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Detalle del Método</h1>
      <form onSubmit={handleUpdate}>
        <label>
          Código:
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
        </label>
        <label>
          Nombre del Método:
          <input
            type="text"
            value={metodoName}
            onChange={(e) => setMetodoName(e.target.value)}
          />
        </label>
        <label>
          Categoría:
          <select
            value={idCategoria ?? ''}
            onChange={(e) => setIdCategoria(Number(e.target.value))}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.categoria}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Actualizar</button>
      </form>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
}
