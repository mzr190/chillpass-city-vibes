
import React from 'react';

interface EventCardProps {
  event: {
    id: number;
    name: string;
    time: string;
    location: string;
    price?: string;
    image?: string;
    category: string;
  };
  featured?: boolean;
  compact?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, featured = false, compact = false }) => {
  if (compact) {
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
        <div className="h-32 bg-gradient-to-br from-blue-100 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold text-sm">
                {event.name.charAt(0)}
              </span>
            </div>
            <p className="text-xs text-gray-600">{event.category}</p>
          </div>
        </div>
        
        <div className="p-4">
          <h4 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2">{event.name}</h4>
          <p className="text-gray-600 text-xs mb-1">{event.time}</p>
          <p className="text-gray-600 text-xs">{event.location}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden ${
      featured ? 'border-2 border-blue-200' : ''
    }`}>
      <div className="h-48 bg-gradient-to-br from-blue-100 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-white font-bold text-xl">
              {event.name.charAt(0)}
            </span>
          </div>
          <p className="text-sm text-gray-600">{event.category}</p>
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="font-bold text-lg text-gray-900 mb-2">{event.name}</h4>
        <p className="text-gray-600 text-sm mb-1">{event.time}</p>
        <p className="text-gray-600 text-sm mb-4">{event.location}</p>
        
        {event.price && (
          <p className="text-blue-600 font-semibold mb-4">{event.price}</p>
        )}
        
        {featured && (
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Comprar entradas
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
