
import React from 'react';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import Footer from '../components/Footer';

const Fiesta = () => {
  const fiestaEvents = [
    {
      id: 401,
      name: "Fiesta Electrónica - DJ Internacional",
      time: "Sábado 23:00",
      location: "Club La Feria",
      price: "$25.000",
      category: "Fiesta",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 402,
      name: "Rooftop Party - Vista 360°",
      time: "Viernes 21:00",
      location: "Sky Costanera",
      price: "$30.000",
      category: "Fiesta",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 403,
      name: "Noche de Salsa y Bachata",
      time: "Jueves 21:00",
      location: "Club Chocolate",
      price: "$15.000",
      category: "Fiesta",
      image: "https://images.unsplash.com/photo-1574391884720-bbc9ceb10d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 404,
      name: "After Office - Happy Hour",
      time: "Viernes 18:00",
      location: "Bar The Singular",
      price: "$12.000",
      category: "Fiesta",
      image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Vida Nocturna y Fiestas
          </h1>
          <p className="text-xl text-pink-100 max-w-2xl mx-auto">
            Las mejores fiestas y eventos nocturnos de la ciudad
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fiestaEvents.map((event) => (
            <EventCard key={event.id} event={event} featured />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Fiesta;
