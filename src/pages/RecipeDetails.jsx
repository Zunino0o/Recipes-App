import React, { useEffect, useState } from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';
import { getRecipesDetails } from '../services/fetchAPI';

function RecipeDetails() {
  const { path } = useRouteMatch();
  const type = path.includes('/meals') ? 'meals' : 'drinks';
  const { id } = useParams();
  // console.log(path, type, id);

  const [details, setDetails] = useState({});
  const [ing, setIng] = useState([]);
  const [meas, setMeas] = useState([]);

  const organizeData = (det) => {
    const ingred = Object.keys(det[0])
      .filter((k) => k.includes('Ingredient'))
      .map((item) => det[0][item])
      .filter((l) => l !== '');

    const measure = Object.keys(det[0])
      .filter((k) => k.includes('Measure'))
      .map((item) => det[0][item])
      .filter((l) => l !== '');

    const organize = {
      image: det[0].strDrinkThumb || det[0].strMealThumb,
      name: det[0].strDrink || det[0].strMeal,
      category: det[0].strAlcoholic || det[0].strCategory,
      // ingredients: ingred,
      instructions: det[0].strInstructions,
      video: det[0].strYoutube || null,
    };
    console.log(ingred, organize, 'ali');
    setDetails(organize);
    setIng(ingred);
    setMeas(measure);
  };

  const getData = () => {
    getRecipesDetails(id, type)
      .then((data) => organizeData(data));
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(details, 'aqui');

  return (
    <section>
      <img data-testid="recipe-photo" src={ details.image } alt={ details.name } />
      <h1 data-testid="recipe-title">{ details.name }</h1>
      <span data-testid="recipe-category">{ details.category}</span>
      <ul>
        {
          ing.length > 0 && (
            ing.map((i, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ i }
              >
                { `${i} - ${meas[index]}` }
              </li>
            ))
          )
        }
      </ul>
      <p data-testid="instructions">{ details.instructions }</p>
      {
        type === 'meals' && (
          <iframe
            data-testid="video"
            title={ details.name }
            src={ details.video }
            width="420"
            height="315"
          />
        )
      }
    </section>
  );
}

export default RecipeDetails;
