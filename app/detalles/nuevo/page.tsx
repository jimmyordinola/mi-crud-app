// app/detalles/nuevo/page.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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

export default function NuevoDetalleWrapper() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <NuevoDetalle />
    </Suspense>
  );
}

function NuevoDetalle() {
  const [idCabecera, setIdCabecera] = useState<number | null>(null);
  const [idCategoria, setIdCategoria] = useState<number | null>(null);
  const [idMetodo, setIdMetodo] = useState<number | null>(null);
  const [idModulo, setIdModulo] = useState<number | null>(null);
  const [idDocumento, setIdDocumento] = useState<number | null>(null);
  const [esquema1, setEsquema1] = useState<number>(0);
  const [observacion, setObservacion] = useState('');
  const [observado, setObservado] = useState(false);

  const [cabeceras, setCabeceras] = useState<Cabecera[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [metodos, setMetodos] = useState<Metodo[]>([]);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [documentos, setDocumentos] = useState<Documento[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const idCabeceraParam = searchParams.get('idCabecera');

  useEffect(() => {
    if (idCabeceraParam) {
      setIdCabecera(Number(idCabeceraParam));
    }
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
  }, [idCabeceraParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idCabecera || !idCategoria || !idMetodo || !idModulo || !idDocumento) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    await fetch('/api/detalles', {
      method: 'POST',
      body: JSON.stringify({
        idCabecera,
        idCategoria,
        idMetodo,
        idModulo,
        idDocumento,
        esquema1,
        observacion,
        observado,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push(`/cabeceras/${idCabecera}`);
  };

  return (
    <div>
      <h1>Crear Nuevo Detalle</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Cabecera:
          <select
            value={idCabecera ?? ''}
            onChange={(e) => setIdCabecera(Number(e.target.value))}
            disabled={idCabeceraParam !== null}
          >
            <option value="">Selecciona una cabecera</option>
            {cabeceras.map((cabecera) => (
              <option key={cabecera.id} value={cabecera.id}>
                {cabecera.observacion}
              </option>
            ))}
          </select>
        </label>

        <label>
          Categoría:
          <select
            value={idCategoria ?? ''}
            onChange={(e) => setIdCategoria(Number(e.target.value))}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.categoria}
              </option>
            ))}
          </select>
        </label>

        <label>
          Método:
          <select
            value={idMetodo ?? ''}
            onChange={(e) => setIdMetodo(Number(e.target.value))}
          >
            <option value="">Selecciona un método</option>
            {metodos.map((metodo) => (
              <option key={metodo.id} value={metodo.id}>
                {metodo.metodo}
              </option>
            ))}
          </select>
        </label>

        <label>
          Módulo:
          <select
            value={idModulo ?? ''}
            onChange={(e) => setIdModulo(Number(e.target.value))}
          >
            <option value="">Selecciona un módulo</option>
            {modulos.map((modulo) => (
              <option key={modulo.id} value={modulo.id}>
                {modulo.modulo}
              </option>
            ))}
          </select>
        </label>

        <label>
          Documento:
          <select
            value={idDocumento ?? ''}
            onChange={(e) => setIdDocumento(Number(e.target.value))}
          >
            <option value="">Selecciona un documento</option>
            {documentos.map((documento) => (
              <option key={documento.id} value={documento.id}>
                {documento.documento}
              </option>
            ))}
          </select>
        </label>

        <label>
          Esquema 1:
          <input
            type="number"
            value={esquema1}
            onChange={(e) => setEsquema1(parseFloat(e.target.value))}
          />
        </label>

        <label>
          Observación:
          <textarea
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
          ></textarea>
        </label>

        <label>
          Observado:
          <input
            type="checkbox"
            checked={observado}
            onChange={(e) => setObservado(e.target.checked)}
          />
        </label>

        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
