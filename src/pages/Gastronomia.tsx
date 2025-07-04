
import React from 'react';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import Footer from '../components/Footer';

const Gastronomia = () => {
  const gastronomiaEvents = [
    {
      id: 201,
      name: "Festival gastronómico Las Condes",
      time: "Domingo 12:00",
      location: "Centro Las Condes",
      price: "$15.000",
      category: "Gastronomía",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 202,
      name: "Cena de Maridaje Exclusiva",
      time: "Viernes 20:00",
      location: "Restaurante Boragó",
      price: "$65.000",
      category: "Gastronomía",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 203,
      name: "Tour de Food Trucks",
      time: "Sábado 18:00",
      location: "Parque Bicentenario",
      price: "$12.000",
      category: "Gastronomía",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 204,
      name: "Clase de Cocina Italiana",
      time: "Miércoles 19:00",
      location: "Escuela Culinaria",
      price: "$35.000",
      category: "Gastronomía",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Experiencias Gastronómicas
          </h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Sabores únicos y experiencias culinarias inolvidables
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gastronomiaEvents.map((event) => (
            <EventCard key={event.id} event={event} featured />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gastronomia;
