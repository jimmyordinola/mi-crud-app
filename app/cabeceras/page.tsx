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

const CabecerasPage = () => {
  const [cabeceras, setCabeceras] = useState<Cabecera[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCabeceras = async () => {
      try {
        const res = await fetch('/api/cabeceras');
        const data = await res.json();
        setCabeceras(data);
      } catch (error) {
        console.error('Error al obtener las cabeceras:', error);
      }
    };

    fetchCabeceras();
  }, []);

  const filteredCabeceras = cabeceras.filter((cabecera) =>
    cabecera.observacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cabecera.sprint.sprint.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cabecera.id.toString().includes(searchTerm)
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Cabeceras</h1>
      
      <div className="mb-4 flex justify-between items-center">
        {/* Botón modificado con clases más específicas */}
        <Link
          href="/cabeceras/nuevo"
          className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-full shadow-sm hover:shadow-md active:transform active:scale-95 transition-all duration-200"
        >
          <span className="mr-1">+</span>
          Crear Nueva Cabecera
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">ID</th>
              <th className="border p-2 text-left">Sprint</th>
              <th className="border p-2 text-left">Fecha</th>
              <th className="border p-2 text-left">Observación</th>
              <th className="border p-2 text-left">SGCAN</th>
              <th className="border p-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredCabeceras.map((cabecera) => (
              <tr key={cabecera.id} className="hover:bg-gray-50">
                <td className="border p-2">#{cabecera.id}</td>
                <td className="border p-2">{cabecera.sprint.sprint}</td>
                <td className="border p-2">
                  {new Date(cabecera.fecha).toLocaleDateString('es-ES')}
                </td>
                <td className="border p-2">{cabecera.observacion}</td>
                <td className="border p-2">
                  <span className={`px-2 py-1 rounded ${
                    cabecera.sgcan ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {cabecera.sgcan ? 'Sí' : 'No'}
                  </span>
                </td>
                <td className="border p-2">
                  <Link
                    href={`/cabeceras/${cabecera.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Ver Detalles
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Mostrando {filteredCabeceras.length} de {cabeceras.length} registros
      </div>
    </div>
  );
};

export default CabecerasPage;