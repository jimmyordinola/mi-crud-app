// app/metodos/nuevo/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Categoria {
  id: number;
  categoria: string;
}

export default function NuevoMetodo() {
  const [codigo, setCodigo] = useState('');
  const [metodoName, setMetodoName] = useState('');
  const [idCategoria, setIdCategoria] = useState<number | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/categorias')
      .then((res) => res.json())
      .then((data) => setCategorias(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idCategoria) {
      alert('Por favor, selecciona una categoría.');
      return;
    }
    await fetch('/api/metodos', {
      method: 'POST',
      body: JSON.stringify({ codigo, metodo: metodoName, idCategoria }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push('/metodos');
  };

  return (
    <div>
      <h1>Crear Nuevo Método</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Código:
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Código"
          />
        </label>
        <label>
          Nombre del Método:
          <input
            type="text"
            value={metodoName}
            onChange={(e) => setMetodoName(e.target.value)}
            placeholder="Nombre del Método"
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
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
