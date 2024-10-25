// app/sprints/nuevo/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NuevoSprint() {
  const [sprintName, setSprintName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/sprints', {
      method: 'POST',
      body: JSON.stringify({ sprint: sprintName }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push('/sprints');
  };

  return (
    <div>
      <h1>Crear Nuevo Sprint</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={sprintName}
          onChange={(e) => setSprintName(e.target.value)}
          placeholder="Nombre del Sprint"
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
