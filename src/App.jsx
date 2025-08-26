import React, { useReducer } from 'react';
import './App.css';

const AppContext = React.createContext();

const appReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [...state.products, {
                    id: Date.now(),
                    name: action.payload.name,
                    price: action.payload.price,
                    inStock: true
                }]
            };
        case 'TOGGLE_STOCK':
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload ? { ...product, inStock: !product.inStock } : product
                )
            };
        default:
            return state;
    }
};


// Initial State
const initialState = {
  user: { name: 'Desarrollador React', email: 'dev@react.dev' },
  products: [],
  currentPage: 'inicio',
  gameScore: 0,
  theme: 'light'
};

// Custom Hook
const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider');
  }
  return context;
};

// Componentes simples definidos aquí temporalmente
const Header = ({ title, subtitle, showUser = true }) => {
  const { state } = useAppContext();
  
  return (
    <header className="app-header">
      <div className="header-content">
        <h1>React</h1>
        <p>{subtitle}</p>
        {showUser && (
          <div className="user-info">
            👨‍💻 {state.user.name} | 🎨 Tema: {state.theme}
          </div>
        )}
      </div>
    </header>
  );
};

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
    <nav className="app-navigation">
      <div className="nav-links">
        {pages.map(page => (
          <button
            key={page.id}
            onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: page.id })}
            className={`nav-link ${state.currentPage === page.id ? 'active' : ''}`}
          >
            <span>{page.icon}</span>
            <span>{page.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="app-footer">
    <div>
      <p>© React - Alejandro Palacios Palacios</p>

    </div>
  </footer>
);

// Páginas simplificadas
const InicioPage = () => {
  const { state } = useAppContext();
  
  return (
    <div className="page-section">
      <div className="section-header">
        <h2>¡Explora React de forma práctica! 🎯</h2>
        <p>Aprende los conceptos esenciales de React con ejemplos interactivos.</p>
      </div>
      
      <div className="feature-grid">
        <div className="concept-card primary">
          <h3>📦 Props</h3>
          <p>Catálogo de productos interactivo</p>
        </div>
        <div className="concept-card secondary">
          <h3>🔄 State</h3>
          <p>Juego de memoria y calculadora</p>
        </div>
        <div className="concept-card success">
          <h3>🪝 Hooks</h3>
          <p>Timer y efectos visuales</p>
        </div>
        <div className="concept-card warning">
          <h3>♻️ Lifecycle</h3>
          <p>Ciclo de vida de componentes</p>
        </div>
        <div className="concept-card danger">
          <h3>🌐 Virtual DOM</h3>
          <p>Optimización y rendimiento</p>
        </div>
        <div className="concept-card primary">
          <h3>🏪 Redux</h3>
          <p>Gestión de estado global</p>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{state.user?.name?.split(' ')[0] || 'Dev'}</span>
          <span className="stat-label">Usuario</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{state.products?.length || 0}</span>
          <span className="stat-label">Productos</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{state.gameScore || 0}</span>
          <span className="stat-label">Puntuación</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{state.theme}</span>
          <span className="stat-label">Tema</span>
        </div>
      </div>
    </div>
  );
};

