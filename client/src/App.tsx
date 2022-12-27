import { useState } from 'react';
import { ImageForm } from './components/imageForm';
import './App.scss';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <ImageForm />
    </div>
  );
}

export default App;
