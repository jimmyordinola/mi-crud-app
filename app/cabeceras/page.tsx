// app/cabeceras/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Cabecera {
  id: number;
  idSprint: number;
  fecha: string;
  observacion: string;
  sgcan: boolean;
  sprint: {
    id: number;
    sprint: string;
  };
}

export default function CabecerasPage() {
  const [cabeceras, setCabeceras] = useState<Cabecera[]>([]);

  useEffect(() => {
    fetch('/api/cabeceras')
      .then((res) => res.json())
      .then((data) => setCabeceras(data));
  }, []);

  return (
    <div>
      <h1>Lista de Cabeceras</h1>
      <Link href="/cabeceras/nuevo">Crear Nueva Cabecera</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sprint</th>
            <th>Fecha</th>
            <th>Observación</th>
            <th>SGCAN</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cabeceras.map((cabecera) => (
            <tr key={cabecera.id}>
              <td>{cabecera.id}</td>
              <td>{cabecera.sprint?.sprint}</td>
              <td>{new Date(cabecera.fecha).toLocaleDateString()}</td>
              <td>{cabecera.observacion}</td>
              <td>{cabecera.sgcan ? 'Sí' : 'No'}</td>
              <td>
                <Link href={`/cabeceras/${cabecera.id}`}>Ver/Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
