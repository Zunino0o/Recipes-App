import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';

// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="meals">

      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/" component={ <div /> } /> */}
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/meals/:id-da-receita" component={ <div /> } />
          <Route exact path="/drinks/:id-da-receita" component={ <div /> } />
          <Route exact path="/meals/:id-da-receita/in-progress" component={ <div /> } />
          <Route exact path="/drinks/:id-da-receita/in-progress" component={ <div /> } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
