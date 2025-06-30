
import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          ¿Qué quieres hacer <span className="text-blue-600">hoy</span>?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Descubre los mejores eventos, panoramas y experiencias en Santiago. 
          Tu buscador inteligente de aventuras urbanas.
        </p>
      </div>
    </section>
  );
};

export default Hero;
