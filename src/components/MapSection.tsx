import React, { useState } from 'react';
import { MapPin, Clock, MapIcon, Calendar } from 'lucide-react';
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
  image: string;
}
const MapSection: React.FC<MapSectionProps> = ({
  filters
}) => {
  const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });

  // Eventos de ejemplo con imágenes
  const allEvents: Event[] = [{
    id: 1,
    name: 'Concierto Jazz Club',
    type: 'cultura',
    time: 'noche',
    style: 'Cultura',
    location: 'Providencia',
    hour: '20:00',
    lat: -33.4489,
    lng: -70.6693,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  }, {
    id: 2,
    name: 'Festival Gastronómico',
    type: 'gastronomia',
    time: 'dia',
    style: 'Gastronomía',
    location: 'Las Condes',
    hour: '12:30',
    lat: -33.4372,
    lng: -70.6506,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  }, {
    id: 3,
    name: 'Fiesta Electrónica',
    type: 'fiesta',
    time: 'noche',
    style: 'Fiesta',
    location: 'Bellavista',
    hour: '22:00',
    lat: -33.4569,
    lng: -70.6483,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  }, {
    id: 4,
    name: 'Mercado La Vega',
    type: 'aire libre',
    time: 'dia',
    style: 'Aire libre',
    location: 'Recoleta',
    hour: '09:00',
    lat: -33.4378,
    lng: -70.6504,
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  }, {
    id: 5,
    name: 'Rooftop Bar',
    type: 'gastronomia',
    time: 'noche',
    style: 'Gastronomía',
    location: 'Santiago Centro',
    hour: '19:00',
    lat: -33.4520,
    lng: -70.6500,
    image: 'https://images.unsplash.com/photo-1551024739-4bd0c7a9c46c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  }, {
    id: 6,
    name: 'Parque Forestal',
    type: 'aire libre',
    time: 'dia',
    style: 'Aire libre',
    location: 'Santiago Centro',
    hour: '10:00',
    lat: -33.4350,
    lng: -70.6400,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  }];

  // Filtrar eventos según los filtros activos
  const filteredEvents = allEvents.filter(event => {
    if (filters.timeOfDay && event.time !== filters.timeOfDay) return false;
    if (filters.style && event.style !== filters.style) return false;
    return true;
  });
  const handleMouseEnter = (event: Event, e: React.MouseEvent) => {
    setHoveredEvent(event);
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };
  const handleMouseLeave = () => {
    setHoveredEvent(null);
  };
  return <section className="px-4 py-[13px] my-0">
      <div className="max-w-6xl mx-auto">
        
        
        
        {/* Mapa interactivo mejorado */}
        <div className="relative bg-gradient-to-br from-blue-50 via-gray-50 to-green-50 rounded-2xl h-96 overflow-hidden shadow-xl border border-gray-200">
          {/* Fondo del mapa con patrón */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, #e5e7eb 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
          </div>
          
          <div className="relative w-full h-full" onMouseMove={handleMouseMove}>
            {/* Calles simuladas */}
            <div className="absolute inset-0">
              <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-gray-300 opacity-60"></div>
              <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-gray-300 opacity-60"></div>
              <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-gray-300 opacity-60"></div>
              <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-gray-300 opacity-60"></div>
            </div>

            {filteredEvents.map((event, index) => <div key={event.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-all duration-300 z-10" style={{
            left: `${25 + index * 15 % 60}%`,
            top: `${30 + index % 3 * 20}%`
          }} onMouseEnter={e => handleMouseEnter(event, e)} onMouseLeave={handleMouseLeave}>
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white">
                    <MapPin className="text-white" size={18} />
                  </div>
                  <div className="absolute -inset-1 bg-blue-200 rounded-full opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
                </div>
              </div>)}
          </div>

          {/* Tarjeta flotante mejorada al hacer hover */}
          {hoveredEvent && <div className="fixed bg-white rounded-xl shadow-2xl overflow-hidden min-w-80 z-50 pointer-events-none border border-gray-200" style={{
          left: mousePosition.x + 10,
          top: mousePosition.y - 120,
          transform: 'translateX(-50%)'
        }}>
              <div className="relative h-32">
                <img src={hoveredEvent.image} alt={hoveredEvent.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-900 mb-2">{hoveredEvent.name}</h4>
                <div className="flex items-center text-gray-600 text-sm mb-1">
                  <Clock size={12} className="mr-2" />
                  <span>{hoveredEvent.hour}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapIcon size={12} className="mr-2" />
                  <span>{hoveredEvent.location}</span>
                </div>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                  {hoveredEvent.style}
                </span>
              </div>
            </div>}
        </div>
      </div>
    </section>;
};
export default MapSection;