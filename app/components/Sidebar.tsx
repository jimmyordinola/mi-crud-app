'use client';

import Link from 'next/link';
import { 
  FaFlag, 
  FaPuzzlePiece, 
  FaFileAlt, 
  FaTools, 
  FaTags,
  FaHeading 
} from 'react-icons/fa';

export default function Sidebar() {
  return (
    <aside style={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: '256px',
      height: '100vh',
      backgroundColor: 'rgb(17, 94, 89)',
      color: 'white',
      overflowY: 'auto'
    }}>
      <nav style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '1rem' 
      }}>
        <Link 
          href="/sprints" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.5rem',
            color: 'white',
            textDecoration: 'none'
          }}
        >
          <FaFlag /> 
          <span>Sprints</span>
        </Link>
        
        <Link 
          href="/modulos" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.5rem',
            color: 'white',
            textDecoration: 'none'
          }}
        >
          <FaPuzzlePiece /> 
          <span>Módulos</span>
        </Link>
        
        <Link 
          href="/documentos" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.5rem',
            color: 'white',
            textDecoration: 'none'
          }}
        >
          <FaFileAlt /> 
          <span>Documentos</span>
        </Link>
        
        <Link 
          href="/metodos" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.5rem',
            color: 'white',
            textDecoration: 'none'
          }}
        >
          <FaTools /> 
          <span>Métodos</span>
        </Link>
        
        <Link 
          href="/categorias" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.5rem',
            color: 'white',
            textDecoration: 'none'
          }}
        >
          <FaTags /> 
          <span>Categorías</span>
        </Link>

        <Link 
          href="/cabeceras" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.5rem',
            color: 'white',
            textDecoration: 'none'
          }}
        >
          <FaHeading /> 
          <span>Cabeceras</span>
        </Link>
      </nav>
    </aside>
  );
}