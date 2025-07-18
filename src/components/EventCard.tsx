import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

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
  const [isLiked, setIsLiked] = useState(false);

  const getCategoryImage = (category: string) => {
    const images = {
      'Música': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'Gastronomía': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'Cultura': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'Fiesta': 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'Aire libre': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    };
    return images[category as keyof typeof images] || images['Cultura'];
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    console.log(`Event ${event.id} ${!isLiked ? 'liked' : 'unliked'}`);
  };

  if (compact) {
    return (
      <Link to={`/event/${event.id}`} className="block">
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="relative h-32 overflow-hidden">
            <img
              src={event.image || getCategoryImage(event.category)}
              alt={event.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute top-2 right-2 flex items-center space-x-2">
              <button
                onClick={handleLikeClick}
                className="bg-white/90 backdrop-blur-sm p-1 rounded-full hover:bg-white transition-colors"
              >
                <Heart 
                  size={16} 
                  className={isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'} 
                />
              </button>
              <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                {event.category}
              </span>
            </div>
          </div>
          
          <div className="p-4">
            <h4 className="font-bold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {event.name}
            </h4>
            <div className="space-y-1">
              <p className="text-gray-600 text-xs flex items-center">
                <span className="w-1 h-1 bg-blue-600 rounded-full mr-2"></span>
                {event.time}
              </p>
              <p className="text-gray-600 text-xs flex items-center">
                <span className="w-1 h-1 bg-green-600 rounded-full mr-2"></span>
                {event.location}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/event/${event.id}`} className="block">
      <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group ${
        featured ? 'border-2 border-blue-200' : ''
      }`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image || getCategoryImage(event.category)}
            alt={event.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <button
              onClick={handleLikeClick}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            >
              <Heart 
                size={18} 
                className={isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'} 
              />
            </button>
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-sm px-3 py-1 rounded-full font-medium">
              {event.category}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {event.name}
          </h4>
          <div className="space-y-2 mb-4">
            <p className="text-gray-600 text-sm flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              {event.time}
            </p>
            <p className="text-gray-600 text-sm flex items-center">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
              {event.location}
            </p>
          </div>
          
          {event.price && (
            <p className="text-blue-600 font-semibold mb-4 text-lg">{event.price}</p>
          )}
          
          {featured && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                console.log('Redirecting to ticket purchase');
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Comprar entradas
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
