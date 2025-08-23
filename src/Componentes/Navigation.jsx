import React from 'react';
import { useAppContext } from './AppContext.jsx';

const Navigation = () => {
  const { state, dispatch } = useAppContext();
  
  const pages = [
    { id: 'inicio', name: 'Inicio', icon: '🏠' },
    { id: 'props', name: 'Props', icon: '📦' },
    { id: 'state', name: 'State', icon: '🔄' },
    { id: 'lifecycle', name: 'Ciclo de Vida', icon: '♻️' },
    { id: 'hooks', name: 'Hooks', icon: '🪝' },
    { id: 'virtualdom', name: 'Virtual DOM', icon: '🌐' },
    { id: 'redux', name: 'Redux', icon: '🏪' }
  ];
  
  return (
    <nav className="bg-gray-800 text-white p-4 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2">
          {pages.map(page => (
            <button
              key={page.id}
              onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: page.id })}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                state.currentPage === page.id 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <span>{page.icon}</span>
              <span className="text-sm font-medium">{page.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;