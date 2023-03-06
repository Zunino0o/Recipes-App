import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';
import MealsRecipesProgress from './pages/MealsRecipesProgress';
import DrinksRecipesProgress from './pages/DrinksRecipesProgress';
import MealsRecipes from './pages/MealsRecipes';
import DrinksRecipes from './pages/DrinksRecipes';
// import Login from './pages/Login';

// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="meals">
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/" component={ Login } /> */}
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
            path="/meals/:id/in-progress"
            component={ MealsRecipesProgress }
          />
          <Route
            exact
            path="/drinks/:id/in-progress"
            component={ DrinksRecipesProgress }
          />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
