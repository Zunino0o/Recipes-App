import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [email, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [filter, setFilter] = useState('ingredients');
  const [searchInput, setSearchInput] = useState('');
  const [render, setRender] = useState([]);
  const [type, setType] = useState('meals');
  const [recipes, setRecipes] = useState([]);
  const [recipesArray, setRecipesArray] = useState([]);
  const [btnsCategory, setBtnsCategory] = useState([]);
  const [recommendationData, setRecommendationData] = useState({});
  const [recipeData, setRecipeData] = useState({
    thumb: '',
    title: '',
    category: '',
    ingredient: [],
    measure: [],
    instruction: '',
    video: '',
  });
  const context = useMemo(() => ({
    email,
    setUserEmail,
    userPassword,
    setUserPassword,
    btnDisabled,
    setBtnDisabled,
    searchInput,
    setSearchInput,
    filter,
    setFilter,
    render,
    setRender,
    type,
    setType,
    recipes,
    setRecipes,
    btnsCategory,
    setBtnsCategory,
    recipesArray,
    setRecipesArray,
    recipeData,
    setRecipeData,
    recommendationData,
    setRecommendationData,
  }), [
    email,
    userPassword,
    btnDisabled,
    filter,
    searchInput,
    render,
    type,
    recipes,
    btnsCategory,
    recipesArray,
    recipeData,
    recommendationData,
  ]);

  return (
    <LoginContext.Provider
      value={ context }
    >
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
