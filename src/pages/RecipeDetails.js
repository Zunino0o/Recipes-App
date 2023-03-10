import React, { useEffect } from 'react';
import { useHistory, useRouteMatch, useParams } from 'react-router-dom';
import { getRecipesDetails } from '../services/fetchAPI';

function RecipeDetails() {
  const history = useHistory();
  const { path } = useRouteMatch();
  const type = path.includes('/meals') ? 'meals' : 'drinks';
  const id = useParams();
  console.log(path, type, id)

  useEffect(() => {
    getRecipesDetails(id, type)
  }, []);

  return(
    <h1>oi</h1>
  )
}

export default RecipeDetails;
