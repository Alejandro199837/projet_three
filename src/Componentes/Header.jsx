import React from 'react';
import { useAppContext } from './AppContext.jsx';

const Header = ({ title, subtitle, showUser = true }) => {
  const { state } = useAppContext();
  
  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-purple-100 mb-3">{subtitle}</p>
        {showUser && (
          <div className="text-sm">
            👨‍💻 Conectado como: <span className="font-semibold">{state.user.name}</span>
            <span className="ml-4">🎨 Tema: {state.theme}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;