
import React, { useState } from 'react';
import { TreePine, Music, Utensils, Palette } from 'lucide-react';

const FeaturedCategoriesGrid = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'aire-libre',
      name: 'Aire libre',
      icon: TreePine,
      description: 'Actividades al aire libre y deportes',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 'fiesta',
      name: 'Fiesta',
      icon: Music,
      description: 'Vida nocturna y entretenimiento',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 'restaurantes',
      name: 'Restaurantes con descuentos',
      icon: Utensils,
      description: 'Gastronomía con ofertas especiales',
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 'culturales',
      name: 'Culturales',
      icon: Palette,
      description: 'Arte, museos y cultura',
      color: 'from-blue-400 to-blue-600'
    }
  ];

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Eventos destacados
        </h3>
        <p className="text-gray-600 text-center mb-8">
          Explora por categorías
        </p>
        
        <div className="relative">
          {/* Contenedor del abanico */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-2">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              const isHovered = hoveredCategory === category.id;
              const isAnyHovered = hoveredCategory !== null;
              
              return (
                <div
                  key={category.id}
                  className={`
                    relative transform transition-all duration-500 ease-out cursor-pointer
                    ${isHovered ? 'scale-110 z-20' : isAnyHovered ? 'scale-95 opacity-75' : 'scale-100'}
                    ${isHovered ? 'md:-translate-y-4' : ''}
                  `}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  style={{
                    transformOrigin: 'center bottom'
                  }}
                >
                  <div className={`
                    relative h-48 rounded-2xl bg-gradient-to-br ${category.color} 
                    shadow-lg overflow-hidden group
                    ${isHovered ? 'shadow-2xl' : ''}
                  `}>
                    {/* Contenido de la tarjeta */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                      <div className="flex justify-center">
                        <div className={`
                          p-3 rounded-full bg-white/20 backdrop-blur-sm
                          transition-transform duration-300
                          ${isHovered ? 'scale-110' : ''}
                        `}>
                          <IconComponent size={32} />
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <h4 className="font-bold text-lg mb-2">{category.name}</h4>
                        <p className={`
                          text-sm opacity-90 transition-all duration-300
                          ${isHovered ? 'opacity-100 transform translate-y-0' : 'transform translate-y-2'}
                        `}>
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Efecto de brillo en hover */}
                    <div className={`
                      absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300
                      ${isHovered ? 'opacity-100' : ''}
                    `} />
                  </div>

                  {/* Indicador de selección */}
                  <div className={`
                    absolute -bottom-2 left-1/2 transform -translate-x-1/2
                    w-8 h-1 bg-white rounded-full shadow-lg
                    transition-all duration-300
                    ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
                  `} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mensaje adicional cuando se hace hover */}
        <div className="text-center mt-8">
          <p className={`
            text-gray-500 text-sm transition-opacity duration-300
            ${hoveredCategory ? 'opacity-100' : 'opacity-60'}
          `}>
            {hoveredCategory 
              ? 'Haz clic para explorar esta categoría'
              : 'Pasa el cursor sobre una categoría para ver más detalles'
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategoriesGrid;
