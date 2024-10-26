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
  const [cabecera, setCabecera] = useState<Cabecera | null>(null);
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
        fetch(`/api/cabeceras/${data.idCabecera}`).then((res) => res.json()).then((data) => setCabecera(data));
      });

    fetch('/api/categorias').then((res) => res.json()).then((data) => setCategorias(data));
    fetch('/api/metodos').then((res) => res.json()).then((data) => setMetodos(data));
    fetch('/api/modulos').then((res) => res.json()).then((data) => setModulos(data));
    fetch('/api/documentos').then((res) => res.json()).then((data) => setDocumentos(data));
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!detalle) return;

    await fetch(`/api/detalles/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        idCategoria: detalle.idCategoria,
        idMetodo: detalle.idMetodo,
        idModulo: detalle.idModulo,
        idDocumento: detalle.idDocumento,
        esquema1: detalle.esquema1,
        esquema2: detalle.esquema2,
        esquema3: detalle.esquema3,
        esquema4: detalle.esquema4,
        esquema5: detalle.esquema5,
        esquema6: detalle.esquema6,
        es: detalle.es,
        flujo: detalle.flujo,
        avance: detalle.avance,
        observacion: detalle.observacion,
        observado: detalle.observado,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push(`/cabeceras/${detalle.idCabecera}`);
  };

  const handleDelete = async () => {
    if (!detalle) return;

    await fetch(`/api/detalles/${id}`, {
      method: 'DELETE',
    });
    router.push(`/cabeceras/${detalle.idCabecera}`);
  };

  if (!detalle || !cabecera) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Detalle del Detalle</h1>
      <div>
        <p><strong>Cabecera:</strong> {cabecera.observacion}</p>

        {/* Selector de Categoría */}
        <label>Categoría:</label>
        <select
          value={detalle.idCategoria}
          onChange={(e) => setDetalle({ ...detalle, idCategoria: parseInt(e.target.value) })}
        >
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.categoria}
            </option>
          ))}
        </select>

        {/* Selector de Método */}
        <label>Método:</label>
        <select
          value={detalle.idMetodo}
          onChange={(e) => setDetalle({ ...detalle, idMetodo: parseInt(e.target.value) })}
        >
          {metodos.map((metodo) => (
            <option key={metodo.id} value={metodo.id}>
              {metodo.metodo}
            </option>
          ))}
        </select>

        {/* Selector de Módulo */}
        <label>Módulo:</label>
        <select
          value={detalle.idModulo}
          onChange={(e) => setDetalle({ ...detalle, idModulo: parseInt(e.target.value) })}
        >
          {modulos.map((modulo) => (
            <option key={modulo.id} value={modulo.id}>
              {modulo.modulo}
            </option>
          ))}
        </select>

        {/* Selector de Documento */}
        <label>Documento:</label>
        <select
          value={detalle.idDocumento}
          onChange={(e) => setDetalle({ ...detalle, idDocumento: parseInt(e.target.value) })}
        >
          {documentos.map((documento) => (
            <option key={documento.id} value={documento.id}>
              {documento.documento}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleUpdate}>
        <div>
          <label>Observación:</label>
          <input
            type="text"
            value={detalle.observacion}
            onChange={(e) => setDetalle({ ...detalle, observacion: e.target.value })}
          />
        </div>

        <div>
          <label>Observado:</label>
          <input
            type="checkbox"
            checked={detalle.observado}
            onChange={(e) => setDetalle({ ...detalle, observado: e.target.checked })}
          />
        </div>

        <div>
          <label>Esquema1:</label>
          <input
            type="number"
            value={detalle.esquema1}
            onChange={(e) => setDetalle({ ...detalle, esquema1: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label>Esquema2:</label>
          <input
            type="number"
            value={detalle.esquema2}
            onChange={(e) => setDetalle({ ...detalle, esquema2: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label>Esquema3:</label>
          <input
            type="number"
            value={detalle.esquema3}
            onChange={(e) => setDetalle({ ...detalle, esquema3: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label>Esquema4:</label>
          <input
            type="number"
            value={detalle.esquema4}
            onChange={(e) => setDetalle({ ...detalle, esquema4: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label>Esquema5:</label>
          <input
            type="number"
            value={detalle.esquema5}
            onChange={(e) => setDetalle({ ...detalle, esquema5: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label>Esquema6:</label>
          <input
            type="number"
            value={detalle.esquema6}
            onChange={(e) => setDetalle({ ...detalle, esquema6: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label>Es:</label>
          <input
            type="number"
            value={detalle.es}
            onChange={(e) => setDetalle({ ...detalle, es: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label>Flujo:</label>
          <input
            type="number"
            value={detalle.flujo}
            onChange={(e) => setDetalle({ ...detalle, flujo: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label>Avance:</label>
          <input
            type="number"
            value={detalle.avance}
            onChange={(e) => setDetalle({ ...detalle, avance: parseFloat(e.target.value) })}
          />
        </div>

        <button type="submit">Actualizar</button>
      </form>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
}
