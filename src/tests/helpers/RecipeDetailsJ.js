// import PropTypes from 'prop-types';
// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import clipboardCopy from 'clipboard-copy';
// import { fetchDetails } from '../services/API';
// import RecipeDetailsContext from '../context/RecipeDetailsContext';
// import RecommendationCard from '../components/RecomendationCard';
// import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
// import oneMeal from '../tests/helpers/MockOneMeal';
// import oneNoCategoryDrink from '../tests/helpers/MockOneDrinks';

// function RecipeDetails({ history }) {
//   const path = history.location.pathname;
//   const typeMelsDrink = history.location.pathname.substring(1).includes('meals')
//     ? 'meals' : 'drinks';
//   const initialRecipe = typeMelsDrink === 'meals'
//     ? oneMeal.meals : oneNoCategoryDrink.drinks;

//   const mealsIngredient = [
//     ['strIngredient1', 'penne rigate'],
//     ['strIngredient2', 'olive oil'],
//     ['strIngredient3', 'garlic'],
//     ['strIngredient4', 'chopped tomatoes'],
//     ['strIngredient5', 'red chile flakes'],
//     ['strIngredient6', 'italian seasoning'],
//     ['strIngredient7', 'basil'],
//     ['strIngredient8', 'Parmigiano-Reggiano'],
//   ];
//   const drinksIngredients = [
//     ['strIngredient1', 'Coffee'],
//     ['strIngredient2', 'Grain alcohol'],
//   ];
//   const initialIngredients = typeMelsDrink === 'meals'
//     ? mealsIngredient : drinksIngredients;
//   const [recipe, setRecipe] = useState(initialRecipe);
//   const [trueFalse, setTrue] = useState(false);
//   const [ingredients, setIngredients] = useState(initialIngredients);
//   const [measures, setMeasures] = useState([]);
//   const [isRecipeDone, setIsRecipeDone] = useState(false);
//   const [recipeId, setRecipeId] = useState('');
//   const [isInProgress, setIsInProgress] = useState(typeMelsDrink === 'meals');
//   const [isCliped, setIsCliped] = useState(false);
//   const [isFavorited, setIsFavorited] = useState(false);

//   const { setApiForType } = useContext(RecipeDetailsContext);
//   const UM = 1;
//   const SEIS = 6;
//   const SETE = 7;
//   const OITO = 8;
//   const type = path.substring(UM, SEIS);
//   useEffect(() => {
//     const getId = async () => {
//       if (type === 'meals') {
//         const idMeals = path.substring(SETE);
//         const responseMeals = await fetchDetails(idMeals, 'meals');
//         setRecipe(responseMeals);
//         const entries = Object.entries(responseMeals[0]);
//         const filteredIngredients = entries
//           .filter((e) => e[0].includes('strIngredient'))
//           .filter((e) => e[1] !== '' && e[1] !== null);
//         const filteredMeasures = entries
//           .filter((e) => e[0].includes('strMeasure'));
//         setIngredients(filteredIngredients);
//         setMeasures(filteredMeasures);
//         setTrue(true);
//         setRecipeId(responseMeals[0].idMeal);
//       }
//       if (type !== 'meals') {
//         const idDrinks = path.substring(OITO);
//         const response = await fetchDetails(idDrinks, 'drinks');
//         setRecipe(response);
//         const entries = Object.entries(response[0]);
//         const filteredIngredients = entries
//           .filter((e) => e[0].includes('strIngredient'))
//           .filter((e) => e[1] !== '' && e[1] !== null);
//         const filteredMeasures = entries
//           .filter((e) => e[0].includes('strMeasure'));
//         setIngredients(filteredIngredients);
//         setMeasures(filteredMeasures);
//         setTrue(true);
//         setRecipeId(response[0].idDrink);
//       }
//     };
//     const response = async () => {
//       const data = await fetchDetails(typeMelsDrink);
//       setApiForType(data);
//     };
//     response();
//     getId();
//   }, [history.location.pathname, path, setApiForType, type, typeMelsDrink]);
//   useEffect(() => {
//     const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
//     const inProgressRecipes = !localStorage.getItem('inProgressRecipes')
//       ? { drinks: {}, meals: {} } : JSON.parse(localStorage.getItem('inProgressRecipes'));
//     const isProgress = inProgressRecipes[typeMelsDrink];
//     const isDone = doneRecipes.some((e) => e.id === recipeId);
//     setIsInProgress(Object.keys(isProgress).includes(recipeId));
//     setIsRecipeDone(isDone);
//   }, [isInProgress, recipe, recipeId, typeMelsDrink]);
//   useEffect(() => {
//     const favoriteRecipes = localStorage.getItem('favoriteRecipes')
//       ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
//     const isRecipeFavorited = favoriteRecipes.some((e) => e.id === recipeId);
//     setIsFavorited(isRecipeFavorited);
//   }, [recipeId]);

