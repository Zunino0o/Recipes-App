import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import MealsRecipes from './pages/MealsRecipes';
import DrinksRecipes from './pages/DrinksRecipes';
import MealsRecipesProgress from './pages/MealsRecipesProgress';
import DrinksRecipesProgress from './pages/DrinksRecipesProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import LoginProvider from './context/LoginProvider';

function App() {
  return (
    <div className="meals">
      <LoginProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/meals" component={ Meals } />
            <Route exact path="/drinks" component={ Drinks } />
            <Route exact path="/meals/:id-da-receita" component={ MealsRecipes } />
            <Route
              exact
              path="/drinks/:id-da-receita"
              component={ DrinksRecipes }
            />
            <Route
              exact
              path="/meals/:id-da-receita/in-progress"
              component={ MealsRecipesProgress }
            />
            <Route
              exact
              path="/drinks/:id-da-receita/in-progress"
              component={ DrinksRecipesProgress }
            />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/done-recipes" component={ DoneRecipes } />
            <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          </Switch>
        </BrowserRouter>
      </LoginProvider>
    </div>
  );
}
export default App;
