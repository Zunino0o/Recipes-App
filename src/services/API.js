const API_URL = 'https://www.themealdb.com/api/json/v1/1/';
const DRINK_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const fetchDetails = async (mealId, drinkId) => {
  const mealPromise = fetch(`${API_URL}lookup.php?i=${mealId}`)
    .then((response) => response.json());
  const drinkPromise = fetch(`${DRINK_API_URL}lookup.php?i=${drinkId}`)
    .then((response) => response.json());

  const [mealDetails, drinkDetails] = await Promise.all([mealPromise, drinkPromise]);
  return { meals: mealDetails.meals[0], drinks: drinkDetails.drinks[0] };
};
