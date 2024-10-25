// app/detalles/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

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
}

interface Cabecera {
  id: number;
  observacion: string;
}

interface Categoria {
  id: number;
  categoria: string;
}

interface Metodo {
  id: number;
  metodo: string;
}

interface Modulo {
  id: number;
  modulo: string;
}

interface Documento {
  id: number;
  documento: string;
}

export default function DetalleDetail() {
  const [detalle, setDetalle] = useState<Detalle | null>(null);
  const [idCabecera, setIdCabecera] = useState<number | null>(null);
  const [idCategoria, setIdCategoria] = useState<number | null>(null);
  const [idMetodo, setIdMetodo] = useState<number | null>(null);
  const [idModulo, setIdModulo] = useState<number | null>(null);
  const [idDocumento, setIdDocumento] = useState<number | null>(null);
  const [esquema1, setEsquema1] = useState<number>(0);
  // Continuar con los demás campos...

  const [observacion, setObservacion] = useState('');
  const [observado, setObservado] = useState(false);

  const [cabeceras, setCabeceras] = useState<Cabecera[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [metodos, setMetodos] = useState<Metodo[]>([]);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [documentos, setDocumentos] = useState<Documento[]>([]);

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    fetch(`/api/detalles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDetalle(data);
        setIdCabecera(data.idCabecera);
        setIdCategoria(data.idCategoria);
        setIdMetodo(data.idMetodo);
        setIdModulo(data.idModulo);
        setIdDocumento(data.idDocumento);
        setEsquema1(data.esquema1);
        // Continuar con los demás campos...
        setObservacion(data.observacion);
        setObservado(data.observado);
      });

    fetch('/api/cabeceras')
      .then((res) => res.json())
      .then((data) => setCabeceras(data));

    fetch('/api/categorias')
      .then((res) => res.json())
      .then((data) => setCategorias(data));

    fetch('/api/metodos')
      .then((res) => res.json())
      .then((data) => setMetodos(data));

    fetch('/api/modulos')
      .then((res) => res.json())
      .then((data) => setModulos(data));

    fetch('/api/documentos')
      .then((res) => res.json())
      .then((data) => setDocumentos(data));
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !idCabecera ||
      !idCategoria ||
      !idMetodo ||
      !idModulo ||
      !idDocumento
    ) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    await fetch(`/api/detalles/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        idCabecera,
        idCategoria,
        idMetodo,
        idModulo,
        idDocumento,
        esquema1,
        // Continuar con los demás campos...
        observacion,
        observado,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push(`/cabeceras/${idCabecera}`);
  };

  const handleDelete = async () => {
    await fetch(`/api/detalles/${id}`, {
      method: 'DELETE',
    });
    router.push(`/cabeceras/${idCabecera}`);
  };

  if (!detalle) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Detalle del Detalle</h1>
      <form onSubmit={handleUpdate}>
        {/* Similar al formulario de creación, con los valores prellenados */}
        {/* Agrega los campos necesarios para editar */}
        <button type="submit">Actualizar</button>
      </form>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
}
