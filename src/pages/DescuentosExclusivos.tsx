
import React, { useState } from 'react';
import Header from '../components/Header';
import FilterSection from '../components/FilterSection';
import EventCard from '../components/EventCard';
import Footer from '../components/Footer';

const DescuentosExclusivos = () => {
  const [filters, setFilters] = useState({});

  const descuentosEvents = [
    {
      id: 1,
      name: "Cena de 3 pasos - 50% OFF",
      time: "Todos los días 19:00-23:00",
      location: "Restaurante Boragó",
      price: "$35.000",
      category: "Gastronomía",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Teatro Municipal - Estudiantes 70% OFF",
      time: "Viernes 20:00",
      location: "Teatro Municipal",
      price: "$8.000",
      category: "Cultura",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Club nocturno - Lista reducida",
      time: "Sábado 23:00",
      location: "Club The Clinic",
      price: "$8.000",
      category: "Fiesta",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "Tour de bares - Happy hour extendido",
      time: "Jueves 18:00-21:00",
      location: "Barrio Bellavista",
      price: "$12.000",
      category: "Gastronomía",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Descuentos Exclusivos
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Aprovecha las mejores ofertas y promociones especiales
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
          {descuentosEvents.map((event) => (
            <EventCard key={event.id} event={event} featured />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DescuentosExclusivos;
