
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

  const inputClasses = "w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Título de la sección */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Explorar eventos</h2>
          <p className="text-gray-600">Filtra por fecha, tipo y estilo para encontrar tu evento perfecto</p>
        </div>

        {/* Filtros */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fecha */}
            <div>
              <label className={labelClasses}>Fecha</label>
              <input
                type="date"
                className={inputClasses}
                value={filters.date}
                onChange={(e) => updateFilter('date', e.target.value)}
              />
            </div>

            {/* Tipo (Día/Noche) */}
            <div>
              <label className={labelClasses}>Tipo</label>
              <select
                className={inputClasses}
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
              <label className={labelClasses}>Estilo</label>
              <select
                className={`${inputClasses} ${!filters.timeOfDay ? 'opacity-50 cursor-not-allowed' : ''}`}
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
      </div>
    </div>
  );
};

export default FilterSection;
