import React, { useState, useEffect } from 'react';

const LifecyclePage = () => {
  const [showComponent, setShowComponent] = useState(false);
  const [componentCount, setComponentCount] = useState(0);

  const LifecycleDemo = ({ count }) => {
    const [internalCount, setInternalCount] = useState(0);
    
    useEffect(() => {
      console.log('🎯 Componente montado');
      return () => {
        console.log('🔴 Componente desmontado');
      };
    }, []);

    useEffect(() => {
      console.log('🔄 Props actualizadas:', count);
    }, [count]);

    return (
      <div className="bg-green-100 p-4 rounded-lg border-2 border-green-300">
        <h4 className="font-semibold mb-2">Componente Demo</h4>
        <p>Prop count: {count}</p>
        <p>Estado interno: {internalCount}</p>
        <button
          onClick={() => setInternalCount(internalCount + 1)}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 mt-2"
        >
          Incrementar Estado Interno
        </button>
        <p className="text-xs text-green-600 mt-2">
          Revisa la consola del navegador para ver los logs del ciclo de vida
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-green-800 mb-4">♻️ Ciclo de Vida - Demo Interactiva</h2>
        <p className="text-gray-700">
          Observa cómo los componentes se montan, actualizan y desmontan.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Control del Componente</h3>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setShowComponent(!showComponent)}
            className={`px-4 py-2 rounded-lg font-medium ${
              showComponent 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {showComponent ? 'Desmontar Componente' : 'Montar Componente'}
          </button>
          
          <button
            onClick={() => setComponentCount(componentCount + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={!showComponent}
          >
            Actualizar Props ({componentCount})
          </button>
        </div>
        
        {showComponent && <LifecycleDemo count={componentCount} />}
        
        {!showComponent && (
          <div className="text-center py-8 text-gray-500">
            El componente no está montado. Haz clic en "Montar Componente" para crearlo.
          </div>
        )}
      </div>
    </div>
  );
};

export default LifecyclePage;