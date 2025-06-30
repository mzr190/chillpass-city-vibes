
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
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          ¿Qué quieres hacer <span className="text-blue-600">hoy</span>?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
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
              className="w-full px-6 py-4 pr-14 text-lg border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors"
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
