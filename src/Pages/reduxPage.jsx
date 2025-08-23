import React, { useState } from 'react';
import { useAppContext } from '../Componentes/AppContext.jsx';

const ReduxPage = () => {
  const { state, dispatch } = useAppContext();
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const addProduct = () => {
    if (productName.trim() && productPrice.trim()) {
      dispatch({ 
        type: 'ADD_PRODUCT', 
        payload: { 
          name: productName, 
          price: parseFloat(productPrice) 
        } 
      });
      setProductName('');
      setProductPrice('');
    }
  };

  const themes = ['light', 'dark', 'colorful'];

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">🔄 Redux Pattern - Gestión Global</h2>
        <p className="text-gray-700">
          Manejo centralizado del estado usando actions, reducers y dispatch.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Add Product */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">📦 Agregar Producto</h3>
          
          <div className="space-y-3 mb-4">
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Nombre del producto..."
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Precio..."
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <button 
              onClick={addProduct}
              className="w-full px-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
              Agregar al Inventario
            </button>
          </div>
        </div>

        {/* Game Score */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">🎮 Puntuación Global</h3>
          
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-indigo-600 mb-4">{state.gameScore}</div>
            
            <div className="flex justify-center gap-2">
              <button
                onClick={() => dispatch({ type: 'UPDATE_SCORE', payload: 10 })}
                className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                +10
              </button>
              <button
                onClick={() => dispatch({ type: 'UPDATE_SCORE', payload: -5 })}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                -5
              </button>
              <button
                onClick={() => dispatch({ type: 'RESET_SCORE' })}
                className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">🛒 Inventario Global</h3>
          <div className="flex gap-2">
            <span className="text-sm text-gray-600">Tema:</span>
            {themes.map(theme => (
              <button
                key={theme}
                onClick={() => dispatch({ type: 'SET_THEME', payload: theme })}
                className={`px-3 py-1 rounded text-sm ${
                  state.theme === theme 
                    ? 'bg-indigo-500 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {state.products.map(product => (
            <div key={product.id} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
              <div>
                <span className="font-semibold">{product.name}</span>
                <span className="ml-3 text-green-600 font-bold">${product.price}</span>
                <span className={`ml-3 px-2 py-1 rounded-full text-xs ${
                  product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'En Stock' : 'Agotado'}
                </span>
              </div>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_STOCK', payload: product.id })}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Cambiar Stock
              </button>
            </div>
          ))}
        </div>
        
        {state.products.length === 0 && (
          <p className="text-gray-500 text-center py-8">No hay productos en el inventario. ¡Agrega algunos!</p>
        )}

        <div className="bg-indigo-50 p-4 rounded-lg mt-4">
          <h4 className="font-semibold mb-2">📊 Estado Global:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Productos:</span>
              <div className="text-lg font-bold text-indigo-600">{state.products.length}</div>
            </div>
            <div>
              <span className="font-medium">Puntuación:</span>
              <div className="text-lg font-bold text-indigo-600">{state.gameScore}</div>
            </div>
            <div>
              <span className="font-medium">Tema:</span>
              <div className="text-lg font-bold text-indigo-600">{state.theme}</div>
            </div>
            <div>
              <span className="font-medium">Usuario:</span>
              <div className="text-lg font-bold text-indigo-600">{state.user?.name?.split(' ')[0] || 'Usuario'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReduxPage;