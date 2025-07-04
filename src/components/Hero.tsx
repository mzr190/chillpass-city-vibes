import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface HeroProps {
  onSearch?: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
    console.log('Búsqueda:', searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
          alt="Urban night party"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Descubre los mejores
          <span className="block text-blue-400">panoramas en Santiago</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-2xl mx-auto">
          Eventos únicos, experiencias inolvidables y diversión garantizada
        </p>

        {/* Search Section - Claramente diferenciada */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="mb-6">
            <h3 className="text-gray-800 text-lg font-semibold mb-2 flex items-center justify-center">
              <Search className="mr-2" size={20} />
              Buscar por nombre o palabra clave
            </h3>
            <p className="text-gray-600 text-sm">
              Encuentra eventos específicos escribiendo su nombre o descripción
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="¿Qué evento buscas? Ej: concierto, fiesta, restaurante..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 text-lg"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              <Search className="mr-2" size={20} />
              Buscar
            </button>
          </div>
        </div>

        {/* Note about filters */}
        <div className="mt-6 text-center">
          <p className="text-white/80 text-sm">
            💡 Más abajo encontrarás filtros visuales y un mapa interactivo para explorar por zona
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
