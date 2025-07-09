
import React from 'react';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import { Heart, User, Calendar, MapPin } from 'lucide-react';

const Profile = () => {
  // Eventos guardados simulados
  const savedEvents = [
    {
      id: 1,
      name: "Concierto de rock alternativo",
      time: "Viernes 21:00",
      location: "Teatro Caupolicán",
      price: "$20.000",
      category: "Música",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Festival gastronómico",
      time: "Sábado 12:00",
      location: "Parque Araucano",
      price: "$15.000",
      category: "Gastronomía",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Juan Pérez</h1>
              <p className="text-gray-600">juan.perez@email.com</p>
              <p className="text-sm text-gray-500 mt-1">Miembro desde marzo 2024</p>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <Heart className="text-blue-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-blue-600">{savedEvents.length}</p>
              <p className="text-sm text-gray-600">Eventos guardados</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <Calendar className="text-green-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-green-600">5</p>
              <p className="text-sm text-gray-600">Eventos asistidos</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <MapPin className="text-purple-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-purple-600">Santiago</p>
              <p className="text-sm text-gray-600">Ciudad favorita</p>
            </div>
          </div>
        </div>

        {/* Saved Events */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Heart className="text-red-500 mr-2" size={24} />
            Eventos guardados
          </h2>
          
          {savedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Heart className="text-gray-400 mx-auto mb-4" size={48} />
              <p className="text-gray-500">No tienes eventos guardados aún</p>
              <p className="text-sm text-gray-400 mt-2">
                Explora eventos y guarda tus favoritos con el botón ❤️
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
