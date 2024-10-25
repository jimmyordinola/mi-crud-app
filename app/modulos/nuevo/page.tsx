// app/modulos/nuevo/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NuevoModulo() {
  const [moduloName, setModuloName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/modulos', {
      method: 'POST',
      body: JSON.stringify({ modulo: moduloName }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push('/modulos');
  };

  return (
    <div>
      <h1>Crear Nuevo Módulo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={moduloName}
          onChange={(e) => setModuloName(e.target.value)}
          placeholder="Nombre del Módulo"
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
