
import React from 'react';
import { MapPin } from 'lucide-react';

interface MapSectionProps {
  filters: any;
}

const MapSection: React.FC<MapSectionProps> = ({ filters }) => {
  // Eventos de ejemplo
  const events = [
    { id: 1, name: 'Concierto Jazz Club', type: 'cultura', time: 'noche', lat: -33.4489, lng: -70.6693 },
    { id: 2, name: 'Festival Gastronómico', type: 'comer', time: 'dia', lat: -33.4372, lng: -70.6506 },
    { id: 3, name: 'Fiesta Electrónica', type: 'fiesta', time: 'noche', lat: -33.4569, lng: -70.6483 },
    { id: 4, name: 'Mercado La Vega', type: 'aire libre', time: 'dia', lat: -33.4378, lng: -70.6504 },
  ];

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Explora eventos cerca de ti
        </h3>
        
        {/* Mapa simulado */}
        <div className="relative bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl h-96 overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gray-100 rounded-2xl">
            {/* Simulación de mapa con pines */}
            <div className="relative w-full h-full">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    left: `${30 + index * 20}%`,
                    top: `${40 + (index % 2) * 20}%`
                  }}
                >
                  <div className="bg-blue-600 rounded-full p-2 shadow-lg hover:bg-blue-700 transition-colors">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 min-w-max opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-sm font-medium text-gray-900">{event.name}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Overlay de instrucciones */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
                <MapPin className="text-blue-600 mx-auto mb-2" size={32} />
                <p className="text-gray-700 font-medium">Mapa interactivo de eventos</p>
                <p className="text-sm text-gray-500 mt-1">Haz clic en los pines para ver detalles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
