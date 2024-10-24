// app/posts/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function PostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (id) {
      fetch(`/api/posts/${id}`)
        .then(res => res.json())
        .then(data => setPost(data));
    }
  }, [id]);

  const handleDelete = async () => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    router.push('/');
  };

  if (!post) return <div>Cargando...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <button onClick={() => router.push(`/posts/edit/${post.id}`)}>Editar</button>
      <button onClick={handleDelete}>Borrar</button>
    </div>
  );
}
