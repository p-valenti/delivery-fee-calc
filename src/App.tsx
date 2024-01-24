import React from 'react';
import CountForm from './components/CountForm';

const App: React.FC = () => {
  return (
      <div>
          <CountForm initialPrice={0}/>

      </div>
  );
};

export default App;