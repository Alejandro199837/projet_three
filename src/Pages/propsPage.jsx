import React, { useState } from 'react';

const PropsPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Laptop Gaming',
      price: 1200,
      category: 'Tecnología',
      rating: 4.8,
      inStock: true
    },
    {
      id: 2,
      name: 'Auriculares Bluetooth',
      price: 89,
      category: 'Accesorios',
      rating: 4.5,
      inStock: false
    },
    {
      id: 3,
      name: 'Smartphone Pro',
      price: 899,
      category: 'Móviles',
      rating: 4.7,
      inStock: true
    }
  ]);

  const ProductCard = ({ name, price, category, rating, inStock, onToggleStock, onUpdateRating }) => (
    <div className="bg-white p-5 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-bold text-lg text-gray-800">{name}</h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {inStock ? 'Disponible' : 'Agotado'}
        </span>
      </div>
      
      <p className="text-gray-600 mb-2">Categoría: {category}</p>
      <p className="text-2xl font-bold text-blue-600 mb-3">${price}</p>
      
      <div className="flex items-center mb-3">
        <span className="text-sm text-gray-600 mr-2">Calificación:</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onClick={() => onUpdateRating(star)}
              className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-500`}
            >
              ⭐
            </button>
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-600">({rating})</span>
      </div>
      
      <button
        onClick={onToggleStock}
        className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
          inStock 
            ? 'bg-red-500 text-white hover:bg-red-600' 
            : 'bg-green-500 text-white hover:bg-green-600'
        }`}
      >
        {inStock ? 'Marcar como Agotado' : 'Marcar como Disponible'}
      </button>
    </div>
  );

  const toggleStock = (productId) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, inStock: !product.inStock } : product
    ));
  };

  const updateRating = (productId, newRating) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, rating: newRating } : product
    ));
  };

  const availableProducts = products.filter(p => p.inStock).length;

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">📦 Props - Catálogo de Productos</h2>
        <p className="text-gray-700 mb-2">
          Las props permiten pasar datos y funciones a los componentes hijos.
        </p>
        <p className="text-sm text-blue-600">
          Productos disponibles: {availableProducts} de {products.length}
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
            rating={product.rating}
            inStock={product.inStock}
            onToggleStock={() => toggleStock(product.id)}
            onUpdateRating={(rating) => updateRating(product.id, rating)}
          />
        ))}
      </div>
    </div>
  );
};

export default PropsPage;