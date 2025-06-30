
import React, { useState } from 'react';
import { Filter } from 'lucide-react';

interface FilterSectionProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  date: string;
  timeOfDay: 'dia' | 'noche' | '';
  category: string;
  style: string[];
}

const FilterSection: React.FC<FilterSectionProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    date: '',
    timeOfDay: '',
    category: '',
    style: []
  });

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleStyle = (style: string) => {
    const newStyles = filters.style.includes(style)
      ? filters.style.filter(s => s !== style)
      : [...filters.style, style];
    updateFilter('style', newStyles);
  };

  const nightCategories = ['cultura', 'fiesta', 'restaurante'];
  const dayCategories = ['comer', 'aire libre', 'cultura'];
  const styles = ['Social', 'Gastronomía', 'Techno', 'Cultural', 'Urbano', 'Aire libre'];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mx-4 -mt-8 relative z-10 max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <Filter className="text-blue-600 mr-2" size={20} />
        <h3 className="text-lg font-semibold text-gray-900">Personaliza tu búsqueda</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Fecha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
          <input
            type="date"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.date}
            onChange={(e) => updateFilter('date', e.target.value)}
          />
        </div>

        {/* Día o Noche */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Momento</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.timeOfDay}
            onChange={(e) => updateFilter('timeOfDay', e.target.value as 'dia' | 'noche' | '')}
          >
            <option value="">Seleccionar</option>
            <option value="dia">Día</option>
            <option value="noche">Noche</option>
          </select>
        </div>

        {/* Categoría (depende de día/noche) */}
        {filters.timeOfDay && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}
            >
              <option value="">Seleccionar</option>
              {(filters.timeOfDay === 'noche' ? nightCategories : dayCategories).map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Estilos */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Estilo</label>
          <div className="relative">
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none">
              <option>Seleccionar estilos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Estilos como chips */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {styles.map(style => (
            <button
              key={style}
              onClick={() => toggleStyle(style)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filters.style.includes(style)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
