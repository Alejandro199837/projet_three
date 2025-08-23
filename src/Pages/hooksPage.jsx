import React, { useState, useEffect, useRef } from 'react';

const HooksPage = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [color, setColor] = useState('#3B82F6');
  const intervalRef = useRef(null);
  
  // Timer effect
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Background color effect
  useEffect(() => {
    document.body.style.backgroundColor = `${color}10`;
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [color]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const colors = [
    { name: 'Azul', value: '#3B82F6' },
    { name: 'Verde', value: '#10B981' },
    { name: 'Rojo', value: '#EF4444' },
    { name: 'Púrpura', value: '#8B5CF6' },
    { name: 'Rosa', value: '#EC4899' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-yellow-800 mb-4">🪝 Hooks - Timer y Efectos</h2>
        <p className="text-gray-700">
          Los Hooks como useEffect y useRef permiten manejar efectos secundarios y referencias.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Timer */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">⏱️ Timer con useEffect</h3>
          
          <div className="text-center mb-6">
            <div className="text-6xl font-mono font-bold text-blue-600 mb-4">
              {formatTime(seconds)}
            </div>
            
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  isRunning 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {isRunning ? 'Pausar' : 'Iniciar'}
              </button>
              
              <button
                onClick={() => {
                  setSeconds(0);
                  setIsRunning(false);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>• useEffect para manejar el interval</p>
            <p>• useRef para la referencia del timer</p>
            <p>• Cleanup function para limpiar recursos</p>
          </div>
        </div>

        {/* Color Theme */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">🎨 Selector de Color</h3>
          
          <div className="mb-6">
            <div 
              className="w-full h-24 rounded-lg border-4 border-gray-200 mb-4"
              style={{ backgroundColor: color }}
            ></div>
            
            <p className="text-center font-mono text-lg">{color}</p>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            {colors.map(colorOption => (
              <button
                key={colorOption.value}
                onClick={() => setColor(colorOption.value)}
                className={`p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                  color === colorOption.value 
                    ? 'border-gray-400 bg-gray-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div 
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: colorOption.value }}
                ></div>
                <span>{colorOption.name}</span>
                {color === colorOption.value && <span className="ml-auto">✓</span>}
              </button>
            ))}
          </div>
          
          <div className="text-sm text-gray-600 mt-4">
            <p>• El fondo de la página cambia con el color seleccionado</p>
            <p>• useEffect limpia el estilo al desmontar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HooksPage;