
import React from 'react';
import EventCard from './EventCard';

const RecommendedEvents = () => {
  const todayEvents = [
    {
      id: 1,
      name: 'Jazz en el Bellavista',
      time: '20:00',
      location: 'Barrio Bellavista',
      category: 'Música'
    },
    {
      id: 2,
      name: 'Cena Degustación',
      time: '19:30',
      location: 'Las Condes',
      category: 'Gastronomía'
    },
    {
      id: 3,
      name: 'Arte Contemporáneo',
      time: '18:00',
      location: 'Centro Cultural',
      category: 'Cultura'
    },
    {
      id: 4,
      name: 'Fiesta Rooftop',
      time: '22:00',
      location: 'Providencia',
      category: 'Fiesta'
    },
    {
      id: 5,
      name: 'Mercado Gastronómico',
      time: '12:00',
      location: 'Ñuñoa',
      category: 'Gastronomía'
    },
    {
      id: 6,
      name: 'Parque Bicentenario',
      time: '10:00',
      location: 'Vitacura',
      category: 'Aire libre'
    }
  ];

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          ¿Qué hacer hoy?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {todayEvents.map(event => (
            <EventCard key={event.id} event={event} compact={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedEvents;
