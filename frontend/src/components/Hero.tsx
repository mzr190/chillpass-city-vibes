import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useSearchEvents } from '../hooks/useEvents';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onSearch?: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { search } = useSearchEvents();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Perform search
      search(searchQuery);
      
      // Call parent handler if provided
      onSearch?.(searchQuery);
      
      // Navigate to search results (we'll create this page later)
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
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
          <br />
          Todo en un solo lugar
        </p>

        {/* Search Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
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
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              <Search className="mr-2" size={20} />
              Buscar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;