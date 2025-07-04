
import React from 'react';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import Footer from '../components/Footer';

const AireLibre = () => {
  const aireLibreEvents = [
    {
      id: 101,
      name: "Trekking Cerro San Cristóbal",
      time: "Sábado 08:00",
      location: "Cerro San Cristóbal",
      price: "Gratis",
      category: "Aire libre",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 102,
      name: "Ciclismo por la Costanera",
      time: "Domingo 09:00",
      location: "Costanera Norte",
      price: "$5.000",
      category: "Aire libre",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 103,
      name: "Picnic en Parque Metropolitano",
      time: "Sábado 12:00",
      location: "Parque Metropolitano",
      price: "Gratis",
      category: "Aire libre",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 104,
      name: "Kayak en el Maipo",
      time: "Domingo 10:00",
      location: "Río Maipo",
      price: "$25.000",
      category: "Aire libre",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Eventos al Aire Libre
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Conecta con la naturaleza y disfruta actividades al aire libre
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aireLibreEvents.map((event) => (
            <EventCard key={event.id} event={event} featured />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AireLibre;
