// app/cabeceras/nuevo/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Sprint {
  id: number;
  sprint: string;
}

export default function NuevaCabecera() {
  const [idSprint, setIdSprint] = useState<number | null>(null);
  const [fecha, setFecha] = useState('');
  const [observacion, setObservacion] = useState('');
  const [sgcan, setSgcan] = useState(false);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/sprints')
      .then((res) => res.json())
      .then((data) => setSprints(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idSprint) {
      alert('Por favor, selecciona un sprint.');
      return;
    }
    await fetch('/api/cabeceras', {
      method: 'POST',
      body: JSON.stringify({ idSprint, fecha, observacion, sgcan }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push('/cabeceras');
  };

  return (
    <div>
      <h1>Crear Nueva Cabecera</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Sprint:
          <select value={idSprint ?? ''} onChange={(e) => setIdSprint(Number(e.target.value))}>
            <option value="">Selecciona un sprint</option>
            {sprints.map((sprint) => (
              <option key={sprint.id} value={sprint.id}>
                {sprint.sprint}
              </option>
            ))}
          </select>
        </label>
        <label>
          Fecha:
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </label>
        <label>
          Observación:
          <input
            type="text"
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
          />
        </label>
        <label>
          SGCAN:
          <input
            type="checkbox"
            checked={sgcan}
            onChange={(e) => setSgcan(e.target.checked)}
          />
        </label>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
