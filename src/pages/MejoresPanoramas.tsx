
import React, { useState } from 'react';
import Header from '../components/Header';
import FilterSection from '../components/FilterSection';
import EventCard from '../components/EventCard';
import Footer from '../components/Footer';

const MejoresPanoramas = () => {
  const [filters, setFilters] = useState({});

  const mejoresPanoramasEvents = [
    {
      id: 1,
      name: "Concierto al aire libre en Parque O'Higgins",
      time: "Sábado 15:00",
      location: "Parque O'Higgins",
      price: "$25.000",
      category: "Música",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Festival gastronómico Las Condes",
      time: "Domingo 12:00",
      location: "Centro Las Condes",
      price: "$15.000",
      category: "Gastronomía",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Exposición de arte contemporáneo",
      time: "Martes a Domingo 10:00-18:00",
      location: "Museo Nacional de Bellas Artes",
      price: "Gratis",
      category: "Cultura",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "Trekking Cerro San Cristóbal",
      time: "Sábado 08:00",
      location: "Cerro San Cristóbal",
      price: "Gratis",
      category: "Aire libre",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mejores Panoramas
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Descubre los eventos más populares y mejor valorados de Santiago
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <FilterSection onFilterChange={handleFilterChange} />
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mejoresPanoramasEvents.map((event) => (
            <EventCard key={event.id} event={event} featured />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MejoresPanoramas;
