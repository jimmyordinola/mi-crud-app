// app/layout.tsx
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <nav>
          <ul>
            <li>
              <Link href="/sprints">Sprints</Link>
            </li>
            <li>
              <Link href="/cabeceras">Cabeceras</Link>
            </li>
            <li>
              <Link href="/modulos">Módulos</Link>
            </li>
            <li>
              <Link href="/documentos">Documentos</Link>
            </li>
            <li>
              <Link href="/categorias">Categorías</Link>
            </li>
            <li>
              <Link href="/metodos">Métodos</Link>
            </li>
            <li>
              <Link href="/detalles">Detalles</Link>
            </li>
            {/* Agrega otros enlaces aquí */}
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
