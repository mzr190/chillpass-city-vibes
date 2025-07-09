
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">
              Chill<span className="text-blue-400">pass</span>
            </h3>
            <p className="text-gray-400 text-sm">
              Tu compañero para descubrir los mejores eventos y panoramas en Santiago.
            </p>
          </div>

          {/* Enlaces principales */}
          <div>
            <h4 className="font-semibold mb-4">Explorar</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Mejores panoramas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Descuentos exclusivos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gastronomía</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Vida nocturna</a></li>
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="font-semibold mb-4">Categorías</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Cultura</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Música</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Aire libre</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gastronomía</a></li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Centro de ayuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Términos y condiciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de privacidad</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Chillpass. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
