
import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogIn, UserPlus } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
              Chill<span className="text-blue-600">pass</span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/mejores-panoramas" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Mejores panoramas
            </Link>
            <Link to="/descuentos-exclusivos" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Descuentos Exclusivos
            </Link>
            <Link to="/fiestas-imperdibles" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Fiestas Imperdibles
            </Link>
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              <LogIn size={18} />
              <span>Iniciar sesión</span>
            </Link>
            <Link 
              to="/register" 
              className="hidden md:flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <UserPlus size={18} />
              <span>Registrarse</span>
            </Link>
            <Link 
              to="/profile" 
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <User size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
