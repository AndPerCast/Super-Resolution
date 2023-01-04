import { useState } from 'react';
import { ImageForm } from './components/imageForm';
import { Navbar } from './components/navigation/navbar';
import './App.scss';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <link href='https://fonts.googleapis.com/css?family=Lexend' rel='stylesheet' />
      <Navbar />
      <ImageForm />
    </div>
  );
}

export default App;
