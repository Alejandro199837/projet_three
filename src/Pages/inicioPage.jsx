import React from 'react';
import { useAppContext } from '../Componentes/AppContext.jsx';

const InicioPage = () => {
  const { state } = useAppContext();
  
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-400 to-cyan-500 text-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-4">¡Explora React de forma práctica! 🎯</h2>
        <p className="text-lg mb-4">
          Aprende los conceptos esenciales de React con ejemplos interactivos y dinámicos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-bold text-lg">📦 Props</h3>
            <p className="text-sm">Catálogo de productos interactivo</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-bold text-lg">🔄 State</h3>
            <p className="text-sm">Juego de memoria y calculadora</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-bold text-lg">🪝 Hooks</h3>
            <p className="text-sm">Timer y efectos visuales</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-bold text-lg">♻️ Lifecycle</h3>
            <p className="text-sm">Ciclo de vida de componentes</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-bold text-lg">🌐 Virtual DOM</h3>
            <p className="text-sm">Optimización y rendimiento</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-bold text-lg">🔄 Redux</h3>
            <p className="text-sm">Gestión de estado global</p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">📊 Estado Global Actual</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Usuario:</span>
              <span className="text-blue-600 font-semibold">{state.user?.name || 'Usuario'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Email:</span>
              <span className="text-blue-600">{state.user?.email || 'email@ejemplo.com'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Productos:</span>
              <span className="text-green-600 font-semibold">{state.products?.length || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Puntuación:</span>
              <span className="text-purple-600 font-semibold">{state.gameScore || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Tema:</span>
              <span className="text-indigo-600 font-semibold capitalize">{state.theme || 'light'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Sección:</span>
              <span className="text-orange-600 font-semibold capitalize">{state.currentPage || 'inicio'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">🎯 Funcionalidades</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">✓</span>
              </div>
              <span className="text-gray-700">Gestión de estado con Context API</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <span className="text-gray-700">Componentes interactivos</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">✓</span>
              </div>
              <span className="text-gray-700">Hooks avanzados (useEffect, useRef)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold">✓</span>
              </div>
              <span className="text-gray-700">Animaciones CSS y transiciones</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold">✓</span>
              </div>
              <span className="text-gray-700">Patrones de diseño modernos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
        <h3 className="text-xl font-semibold mb-3 text-purple-800">🚀 ¡Comienza tu aprendizaje!</h3>
        <p className="text-purple-700 mb-4">
          Navega por las diferentes secciones usando el menú superior para explorar conceptos fundamentales de React.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            Interactivo
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            Educativo
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            Práctico
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
            Moderno
          </span>
        </div>
      </div>
    </div>
  );
};

export default InicioPage;