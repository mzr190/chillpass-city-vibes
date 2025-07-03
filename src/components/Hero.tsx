
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

  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4 overflow-hidden">
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
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          ¿Qué quieres hacer <span className="text-blue-400">hoy</span>?
        </h2>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Descubre los mejores eventos, panoramas y experiencias en Santiago. 
          Tu buscador inteligente de aventuras urbanas.
        </p>
        
        {/* Barra de búsqueda central */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="¿Qué quieres hacer hoy?"
              className="w-full px-6 py-4 pr-14 text-lg border-0 rounded-full shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/95 backdrop-blur-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors shadow-lg"
            >
              <Search className="text-white" size={20} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Hero;
