
import React, { useState } from 'react';
import Header from '../components/Header';
import FilterSection from '../components/FilterSection';
import EventCard from '../components/EventCard';
import Footer from '../components/Footer';

const FiestasImperdibles = () => {
  const [filters, setFilters] = useState({});

  const fiestasEvents = [
    {
      id: 1,
      name: "Fiesta Electrónica - DJ Internacional",
      time: "Sábado 23:00",
      location: "Club La Feria",
      price: "$25.000",
      category: "Fiesta",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Rooftop Party - Vista 360°",
      time: "Viernes 21:00",
      location: "Sky Costanera",
      price: "$30.000",
      category: "Fiesta",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Festival de Cerveza Artesanal",
      time: "Sábado 15:00",
      location: "Parque de los Reyes",
      price: "$18.000",
      category: "Gastronomía",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "Noche de Karaoke y Cocktails",
      time: "Miércoles 20:00",
      location: "Bar The Singular",
      price: "$15.000",
      category: "Fiesta",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Fiestas Imperdibles
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Las mejores fiestas y eventos nocturnos de Santiago
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
          {fiestasEvents.map((event) => (
            <EventCard key={event.id} event={event} featured />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FiestasImperdibles;
