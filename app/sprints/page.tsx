// app/sprints/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Sprint {
  id: number;
  sprint: string;
}

export default function SprintsPage() {
  const [sprints, setSprints] = useState<Sprint[]>([]);

  useEffect(() => {
    fetch('/api/sprints')
      .then((res) => res.json())
      .then((data) => setSprints(data));
  }, []);

  return (
    <div>
      <h1>Lista de Sprints</h1>
      <Link href="/sprints/nuevo">Crear Nuevo Sprint</Link>
      <ul>
        {sprints.map((sprint) => (
          <li key={sprint.id}>
            <Link href={`/sprints/${sprint.id}`}>{sprint.sprint}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