//   const handleShare = () => {
//     setIsCliped(true);
//     clipboardCopy(window.location.href);
//   };

//   const handleFavoriteBtn = () => {
//     const idRecipe = typeMelsDrink === 'meals' ? 'idMeal' : 'idDrink';
//     const favoriteRecipes = localStorage.getItem('favoriteRecipes')
//       ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
//     const newFavoriteRecipes = [...favoriteRecipes, {
//       id: recipe[0][idRecipe],
//       type: typeMelsDrink === 'meals' ? 'meal' : 'drink',
//       nationality: recipe[0].strArea || '',
//       category: recipe[0].strCategory || '',
//       alcoholicOrNot: recipe[0].strAlcoholic || '',
//       name: recipe[0].strDrink || recipe[0].strMeal,
//       image: recipe[0].strDrinkThumb || recipe[0].strMealThumb,
//     }];
//     if (!isFavorited) {
//       localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
//       setIsFavorited(true);
//     } else {
//       const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
//       const newFavorited = favorited.filter((e) => e.id !== recipeId);
//       localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorited));
//       setIsFavorited(false);
//     }
//   };
//   return (
//     <div>
//       <h1 data-testid="recipe-details">RecipeDetails</h1>
//       <button
//         type="button"
//         onClick={ handleShare }
//         data-testid="share-btn"
//       >
//         <img
//           src={ shareIcon }
//           alt="share-link"
//         />
//       </button>
//       {isCliped && 'Link copied!'}
//       <button
//         type="button"
//         onClick={ handleFavoriteBtn }
//       >
//         <img
//           data-testid="favorite-btn"
//           src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
//           alt="favorite-link"
//         />
//       </button>
//       {
//         trueFalse
//          && (
//            <div>
//              <img
//                data-testid="recipe-photo"
//                src={ recipe[0].strMealThumb || recipe[0].strDrinkThumb }
//                alt={ recipe[0].strMeal || recipe[0].strDrink }
//              />
//              <h2
//                data-testid="recipe-title"
//              >
//                { recipe[0].strMeal || recipe[0].strDrink }
//              </h2>
//              <p
//                data-testid="recipe-category"
//              >
//                {recipe[0].strAlcoholic || recipe[0].strCategory }
//              </p>
//              <text data-testid="instructions">{recipe[0].strInstructions}</text>
//              <ul>
//                {
//                  ingredients.map((i, index) => (
//                    <li
//                      key={ i[1] }
//                      data-testid={ `${index}-ingredient-name-and-measure` }
//                    >
//                      {`${i[1]} ${measures[index][1] || ''}`}
//                    </li>
//                  ))
//                }
//              </ul>
//              {type === 'meals' && (
//                <iframe
//                  title={ recipe[0].strMeal || recipe[0].strDrink }
//                  data-testid="video"
//                  width="420"
//                  height="315"
//                  src={ recipe[0].strYoutube }
//                />
//              )}
//            </div>
//          )
//       }
//       {
//         !isRecipeDone && (
//           <Link to={ `/${typeMelsDrink}/${recipeId}/in-progress` }>
//             <button
//               className="startRecipe"
//               type="button"
//               data-testid="start-recipe-btn"
//             >
//               {
//                 isInProgress ? 'Continue Recipe' : 'Start Recipe'
//               }
//             </button>
//           </Link>
//         )
//       }
//       <div className="scrolling">
//         <RecommendationCard />
//       </div>
//     </div>
//   );
// }
// RecipeDetails.propTypes = { history: PropTypes.shape.isRequired };
// export default RecipeDetails;
