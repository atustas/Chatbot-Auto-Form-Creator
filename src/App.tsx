import React from 'react';
import Chatbot from './Chatbot';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="chatbot-header">Chatbot</h1>
        <Chatbot />
      </header>
    </div>
  );
};

export default App;
