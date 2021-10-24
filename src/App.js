import React from 'react'
import './App.css';
import Nav from './components/Nav';
import Costing from './components/Costing';
import RecipesContextProvider from './contexts/RecipesContext';

function App() {

  
  return (
    <RecipesContextProvider>
      <div>
        <Nav />
        <Costing />
      </div>
    </RecipesContextProvider>
  );
}

export default App;
