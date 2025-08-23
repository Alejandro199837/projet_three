import React, { useState } from 'react';

const StatePage = () => {
  const [memoryGame, setMemoryGame] = useState({
    cards: ['🐶', '🐱', '🐭', '🐹', '🦊', '🐻', '🐼', '🐨'],
    flipped: [],
    matches: [],
    score: 0
  });
  
  const [calculator, setCalculator] = useState({
    display: '0',
    operation: null,
    waitingForOperand: false,
    previousValue: null
  });

  const shuffleCards = () => {
    const cards = [...memoryGame.cards, ...memoryGame.cards];
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    setMemoryGame({
      cards,
      flipped: [],
      matches: [],
      score: 0
    });
  };

  const flipCard = (index) => {
    if (memoryGame.flipped.length === 2 || memoryGame.flipped.includes(index) || memoryGame.matches.includes(index)) {
      return;
    }

    const newFlipped = [...memoryGame.flipped, index];
    setMemoryGame(prev => ({ ...prev, flipped: newFlipped }));

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (memoryGame.cards[first] === memoryGame.cards[second]) {
        setTimeout(() => {
          setMemoryGame(prev => ({
            ...prev,
            matches: [...prev.matches, first, second],
            flipped: [],
            score: prev.score + 10
          }));
        }, 1000);
      } else {
        setTimeout(() => {
          setMemoryGame(prev => ({ ...prev, flipped: [] }));
        }, 1000);
      }
    }
  };

  const inputCalculator = (value) => {
    if (typeof value === 'number') {
      if (calculator.waitingForOperand) {
        setCalculator({
          ...calculator,
          display: String(value),
          waitingForOperand: false
        });
      } else {
        setCalculator({
          ...calculator,
          display: calculator.display === '0' ? String(value) : calculator.display + value
        });
      }
    } else {
      switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
          if (calculator.previousValue === null) {
            setCalculator({
              ...calculator,
              previousValue: parseFloat(calculator.display),
              waitingForOperand: true,
              operation: value
            });
          }
          break;
        case '=':
          if (calculator.operation && calculator.previousValue !== null && !calculator.waitingForOperand) {
            const current = parseFloat(calculator.display);
            let result;
            switch (calculator.operation) {
              case '+': result = calculator.previousValue + current; break;
              case '-': result = calculator.previousValue - current; break;
              case '*': result = calculator.previousValue * current; break;
              case '/': result = calculator.previousValue / current; break;
              default: return;
            }
            setCalculator({
              display: String(result),
              operation: null,
              waitingForOperand: false,
              previousValue: null
            });
          }
          break;
        case 'C':
          setCalculator({
            display: '0',
            operation: null,
            waitingForOperand: false,
            previousValue: null
          });
          break;
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">🔄 State - Juegos Interactivos</h2>
        <p className="text-gray-700">
          El state permite crear componentes dinámicos que responden a la interacción del usuario.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Memory Game */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">🧠 Juego de Memoria</h3>
            <div className="text-right">
              <div className="text-xl font-bold text-purple-600">Score: {memoryGame.score}</div>
              <button
                onClick={shuffleCards}
                className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
              >
                Nueva Partida
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {memoryGame.cards.map((card, index) => (
              <button
                key={index}
                onClick={() => flipCard(index)}
                className={`h-16 text-2xl rounded-lg border-2 transition-all ${
                  memoryGame.flipped.includes(index) || memoryGame.matches.includes(index)
                    ? 'bg-white border-purple-300'
                    : 'bg-purple-100 border-purple-200 hover:bg-purple-200'
                }`}
              >
                {memoryGame.flipped.includes(index) || memoryGame.matches.includes(index) ? card : '❓'}
              </button>
            ))}
          </div>
        </div>

        {/* Calculator */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">🔢 Calculadora</h3>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <div className="text-right text-2xl font-mono">{calculator.display}</div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {[
              'C', '/', '*', '-',
              '7', '8', '9', '+',
              '4', '5', '6', '+',
              '1', '2', '3', '=',
              '0', '0', '.', '='
            ].slice(0, 16).map((btn, index) => (
              <button
                key={index}
                onClick={() => inputCalculator(isNaN(btn) ? btn : parseInt(btn))}
                className={`h-12 rounded-lg font-semibold ${
                  isNaN(btn) 
                    ? 'bg-orange-500 text-white hover:bg-orange-600' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatePage;