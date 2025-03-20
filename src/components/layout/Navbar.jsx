// src/components/layout/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">EducaMaster AI</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Link to="/dashboard" className="px-3 py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                Dashboard
              </Link>
              <Link to="/quiz" className="px-3 py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                Quizzes
              </Link>
              <Link to="/flashcards" className="px-3 py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                Flashcards
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link to="/profile" className="px-3 py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Perfil
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;