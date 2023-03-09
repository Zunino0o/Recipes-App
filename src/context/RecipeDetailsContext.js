import { useState } from 'react';

const RecipeDetailsContext = () => {
  const [foodDetails, setfoodDetails] = useState({});
  const [drinkDetails, setDrinkDetails] = useState({});
  const [allFoodRecipes, setAllFoodRecipes] = useState({});
  const [allDrinkRecipes, setAllDrinkRecipes] = useState({});
  const [finishRecipe, setFinishRecipe] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);
  const [removeButtonFinish, setRemoveButtonFinish] = useState(false);

  const recipeDetailsContext = {
    foodDetails,
    setfoodDetails,
    drinkDetails,
    setDrinkDetails,
    allFoodRecipes,
    setAllFoodRecipes,
    allDrinkRecipes,
    setAllDrinkRecipes,
    finishRecipe,
    setFinishRecipe,
    linkCopied,
    setLinkCopied,
    removeButtonFinish,
    setRemoveButtonFinish,
  };

  return { recipeDetailsContext };
};

export default RecipeDetailsContext;
