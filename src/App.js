import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';

function App() {
  return (
    <div className="meals">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/meals/:id-da-receita" component={ MealsReceita } />
          <Route
            exact
            path="/drinks/:id-da-receita"
            component={ DrinksReceita }
          />
          <Route
            exact
            path="/meals/:id-da-receita/in-progress"
            component={ MealsReceitaProgress }
          />
          <Route
            exact
            path="/drinks/:id-da-receita/in-progress"
            component={ DrinksReceitaProgress }
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
