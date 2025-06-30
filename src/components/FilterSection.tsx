
import React, { useState, useEffect } from 'react';

interface FilterSectionProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  date: string;
  timeOfDay: 'dia' | 'noche' | '';
  style: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    date: new Date().toISOString().split('T')[0], // Hoy por defecto
    timeOfDay: '',
    style: ''
  });

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    // Si cambia el tipo de día, resetear el estilo
    if (key === 'timeOfDay') {
      newFilters.style = '';
    }
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const dayStyles = ['Aire libre', 'Gastronomía', 'Cultura'];
  const nightStyles = ['Gastronomía', 'Fiesta', 'Cultura'];
  const availableStyles = filters.timeOfDay === 'dia' ? dayStyles : 
                         filters.timeOfDay === 'noche' ? nightStyles : [];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mx-4 -mt-8 relative z-10 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        {/* Tipo (Día/Noche) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
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

        {/* Estilo (condicionado) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Estilo</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.style}
            onChange={(e) => updateFilter('style', e.target.value)}
            disabled={!filters.timeOfDay}
          >
            <option value="">Seleccionar estilo</option>
            {availableStyles.map(style => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
