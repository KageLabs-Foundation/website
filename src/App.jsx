import { useState, useEffect } from 'react';
import HomePage from './components/HomePage/HomePage';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      <HomePage />
    </div>
  );
}

export default App;