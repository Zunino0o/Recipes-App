import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/RecipeDetails.css';
import PropTypes from 'prop-types';
import LoginContext from '../context/LoginContext';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import {
  fetchMealsDetails,
  fetchDrinksDetails,
  fetchDrinks,
  fetchMeals,
} from '../services/fetchAPI';
import fetchRecipeId from '../services/fetchRecipeId';

function RecipeDetails(props) {
  const { match: matchProps } = props;
  const { params: { id: recipeId }, path: matchPath } = matchProps;
  const url = window.location.href.replace('/in-progress', '');
  const type = url.split('/')[3];
  const IdRecipe = url.split('/')[4];
  const [recipe, setRecipe] = useState('');
  const history = useHistory();
  const {
    recipeData,
    setRecipeData,
    recommendationData,
    setRecommendationData,
  } = useContext(LoginContext);

  const MAX_RECOMMENDATIONS = 6;
  const MEALS_PATH = '/meals/:id';
  const DRINKS_PATH = '/drinks/:id';

  const getTestID = (prefix, index) => `${index}-${prefix}`;

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const response = matchPath === MEALS_PATH
        ? await fetchMealsDetails(recipeId)
        : await fetchDrinksDetails(recipeId);

      const objectApi = response?.[matchPath.includes('meals') ? 'meals' : 'drinks']?.[0];

      const ingredients = Object.entries(objectApi ?? {})
        .filter(([key]) => key.startsWith('strIngredient') && objectApi[key])
        .map(([, value]) => value);

      const measures = Object.entries(objectApi ?? {})
        .filter(([key]) => key.startsWith('strMeasure') && objectApi[key])
        .map(([, value]) => value);

      const category = objectApi?.strAlcoholic
      || objectApi?.strCategory
      || 'No category found';

      const newRecipeData = {
        thumb: objectApi?.[`str${matchPath.includes('meals') ? 'Meal' : 'Drink'}Thumb`],
        title: objectApi?.[`str${matchPath.includes('meals') ? 'Meal' : 'Drink'}`],
        category,
        ingredient: ingredients,
        measure: measures,
        instruction: objectApi?.strInstructions,
        video: objectApi?.strYoutube || objectApi?.strVideo || '',
      };

      setRecipeData(newRecipeData);
    };
    fetchRecipeDetails();
  }, [recipeId, matchPath, setRecipeData]);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        let response;
        if (matchPath === MEALS_PATH) {
          response = await fetchDrinks('');
          setRecommendationData(response.drinks);
        } else if (matchPath === DRINKS_PATH) {
          response = await fetchMeals('');
          setRecommendationData(response.meals);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecommendation();
  }, [matchPath, setRecommendationData]);

  useEffect(() => {
    async function fetch() {
      setRecipe(await fetchRecipeId(IdRecipe, type));
    }
    fetch();
  }, [IdRecipe, type]);

  return (
    <div>
      <h1 data-testid="recipe-title">{ recipeData.title }</h1>
      <div className="button-container">
        <FavoriteButton recipe={ recipe[type] } />
        <ShareButton
          url={ url }
          dataTestid="share-btn"
        />
      </div>
      <img
        data-testid="recipe-photo"
        src={ recipeData.thumb }
        alt={ recipeData.thumb }
        width="300"
      />
      <p data-testid="recipe-category">{ recipeData.category }</p>
      <ul>
        {recipeData.ingredient.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ getTestID('ingredient-name-and-measure', index) }
          >
            {`${ingredient}-${recipeData.measure[index]}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">
        Modo de preparo:
        { recipeData.instruction }
      </p>
      {recipeData.video && (
        <div>
          <iframe
            title="video"
            data-testid="video"
            width="420"
            height="345"
            src={ recipeData.video }
          />
        </div>
      )}
      {recommendationData && recommendationData.length > 0 && (
        <div>
          <h2>Recomendações:</h2>
          <div className="recommendations-container">
            {recommendationData.slice(0, MAX_RECOMMENDATIONS)
              .map((recommendation, index) => (
                <div
                  key={ recommendation.idDrink || recommendation.idMeal }
                  className="recommendation-card"
                  data-testid={ `${index}-recommendation-card` }
                >
                  <img
                    src={ matchPath === DRINKS_PATH
                      ? recommendation.strMealThumb
                      : recommendation.strDrinkThumb }
                    alt={ matchPath === DRINKS_PATH
                      ? recommendation.strMeal
                      : recommendation.strDrink }
                  />
                  <p
                    className="recommendation-title"
                    data-testid={ `${index}-recommendation-title` }
                  >
                    { matchPath === DRINKS_PATH
                      ? recommendation.strMeal
                      : recommendation.strDrink }
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
      <button
        type="button"
        className="start-btn"
        data-testid="start-recipe-btn"
        onClick={ () => {
          if (matchPath.includes('/meals')) {
            history.push(`/meals/${recipeId}/in-progress`);
          } else if (matchPath.includes('/drinks')) {
            history.push(`/drinks/${recipeId}/in-progress`);
          }
        } }
      >
        Start Recipe
      </button>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeDetails;
