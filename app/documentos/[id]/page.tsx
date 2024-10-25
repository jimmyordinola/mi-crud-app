// app/documentos/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Documento {
  id: number;
  documento: string;
  idModulo: number;
  modulo: {
    id: number;
    modulo: string;
  };
}

interface Modulo {
  id: number;
  modulo: string;
}

export default function DocumentoDetail() {
  const [documento, setDocumento] = useState<Documento | null>(null);
  const [documentoName, setDocumentoName] = useState('');
  const [idModulo, setIdModulo] = useState<number | null>(null);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    fetch(`/api/documentos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDocumento(data);
        setDocumentoName(data.documento);
        setIdModulo(data.idModulo);
      });
    fetch('/api/modulos')
      .then((res) => res.json())
      .then((data) => setModulos(data));
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idModulo) {
      alert('Por favor, selecciona un módulo.');
      return;
    }
    await fetch(`/api/documentos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ documento: documentoName, idModulo }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push('/documentos');
  };

  const handleDelete = async () => {
    await fetch(`/api/documentos/${id}`, {
      method: 'DELETE',
    });
    router.push('/documentos');
  };

  if (!documento) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Detalle del Documento</h1>
      <form onSubmit={handleUpdate}>
        <label>
          Nombre del Documento:
          <input
            type="text"
            value={documentoName}
            onChange={(e) => setDocumentoName(e.target.value)}
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
        <button type="submit">Actualizar</button>
      </form>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
}
