
import React, { useState } from 'react';
import { MapPin, Clock, MapIcon } from 'lucide-react';

interface MapSectionProps {
  filters: any;
}

interface Event {
  id: number;
  name: string;
  type: string;
  time: 'dia' | 'noche';
  style: string;
  location: string;
  hour: string;
  lat: number;
  lng: number;
}

const MapSection: React.FC<MapSectionProps> = ({ filters }) => {
  const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Eventos de ejemplo
  const allEvents: Event[] = [
    { id: 1, name: 'Concierto Jazz Club', type: 'cultura', time: 'noche', style: 'Cultura', location: 'Providencia', hour: '20:00', lat: -33.4489, lng: -70.6693 },
    { id: 2, name: 'Festival Gastronómico', type: 'gastronomia', time: 'dia', style: 'Gastronomía', location: 'Las Condes', hour: '12:30', lat: -33.4372, lng: -70.6506 },
    { id: 3, name: 'Fiesta Electrónica', type: 'fiesta', time: 'noche', style: 'Fiesta', location: 'Bellavista', hour: '22:00', lat: -33.4569, lng: -70.6483 },
    { id: 4, name: 'Mercado La Vega', type: 'aire libre', time: 'dia', style: 'Aire libre', location: 'Recoleta', hour: '09:00', lat: -33.4378, lng: -70.6504 },
    { id: 5, name: 'Rooftop Bar', type: 'gastronomia', time: 'noche', style: 'Gastronomía', location: 'Santiago Centro', hour: '19:00', lat: -33.4520, lng: -70.6500 },
    { id: 6, name: 'Parque Forestal', type: 'aire libre', time: 'dia', style: 'Aire libre', location: 'Santiago Centro', hour: '10:00', lat: -33.4350, lng: -70.6400 },
  ];

  // Filtrar eventos según los filtros activos
  const filteredEvents = allEvents.filter(event => {
    if (filters.timeOfDay && event.time !== filters.timeOfDay) return false;
    if (filters.style && event.style !== filters.style) return false;
    return true;
  });

  const handleMouseEnter = (event: Event, e: React.MouseEvent) => {
    setHoveredEvent(event);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredEvent(null);
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Explora eventos cerca de ti
        </h3>
        <p className="text-gray-600 text-center mb-8">
          {filteredEvents.length} eventos encontrados
        </p>
        
        {/* Mapa interactivo */}
        <div className="relative bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl h-96 overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gray-100 rounded-2xl">
            <div className="relative w-full h-full" onMouseMove={handleMouseMove}>
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform z-10"
                  style={{
                    left: `${25 + (index * 15) % 60}%`,
                    top: `${30 + (index % 3) * 20}%`
                  }}
                  onMouseEnter={(e) => handleMouseEnter(event, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-blue-600 rounded-full p-2 shadow-lg hover:bg-blue-700 transition-colors">
                    <MapPin className="text-white" size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tarjeta flotante al hacer hover */}
          {hoveredEvent && (
            <div 
              className="fixed bg-white rounded-lg shadow-xl p-4 min-w-64 z-50 pointer-events-none"
              style={{
                left: mousePosition.x + 10,
                top: mousePosition.y - 80,
                transform: 'translateX(-50%)'
              }}
            >
              <h4 className="font-bold text-gray-900 mb-2">{hoveredEvent.name}</h4>
              <div className="flex items-center text-gray-600 text-sm mb-1">
                <Clock size={14} className="mr-1" />
                <span>{hoveredEvent.hour}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapIcon size={14} className="mr-1" />
                <span>{hoveredEvent.location}</span>
              </div>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {hoveredEvent.style}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MapSection;
