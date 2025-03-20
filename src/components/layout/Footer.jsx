// src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-gray-700 dark:text-gray-300">
              &copy; 2023-2025 EducaMaster AI. Todos os direitos reservados.
            </span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
              Termos
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
              Privacidade
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
              Suporte
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;