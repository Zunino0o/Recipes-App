// import React, { useContext } from 'react';
// import LoginContext from '../context/LoginContext';
// import { getRecipes, getRecipesCategories, getRecipesCategoriesFiltered }
//   from '../services/fetchAPI';

// function Buttons() {
//   const { recipes, setRecipes, type, btnsCategory } = useContext(LoginContext);
//   const number5 = 5;
//   const handleClick = async ({ target }) => {
//     const { name } = target;
//     const filteredList = await getRecipesCategoriesFiltered(type, name);
//     setRecipes(filteredList);
//     console.log(filteredList);
//     console.log(recipes);
//   };

//   return (
//     <div>
//       {btnsCategory.map((e, index) => (index < number5 && (
//         <button
//           type="button"
//           key={ e.strCategory }
//           name={ e.strCategory }
//           data-testid={ `${e.strCategory}-category-filter` }
//           onClick={ handleClick }
//         >
//           { e.strCategory }
//         </button>
//       )))}
//     </div>
//   );
// }

// export default Buttons;
