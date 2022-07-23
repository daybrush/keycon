import React, { useRef } from 'react';
import './App.css';
import { useKeycon } from './react-keycon/useKeycon';

function App() {
  const { isKeydown } = useKeycon({
    keys: ["shift"],
  });

  return (
    <div className="App">
      {isKeydown ? "keydown" : "keyup"}
    </div>
  );
}

export default App;
