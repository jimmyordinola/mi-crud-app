// app/detalles/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Detalle {
  id: number;
  idCabecera: number;
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
  cabecera: {
    id: number;
    observacion: string;
  };
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

export default function DetallesPage() {
  const [detalles, setDetalles] = useState<Detalle[]>([]);

  useEffect(() => {
    fetch('/api/detalles')
      .then((res) => res.json())
      .then((data) => setDetalles(data));
  }, []);

  return (
    <div>
      <h1>Lista de Detalles</h1>
      <Link href="/detalles/nuevo">Crear Nuevo Detalle</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cabecera</th>
            <th>Categoría</th>
            <th>Método</th>
            <th>Módulo</th>
            <th>Documento</th>
            <th>Observación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle) => (
            <tr key={detalle.id}>
              <td>{detalle.id}</td>
              <td>{detalle.cabecera?.observacion}</td>
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
    </div>
  );
}
