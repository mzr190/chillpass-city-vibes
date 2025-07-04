
import React from 'react';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import Footer from '../components/Footer';

const Cultura = () => {
  const culturaEvents = [
    {
      id: 301,
      name: "Exposición de arte contemporáneo",
      time: "Martes a Domingo 10:00-18:00",
      location: "Museo Nacional de Bellas Artes",
      price: "Gratis",
      category: "Cultura",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 302,
      name: "Teatro Municipal - Ópera Carmen",
      time: "Viernes 20:00",
      location: "Teatro Municipal",
      price: "$45.000",
      category: "Cultura",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 303,
      name: "Recital de Música Clásica",
      time: "Domingo 17:00",
      location: "Centro Cultural GAM",
      price: "$18.000",
      category: "Cultura",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 304,
      name: "Muestra de Cine Independiente",
      time: "Sábado 19:00",
      location: "Cine Arte Alameda",
      price: "$8.000",
      category: "Cultura",
      image: "https://images.unsplash.com/photo-1489599540728-473e5cded10a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Eventos Culturales
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Arte, música, teatro y cultura para enriquecer tu mente
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {culturaEvents.map((event) => (
            <EventCard key={event.id} event={event} featured />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cultura;
