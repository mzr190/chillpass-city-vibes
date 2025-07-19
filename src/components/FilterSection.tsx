import React, { useState, useEffect } from 'react';
interface FilterSectionProps {
  onFilterChange: (filters: FilterState) => void;
}
interface FilterState {
  date: string;
  style: string;
}
const FilterSection: React.FC<FilterSectionProps> = ({
  onFilterChange
}) => {
  const [filters, setFilters] = useState<FilterState>({
    date: new Date().toISOString().split('T')[0],
    style: ''
  });
  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  const availableStyles = ['Aire libre', 'Gastronomía', 'Cultura', 'Fiesta'];
  const inputClasses = "w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";
  return <div className="bg-gray-50 py-[17px] my-[21px]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Título de la sección */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Explorar eventos en el mapa</h2>
          <p className="text-gray-600">Filtra por fecha y estilo para encontrar tu panorama perfecto</p>
        </div>

        {/* Filtros */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fecha */}
            <div>
              <label className={labelClasses}>Fecha</label>
              <input type="date" className={inputClasses} value={filters.date} onChange={e => updateFilter('date', e.target.value)} />
            </div>

            {/* Estilo */}
            <div>
              <label className={labelClasses}>Estilo</label>
              <select className={inputClasses} value={filters.style} onChange={e => updateFilter('style', e.target.value)}>
                <option value="">Seleccionar estilo</option>
                {availableStyles.map(style => <option key={style} value={style}>
                    {style}
                  </option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default FilterSection;