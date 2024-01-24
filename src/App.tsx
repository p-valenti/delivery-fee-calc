import React from 'react';
import CountForm from './components/CountForm';
import './App.css';

const App: React.FC = () => {
  return (
      <div>
          <CountForm initialPrice={0}/>

      </div>
  );
};

export default App;