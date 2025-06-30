
import React from 'react';
import EventCard from './EventCard';

const FeaturedEvents = () => {
  const featuredEvents = [
    {
      id: 1,
      name: 'Festival de Música Electrónica',
      time: 'Sábado 21:00',
      location: 'Parque O\'Higgins',
      price: 'Desde $25.000',
      category: 'Festival'
    },
    {
      id: 2,
      name: 'Experiencia Gastronómica Premium',
      time: 'Viernes 20:00',
      location: 'Hotel W Santiago',
      price: 'Desde $45.000',
      category: 'Gastronomía'
    },
    {
      id: 3,
      name: 'Concierto Sinfónico',
      time: 'Domingo 19:00',
      location: 'Teatro Municipal',
      price: 'Desde $15.000',
      category: 'Música Clásica'
    }
  ];

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Eventos destacados
        </h3>
        <p className="text-gray-600 text-center mb-8">
          Recomendaciones personalizadas para ti
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredEvents.map(event => (
            <EventCard key={event.id} event={event} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
