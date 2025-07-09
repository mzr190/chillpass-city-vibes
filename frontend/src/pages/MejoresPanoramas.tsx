import React, { useState } from 'react';
import Header from '../components/Header';
import FilterSection from '../components/FilterSection';
import EventCard from '../components/EventCard';
import Footer from '../components/Footer';
import { useEvents } from '../hooks/useEvents';

const MejoresPanoramas = () => {
  const [filters, setFilters] = useState({});
  const { data: events = [], isLoading, error } = useEvents();

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

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600 text-lg mb-4">Error cargando eventos</p>
            <p className="text-gray-500">{error.message}</p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} featured />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No hay eventos disponibles</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MejoresPanoramas;
