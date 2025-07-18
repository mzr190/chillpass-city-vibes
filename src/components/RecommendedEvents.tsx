
import React from 'react';
import EventCard from './EventCard';
import { useEvents } from '../hooks/useEvents';

const RecommendedEvents = () => {
  const { data: events, isLoading, error } = useEvents({ limit: 8 });

  if (isLoading) {
    return (
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            ¿Qué hacer hoy?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-32 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            ¿Qué hacer hoy?
          </h3>
          <div className="text-center text-red-600">
            Error cargando eventos: {error.message}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          ¿Qué hacer hoy?
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {events?.map(event => (
            <EventCard key={event.id} event={event} compact={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedEvents;
