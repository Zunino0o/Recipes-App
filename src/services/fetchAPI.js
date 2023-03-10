export const getRecipes = async (type) => {
  const url = type === 'meals' ? 'https://www.themealdb.com/api/json/v1/1/search.php?s=' : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const data = await response.json();
  const categories = type === 'meals' ? data.meals : data.drinks;
  return categories;
};

export const getRecipesCategories = async (type) => {
  const url = type === 'meals' ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list' : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(url);
  const data = await response.json();
  const categories = type === 'meals' ? data.meals : data.drinks;
  return categories;
};

export const getRecipesCategoriesFiltered = async (type, filter) => {
  const url = type === 'meals' ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}` : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`;
  const response = await fetch(url);
  const data = await response.json();
  const categories = type === 'meals' ? data.meals : data.drinks;
  return categories;
};
