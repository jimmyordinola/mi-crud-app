// app/cabeceras/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
  detalles: Detalle[];
}

interface Detalle {
  id: number;
  idCategoria: number;
  idMetodo: number;
  idModulo: number;
  idDocumento: number;
  esquema1: number;
  esquema2: number;
  esquema3: number;
  esquema4: number;
  esquema5: number;
  esquema6: number;
  es: number;
  flujo: number;
  avance: number;
  observacion: string;
  observado: boolean;
  categoria: {
    id: number;
    categoria: string;
  };
  metodo: {
    id: number;
    metodo: string;
  };
  modulo: {
    id: number;
    modulo: string;
  };
  documento: {
    id: number;
    documento: string;
  };
}

interface Sprint {
  id: number;
  sprint: string;
}

export default function CabeceraDetail() {
  const [cabecera, setCabecera] = useState<Cabecera | null>(null);
  const [idSprint, setIdSprint] = useState<number | null>(null);
  const [fecha, setFecha] = useState('');
  const [observacion, setObservacion] = useState('');
  const [sgcan, setSgcan] = useState(false);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    fetch(`/api/cabeceras/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCabecera(data);
        setIdSprint(data.idSprint);
        setFecha(data.fecha.substring(0, 10));
        setObservacion(data.observacion);
        setSgcan(data.sgcan);
      });
    fetch('/api/sprints')
      .then((res) => res.json())
      .then((data) => setSprints(data));
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idSprint) {
      alert('Por favor, selecciona un sprint.');
      return;
    }
    await fetch(`/api/cabeceras/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ idSprint, fecha, observacion, sgcan }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push('/cabeceras');
  };

  const handleDelete = async () => {
    await fetch(`/api/cabeceras/${id}`, {
      method: 'DELETE',
    });
    router.push('/cabeceras');
  };

  if (!cabecera) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Detalle de la Cabecera</h1>
      <form onSubmit={handleUpdate}>
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
        <button type="submit">Actualizar</button>
      </form>
      <button onClick={handleDelete}>Eliminar</button>

      <h2>Detalles Asociados</h2>
      <Link href={`/detalles/nuevo?idCabecera=${cabecera.id}`}>Añadir Detalle</Link>
      {cabecera.detalles && cabecera.detalles.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Categoría</th>
              <th>Método</th>
              <th>Módulo</th>
              <th>Documento</th>
              <th>Observación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cabecera.detalles.map((detalle) => (
              <tr key={detalle.id}>
                <td>{detalle.id}</td>
                <td>{detalle.categoria?.categoria}</td>
                <td>{detalle.metodo?.metodo}</td>
                <td>{detalle.modulo?.modulo}</td>
                <td>{detalle.documento?.documento}</td>
                <td>{detalle.observacion}</td>
                <td>
                  <Link href={`/detalles/${detalle.id}`}>Ver/Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay detalles asociados a esta cabecera.</p>
      )}
    </div>
  );
}
