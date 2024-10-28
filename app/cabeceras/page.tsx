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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Lista de Cabeceras</h1>
      <div className="flex justify-end mb-4">
        <Link href="/cabeceras/nuevo" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Crear Nueva Cabecera
        </Link>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Sprint</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Fecha</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Observación</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">SGCAN</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cabeceras.map((cabecera) => (
            <tr key={cabecera.id} className="border-b hover:bg-gray-100 transition">
              <td className="py-3 px-4">{cabecera.id}</td>
              <td className="py-3 px-4">{cabecera.sprint?.sprint}</td>
              <td className="py-3 px-4">{new Date(cabecera.fecha).toLocaleDateString()}</td>
              <td className="py-3 px-4">{cabecera.observacion}</td>
              <td className="py-3 px-4">{cabecera.sgcan ? 'Sí' : 'No'}</td>
              <td className="py-3 px-4">
                <Link href={`/cabeceras/${cabecera.id}`} className="text-blue-500 hover:underline">
                  Ver/Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
