
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { Calendar, MapPin, Clock, Users, Heart, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';

const EventDetail = () => {
  const { id } = useParams();

  // Evento simulado - en un app real esto vendría de una API
  const event = {
    id: 1,
    name: "Concierto de rock alternativo en Teatro Caupolicán",
    date: "Viernes 15 de Marzo, 2024",
    time: "21:00 - 01:00",
    location: "Teatro Caupolicán, Santiago Centro",
    price: "$20.000 - $35.000",
    category: "Música",
    description: "Una noche épica de rock alternativo con las mejores bandas locales e internacionales. Prepárate para vivir una experiencia única llena de energía y buena música.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    capacity: "2,500 personas",
    ageRestriction: "18+",
    organizer: "Rock & Roll Productions",
    ticketUrl: "https://puntoticket.com"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Event Image */}
        <div className="relative h-96 rounded-xl overflow-hidden mb-8">
          <img
            src={event.image}
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
              <div className="flex items-center text-gray-600">
                <Users className="mr-3" size={20} />
                <span>Capacidad: {event.capacity}</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Descripción</h3>
              <p className="text-gray-700 leading-relaxed mb-6">{event.description}</p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Información adicional</h3>
              <ul className="text-gray-700 space-y-2">
                <li><strong>Restricción de edad:</strong> {event.ageRestriction}</li>
                <li><strong>Organizador:</strong> {event.organizer}</li>
                <li><strong>Categoría:</strong> {event.category}</li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-2xl font-bold text-blue-600 mb-4">{event.price}</div>
              
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  <ExternalLink className="mr-2" size={18} />
                  Comprar entradas
                </Button>
                
                <Button variant="outline" className="w-full" size="lg">
                  <Heart className="mr-2" size={18} />
                  Guardar evento
                </Button>
              </div>
            </div>

            {/* Share Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Compartir evento</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
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
