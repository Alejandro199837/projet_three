import React, { useState, useEffect } from 'react';

const VirtualDOMPage = () => {
  const [items, setItems] = useState(['Elemento 1', 'Elemento 2', 'Elemento 3']);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount(prev => prev + 1);
  });

  const addItem = () => {
    setItems([...items, `Elemento ${items.length + 1}`]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const shuffleItems = () => {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setItems(shuffled);
  };

  return (
    <div className="space-y-6">
      <div className="bg-cyan-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-cyan-800 mb-4">🌐 Virtual DOM - Optimización</h2>
        <p className="text-gray-700 mb-2">
          React usa el Virtual DOM para optimizar las actualizaciones del DOM real.
        </p>
        <p className="text-sm text-cyan-600">
          Renders del componente: {renderCount}
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Lista Dinámica</h3>
        
        <div className="flex gap-2 mb-6">
          <button
            onClick={addItem}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            ➕ Agregar
          </button>
          <button
            onClick={shuffleItems}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            🔀 Mezclar
          </button>
          <button
            onClick={() => setItems([])}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            🗑️ Limpiar
          </button>
        </div>
        
        <div className="space-y-2 mb-6">
          {items.map((item, index) => (
            <div 
              key={item}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border animate-pulse"
              style={{ animationDuration: '2s' }}
            >
              <span className="font-medium">{item}</span>
              <button
                onClick={() => removeItem(index)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        
        {items.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay elementos. Agrega algunos para ver el Virtual DOM en acción.
          </div>
        )}
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">💡 Conceptos del Virtual DOM:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Solo actualiza los elementos que cambiaron</li>
            <li>• Usa algoritmo de "diffing" para comparar estados</li>
            <li>• Optimiza el rendimiento evitando manipulaciones DOM costosas</li>
            <li>• Las keys ayudan a identificar elementos únicos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VirtualDOMPage;