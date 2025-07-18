
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { Calendar, MapPin, Clock, Users, Heart, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useEvent, useEventFavorites } from '../hooks/useEvents';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading, error } = useEvent(id || '');
  const { toggleFavorite, isFavorite } = useEventFavorites();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-3 mb-6">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-200 rounded-lg h-32"></div>
                <div className="bg-gray-200 rounded-lg h-24"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Evento no encontrado</h1>
            <p className="text-gray-600 mb-8">
              {error?.message || 'El evento que buscas no existe o ha sido eliminado.'}
            </p>
            <Button onClick={() => window.history.back()}>
              Volver atrás
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isEventFavorite = isFavorite(event.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Event Image */}
        <div className="relative h-96 rounded-xl overflow-hidden mb-8">
          <img
            src={event.image || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {event.category}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.name}</h1>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600">
                <Calendar className="mr-3" size={20} />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="mr-3" size={20} />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="mr-3" size={20} />
                <span>{event.location}</span>
              </div>
              {event.capacity && (
                <div className="flex items-center text-gray-600">
                  <Users className="mr-3" size={20} />
                  <span>Capacidad: {event.capacity}</span>
                </div>
              )}
            </div>

            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Descripción</h3>
              <p className="text-gray-700 leading-relaxed mb-6">{event.description}</p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Información adicional</h3>
              <ul className="text-gray-700 space-y-2">
                {event.age_restriction && (
                  <li><strong>Restricción de edad:</strong> {event.age_restriction}</li>
                )}
                <li><strong>Organizador:</strong> {event.organizer}</li>
                <li><strong>Categoría:</strong> {event.category}</li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-2xl font-bold text-blue-600 mb-4">
                {event.price || 'Precio no disponible'}
              </div>
              
              <div className="space-y-3">
                {event.ticket_url && (
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => window.open(event.ticket_url, '_blank')}
                  >
                    <ExternalLink className="mr-2" size={18} />
                    Comprar entradas
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  onClick={() => toggleFavorite(event.id)}
                >
                  <Heart 
                    className={`mr-2 ${isEventFavorite ? 'fill-red-500 text-red-500' : ''}`}
                    size={18} 
                  />
                  {isEventFavorite ? 'Quitar de favoritos' : 'Guardar evento'}
                </Button>
              </div>
            </div>

            {/* Share Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Compartir evento</h3>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
                    window.open(url, '_blank');
                  }}
                >
                  Facebook
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(event.name)}`;
                    window.open(url, '_blank');
                  }}
                >
                  Twitter
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    const url = `https://wa.me/?text=${encodeURIComponent(`${event.name} - ${window.location.href}`)}`;
                    window.open(url, '_blank');
                  }}
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
