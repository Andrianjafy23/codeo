import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Vatany from './Components/Vatany';
import Logika from './Components/Logika';
import Right from './Components/Right';
import Login from './Components/Login';
import Connecté from './Components/Connecté';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState({ category: '', topic: '' });

  // Fonction pour mettre à jour la sélection de sujet à partir de Right
  const handleSelectTopic = (category, topic) => {
    setSelectedTopic({ category, topic });
  };

  return (
    <div className='vatany'>
      <Logika searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className='tab'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/codeo" element={<CodePage searchQuery={searchQuery} selectedTopic={selectedTopic} onSelectTopic={handleSelectTopic} />} />
          <Route path="/connecter" element={<Connecté />} />
        </Routes>
      </div>
    </div>
  );
}

// Page combinant Right et Vatany
const CodePage = ({ searchQuery, selectedTopic, onSelectTopic }) => (
  <div className='va'>
    <Right onSelect={onSelectTopic} />
    <Vatany searchQuery={searchQuery} selectedTopic={selectedTopic} />
  </div>
);

export default App;
