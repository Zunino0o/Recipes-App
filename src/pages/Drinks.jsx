import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoginContext from '../context/LoginContext';
import { getRecipes } from '../services/fetchAPI';
import Recipes from '../components/Recipes';

function Drinks() {
  const { setType, setRecipes } = useContext(LoginContext);
  const getDrinks = async (type) => {
    // console.log(type);
    const drinkList = await getRecipes(type);
    setRecipes(drinkList.drinks);
    // console.log(type);
  };

  useEffect(() => {
    setType('drinks');
    getDrinks('drinks');
  });
  return (
    <section>
      <Header pageTitle="Drinks" />
      <Recipes />
      <Footer />
    </section>
  );
}
export default Drinks;
