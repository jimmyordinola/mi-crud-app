// app/documentos/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Documento {
  id: number;
  documento: string;
  idModulo: number;
  modulo: {
    id: number;
    modulo: string;
  };
}

export default function DocumentosPage() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);

  useEffect(() => {
    fetch('/api/documentos')
      .then((res) => res.json())
      .then((data) => setDocumentos(data));
  }, []);

  return (
    <div>
      <h1>Lista de Documentos</h1>
      <Link href="/documentos/nuevo">Crear Nuevo Documento</Link>
      <ul>
        {documentos.map((documento) => (
          <li key={documento.id}>
            <Link href={`/documentos/${documento.id}`}>
              {documento.documento} - {documento.modulo.modulo}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
