// app/documentos/nuevo/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Modulo {
  id: number;
  modulo: string;
}

export default function NuevoDocumento() {
  const [documentoName, setDocumentoName] = useState('');
  const [idModulo, setIdModulo] = useState<number | null>(null);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/modulos')
      .then((res) => res.json())
      .then((data) => setModulos(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idModulo) {
      alert('Por favor, selecciona un módulo.');
      return;
    }
    await fetch('/api/documentos', {
      method: 'POST',
      body: JSON.stringify({ documento: documentoName, idModulo }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push('/documentos');
  };

  return (
    <div>
      <h1>Crear Nuevo Documento</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Documento:
          <input
            type="text"
            value={documentoName}
            onChange={(e) => setDocumentoName(e.target.value)}
            placeholder="Nombre del Documento"
          />
        </label>
        <label>
          Módulo:
          <select value={idModulo ?? ''} onChange={(e) => setIdModulo(Number(e.target.value))}>
            <option value="">Selecciona un módulo</option>
            {modulos.map((modulo) => (
              <option key={modulo.id} value={modulo.id}>
                {modulo.modulo}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
