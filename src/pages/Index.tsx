
import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FilterSection from '../components/FilterSection';
import MapSection from '../components/MapSection';
import RecommendedEvents from '../components/RecommendedEvents';
import FeaturedEvents from '../components/FeaturedEvents';
import Footer from '../components/Footer';

const Index = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log('Filtros actualizados:', newFilters);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FilterSection onFilterChange={handleFilterChange} />
      <MapSection filters={filters} />
      <RecommendedEvents />
      <FeaturedEvents />
      <Footer />
    </div>
  );
};

export default Index;
