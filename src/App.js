import React from 'react'
import './App.css'
import Nav from './components/Nav'
import Costing from './components/Costing'
import RecipesContextProvider from './contexts/RecipesContext'
import IngredientsContextProvider from './contexts/IngredientsContext'

function App() {

  
  return (
    <RecipesContextProvider>
      <IngredientsContextProvider>
        <div>
          <Nav />
          <Costing />
        </div>
      </IngredientsContextProvider>
    </RecipesContextProvider>
  );
}

export default App;
