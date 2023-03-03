import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginProvider from './context/LoginProvider';

function App() {
  return (
    <div className="meals">
      <LoginProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            {/* <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } /> */}
            {/* <Route exact path="/meals/:id-da-receita" component={} />
          <Route exact path="/drinks/:id-da-receita" component={} />
          <Route exact path="/meals/:id-da-receita/in-progress" component={} />
          <Route exact path="/drinks/:id-da-receita/in-progress" component={} />
          <Route exact path="/profile" component={} />
          <Route exact path="/done-recipes" component={} />
          <Route exact path="/favorite-recipes" component={} /> */}
          </Switch>
        </BrowserRouter>
      </LoginProvider>
    </div>
  );
}

export default App;
