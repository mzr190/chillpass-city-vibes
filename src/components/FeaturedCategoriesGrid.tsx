
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trees, Music2, UtensilsCrossed, Palette } from 'lucide-react';

const FeaturedCategoriesGrid = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'aire-libre',
      name: 'Aire libre',
      icon: Trees,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      iconColor: 'text-green-600',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      route: '/aire-libre'
    },
    {
      id: 'fiesta',
      name: 'Fiesta',
      icon: Music2,
      color: 'from-pink-500 to-purple-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700',
      iconColor: 'text-pink-600',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      route: '/fiesta'
    },
    {
      id: 'gastronomia',
      name: 'Gastronomía',
      icon: UtensilsCrossed,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      iconColor: 'text-orange-600',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      route: '/gastronomia'
    },
    {
      id: 'cultura',
      name: 'Cultura',
      icon: Palette,
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      iconColor: 'text-indigo-600',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      route: '/cultura'
    }
  ];

  const handleCategoryHover = (categoryId: string) => {
    setExpandedCategory(categoryId);
  };

  const handleCategoryLeave = () => {
    setExpandedCategory(null);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Eventos Destacados
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explora nuestras categorías más populares y encuentra tu próxima aventura
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isExpanded = expandedCategory === category.id;
            
            return (
              <Link
                key={category.id}
                to={category.route}
                className={`
                  relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 ease-out
                  ${isExpanded ? 'w-80 h-48' : 'w-48 h-32'}
                  hover:shadow-2xl hover:scale-105 transform cursor-pointer
                  ${category.bgColor} border border-white/50
                `}
                onMouseEnter={() => handleCategoryHover(category.id)}
                onMouseLeave={handleCategoryLeave}
                style={{
                  zIndex: isExpanded ? 10 : index,
                }}
              >
                {/* Background Image (visible when expanded) */}
                <div 
                  className={`
                    absolute inset-0 bg-cover bg-center transition-opacity duration-500
                    ${isExpanded ? 'opacity-80' : 'opacity-0'}
                  `}
                  style={{
                    backgroundImage: `url(${category.image})`
                  }}
                />
                
                {/* Gradient overlay */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${category.color} 
                  ${isExpanded ? 'opacity-90' : 'opacity-0'} 
                  transition-opacity duration-500
                `} />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className={`
                    ${isExpanded ? 'text-white scale-110' : category.iconColor} 
                    transition-all duration-500 mb-3
                  `}>
                    <Icon size={isExpanded ? 48 : 32} />
                  </div>
                  
                  <h3 className={`
                    font-bold text-lg
                    ${isExpanded ? 'text-white text-xl' : category.textColor}
                    transition-all duration-500
                  `}>
                    {category.name}
                  </h3>
                  
                  {isExpanded && (
                    <div className="mt-4 opacity-0 animate-fade-in">
                      <p className="text-white/90 text-sm mb-3">
                        Descubre los mejores eventos de {category.name.toLowerCase()}
                      </p>
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                        Ver eventos →
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategoriesGrid;
