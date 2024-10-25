// app/sprints/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Sprint {
  id: number;
  sprint: string;
}

export default function SprintDetail() {
  const [sprint, setSprint] = useState<Sprint | null>(null);
  const [sprintName, setSprintName] = useState('');
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    fetch(`/api/sprints/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSprint(data);
        setSprintName(data.sprint);
      });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/sprints/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ sprint: sprintName }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push('/sprints');
  };

  const handleDelete = async () => {
    await fetch(`/api/sprints/${id}`, {
      method: 'DELETE',
    });
    router.push('/sprints');
  };

  if (!sprint) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Detalle del Sprint</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={sprintName}
          onChange={(e) => setSprintName(e.target.value)}
        />
        <button type="submit">Actualizar</button>
      </form>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
}
