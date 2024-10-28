// components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { FaHome, FaCog, FaShoppingBag, FaFileAlt, FaChartBar } from 'react-icons/fa';

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
          <FaHome /> 
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
          <FaCog /> 
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
          <FaShoppingBag /> 
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
          <FaFileAlt /> 
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
          <FaChartBar /> 
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
          <FaChartBar /> 
          <span>Cabeceras</span>
        </Link>
      </nav>
    </aside>
  );
}