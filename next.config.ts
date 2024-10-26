// next.config.js

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otras opciones de configuración...

  eslint: {
    // Advertencia: Esto permite que el build se complete incluso si hay errores de ESLint.
    // No es recomendado para producción, ya que puede ocultar errores importantes.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
