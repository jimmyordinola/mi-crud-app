// app/layout.tsx
import './globals.css';
import Sidebar from './components/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
          <Sidebar />
          <div style={{ flex: 1, padding: '20px', marginLeft: '256px' }}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}