const PropsPage = () => {
  const [products, setProducts] = React.useState([
    { id: 1, name: 'Laptop Gaming', price: 1200, category: 'Tecnología', rating: 4.8, inStock: true },
    { id: 2, name: 'Auriculares Bluetooth', price: 89, category: 'Accesorios', rating: 4.5, inStock: false },
    { id: 3, name: 'Smartphone Pro', price: 899, category: 'Móviles', rating: 4.7, inStock: true }
  ]);

  const ProductCard = ({ name, price, category, rating, inStock, onToggleStock, onUpdateRating }) => (
    <div className={`concept-card ${inStock ? 'success' : 'danger'}`}>
      <h4>{name}</h4>
      <p>Categoría: {category}</p>
      <p className="text-primary" style={{fontSize: '1.5rem', fontWeight: 'bold'}}>${price}</p>
      
      <div style={{margin: '10px 0', display: 'flex', alignItems: 'center', gap: '5px'}}>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            onClick={() => onUpdateRating(star)}
            className="btn btn-ghost"
            style={{
              padding: '2px 5px', 
              fontSize: '18px',
              color: star <= rating ? '#fbbf24' : '#d1d5db'
            }}
          >
            ⭐
          </button>
        ))}
        <span>({rating})</span>
      </div>
      
      <button
        onClick={onToggleStock}
        className={`btn ${inStock ? 'btn-danger' : 'btn-success'}`}
      >
        {inStock ? 'Marcar Agotado' : 'Marcar Disponible'}
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

  return (
    <div className="page-section">
      <div className="section-header">
        <h2>📦 Props - Catálogo de Productos</h2>
        <p>Las props permiten pasar datos y funciones a los componentes hijos.</p>
      </div>
      
      <div className="feature-grid">
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

const StatePage = () => {
  const [count, setCount] = React.useState(0);
  const [gameScore, setGameScore] = React.useState(0);
  const [memoryCards] = React.useState(['🐶', '🐱', '🐭', '🐹', '🦊', '🐻']);
  const [flippedCards, setFlippedCards] = React.useState([]);

  return (
    <div className="page-section">
      <div className="section-header">
        <h2>🔄 State - Componentes Dinámicos</h2>
        <p>El state permite crear componentes que responden a la interacción del usuario.</p>
      </div>
      
      <div className="feature-grid">
        <div className="concept-card primary">
          <h3>🔢 Contador</h3>
          <div style={{textAlign: 'center', margin: '20px 0'}}>
            <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#3b82f6'}}>{count}</div>
            <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px'}}>
              <button className="btn btn-success" onClick={() => setCount(count + 1)}>+1</button>
              <button className="btn btn-danger" onClick={() => setCount(count - 1)}>-1</button>
              <button className="btn btn-outline" onClick={() => setCount(0)}>Reset</button>
            </div>
          </div>
        </div>
        
        <div className="concept-card secondary">
          <h3>🎮 Juego Simple</h3>
          <div style={{textAlign: 'center', margin: '20px 0'}}>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6'}}>Score: {gameScore}</div>
            <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px'}}>
              <button className="btn btn-success" onClick={() => setGameScore(gameScore + 10)}>+10</button>
              <button className="btn btn-warning" onClick={() => setGameScore(Math.max(0, gameScore - 5))}>-5</button>
              <button className="btn btn-outline" onClick={() => setGameScore(0)}>Reset</button>
            </div>
          </div>
        </div>
        
        <div className="concept-card success">
          <h3>🧠 Memoria Visual</h3>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', margin: '15px 0'}}>
            {memoryCards.map((card, index) => (
              <button
                key={index}
                className="btn btn-outline"
                onClick={() => {
                  if (flippedCards.includes(index)) {
                    setFlippedCards(flippedCards.filter(i => i !== index));
                  } else {
                    setFlippedCards([...flippedCards, index]);
                  }
                }}
                style={{
                  fontSize: '1.5rem',
                  aspectRatio: '1',
                  backgroundColor: flippedCards.includes(index) ? '#10b981' : '#f3f4f6'
                }}
              >
                {flippedCards.includes(index) ? card : '?'}
              </button>
            ))}
          </div>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={() => setFlippedCards([])}
          >
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
};

const HooksPage = () => {
  const [seconds, setSeconds] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const intervalRef = React.useRef(null);
  
  React.useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="page-section">
      <div className="section-header">
        <h2>🪝 Hooks - Timer y Efectos</h2>
        <p>Los Hooks como useEffect y useRef permiten manejar efectos secundarios y referencias.</p>
      </div>
      
      <div className="concept-card primary">
        <h3>⏱️ Timer con useEffect</h3>
        <div style={{textAlign: 'center', margin: '20px 0'}}>
          <div style={{fontSize: '4rem', fontWeight: 'bold', color: '#3b82f6', fontFamily: 'monospace'}}>
            {formatTime(seconds)}
          </div>
          
          <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px'}}>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`btn ${isRunning ? 'btn-danger' : 'btn-success'}`}
            >
              {isRunning ? 'Pausar' : 'Iniciar'}
            </button>
            
            <button
              onClick={() => {
                setSeconds(0);
                setIsRunning(false);
              }}
              className="btn btn-outline"
            >
              Reset
            </button>
          </div>
        </div>
        
        <div className="alert alert-info">
          <div className="alert-title">💡 Conceptos de Hooks:</div>
          <ul style={{marginTop: '10px', paddingLeft: '20px'}}>
            <li>useEffect para manejar el interval</li>
            <li>useRef para la referencia del timer</li>
            <li>Cleanup function para limpiar recursos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const LifecyclePage = () => {
  const [showComponent, setShowComponent] = React.useState(false);
  const [componentCount, setComponentCount] = React.useState(0);

  const LifecycleDemo = ({ count }) => {
    const [internalCount, setInternalCount] = React.useState(0);
    
    React.useEffect(() => {
      console.log('🎯 Componente montado');
      return () => {
        console.log('🔴 Componente desmontado');
      };
    }, []);

    React.useEffect(() => {
      console.log('🔄 Props actualizadas:', count);
    }, [count]);

    return (
      <div className="concept-card success">
        <h4>Componente Demo</h4>
        <p>Prop count: {count}</p>
        <p>Estado interno: {internalCount}</p>
        <button
          onClick={() => setInternalCount(internalCount + 1)}
          className="btn btn-success btn-sm"
        >
          Incrementar Estado Interno
        </button>
        <div className="alert alert-info" style={{marginTop: '10px', fontSize: '0.8rem'}}>
          Revisa la consola del navegador para ver los logs del ciclo de vida
        </div>
      </div>
    );
  };

  return (
    <div className="page-section">
      <div className="section-header">
        <h2>♻️ Ciclo de Vida - Demo Interactiva</h2>
        <p>Observa cómo los componentes se montan, actualizan y desmontan.</p>
      </div>
      
      <div className="concept-card primary">
        <h3>Control del Componente</h3>
        
        <div style={{display: 'flex', gap: '10px', margin: '20px 0'}}>
          <button
            onClick={() => setShowComponent(!showComponent)}
            className={`btn ${showComponent ? 'btn-danger' : 'btn-success'}`}
          >
            {showComponent ? 'Desmontar' : 'Montar'} Componente
          </button>
          
          <button
            onClick={() => setComponentCount(componentCount + 1)}
            className="btn btn-primary"
            disabled={!showComponent}
          >
            Actualizar Props ({componentCount})
          </button>
        </div>
        
        {showComponent && <LifecycleDemo count={componentCount} />}
        
        {!showComponent && (
          <div style={{textAlign: 'center', padding: '40px', color: '#6b7280'}}>
            El componente no está montado. Haz clic en "Montar Componente" para crearlo.
          </div>
        )}
      </div>
    </div>
  );
};

const VirtualDOMPage = () => {
  const [items, setItems] = React.useState(['Elemento 1', 'Elemento 2', 'Elemento 3']);
  const [renderCount, setRenderCount] = React.useState(0);

  React.useEffect(() => {
    setRenderCount(prev => prev + 1);
  });

  const addItem = () => {
    setItems([...items, `Elemento ${items.length + 1}`]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="page-section">
      <div className="section-header">
        <h2>🌐 Virtual DOM - Optimización</h2>
        <p>React usa el Virtual DOM para optimizar las actualizaciones del DOM real.</p>
        <p><strong>Renders:</strong> {renderCount}</p>
      </div>
      
      <div className="concept-card primary">
        <h3>Lista Dinámica</h3>
        
        <div style={{display: 'flex', gap: '10px', margin: '20px 0'}}>
          <button onClick={addItem} className="btn btn-success">➕ Agregar</button>
          <button onClick={() => setItems([])} className="btn btn-danger">🗑️ Limpiar</button>
        </div>
        
        <div style={{margin: '20px 0'}}>
          {items.map((item, index) => (
            <div 
              key={item}
              style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '10px',
                margin: '5px 0',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}
            >
              <span>{item}</span>
              <button
                onClick={() => removeItem(index)}
                className="btn btn-danger btn-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        
        {items.length === 0 && (
          <div style={{textAlign: 'center', padding: '40px', color: '#6b7280'}}>
            No hay elementos. Agrega algunos para ver el Virtual DOM en acción.
          </div>
        )}
        
        <div className="alert alert-info">
          <div className="alert-title">💡 Conceptos del Virtual DOM:</div>
          <ul style={{marginTop: '10px', paddingLeft: '20px'}}>
            <li>Solo actualiza los elementos que cambiaron</li>
            <li>Usa algoritmo de "diffing" para comparar estados</li>
            <li>Optimiza el rendimiento evitando manipulaciones DOM costosas</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const ReduxPage = () => {
  const { state, dispatch } = useAppContext();
  const [productName, setProductName] = React.useState('');
  const [productPrice, setProductPrice] = React.useState('');

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
    <div className="page-section">
      <div className="section-header">
        <h2>🏪 Redux Pattern - Gestión Global</h2>
        <p>Manejo centralizado del estado usando actions, reducers y dispatch.</p>
      </div>

      <div className="feature-grid">
        <div className="concept-card primary">
          <h3>📦 Agregar Producto</h3>
          
          <div style={{margin: '15px 0'}}>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Nombre del producto..."
              className="form-input"
              style={{marginBottom: '10px'}}
            />
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Precio..."
              className="form-input"
              style={{marginBottom: '10px'}}
            />
            <button onClick={addProduct} className="btn btn-primary">
              Agregar al Inventario
            </button>
          </div>
        </div>

        <div className="concept-card secondary">
          <h3>🎮 Puntuación Global</h3>
          
          <div style={{textAlign: 'center', margin: '20px 0'}}>
            <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#8b5cf6'}}>{state.gameScore}</div>
            
            <div style={{display: 'flex', gap: '5px', justifyContent: 'center', marginTop: '15px'}}>
              <button
                onClick={() => dispatch({ type: 'UPDATE_SCORE', payload: 10 })}
                className="btn btn-success btn-sm"
              >
                +10
              </button>
              <button
                onClick={() => dispatch({ type: 'UPDATE_SCORE', payload: -5 })}
                className="btn btn-danger btn-sm"
              >
                -5
              </button>
              <button
                onClick={() => dispatch({ type: 'RESET_SCORE' })}
                className="btn btn-outline btn-sm"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="concept-card success">
          <h3>🎨 Temas</h3>
          <div style={{margin: '15px 0'}}>
            {themes.map(theme => (
              <button
                key={theme}
                onClick={() => dispatch({ type: 'SET_THEME', payload: theme })}
                className={`btn btn-sm ${state.theme === theme ? 'btn-primary' : 'btn-outline'}`}
                style={{margin: '2px', display: 'block', width: '100%'}}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="concept-card warning">
        <h3>🛍️ Inventario Global</h3>
        
        <div style={{margin: '20px 0'}}>
          {state.products.map(product => (
            <div 
              key={product.id} 
              style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '10px',
                margin: '5px 0',
                backgroundColor: '#f9fafb',
                borderRadius: '8px'
              }}
            >
              <div>
                <span style={{fontWeight: 'bold'}}>{product.name}</span>
                <span style={{marginLeft: '10px', color: '#10b981'}}>${product.price}</span>
                <span 
                  style={{
                    marginLeft: '10px', 
                    padding: '2px 8px', 
                    borderRadius: '12px', 
                    fontSize: '0.75rem',
                    backgroundColor: product.inStock ? '#dcfce7' : '#fecaca',
                    color: product.inStock ? '#166534' : '#991b1b'
                  }}
                >
                  {product.inStock ? 'En Stock' : 'Agotado'}
                </span>
              </div>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_STOCK', payload: product.id })}
                className="btn btn-primary btn-sm"
              >
                Cambiar
              </button>
            </div>
          ))}
        </div>
        
        {state.products.length === 0 && (
          <p style={{textAlign: 'center', color: '#6b7280', padding: '20px'}}>
            No hay productos. ¡Agrega algunos!
          </p>
        )}
      </div>
    </div>
  );
};

// Componente principal de la App
const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Función para renderizar la página actual
  const renderCurrentPage = () => {
    switch (state.currentPage) {
      case 'inicio':
        return <InicioPage />;
      case 'props':
        return <PropsPage />;
      case 'state':
        return <StatePage />;
      case 'lifecycle':
        return <LifecyclePage />;
      case 'hooks':
        return <HooksPage />;
      case 'virtualdom':
        return <VirtualDOMPage />;
      case 'redux':
        return <ReduxPage />;
      default:
        return <InicioPage />;
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="app-container">
        <Header 
          title="🚀 React Learning Hub" 
          subtitle="Explora conceptos fundamentales con ejemplos interactivos"
        />
        
        <Navigation />
        
        <main className="main-content">
          <div className="animate-fade-in">
            {renderCurrentPage()}
          </div>
        </main>
        
        <Footer />
      </div>
    </AppContext.Provider>
  );
};

export default App;