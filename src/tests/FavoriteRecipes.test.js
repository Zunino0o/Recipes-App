import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouter from './RenderWithRouter';
import mockRecipes from './helper/mockData';

const FILTER_BY_MEAL_BTN = 'filter-by-meal-btn';
const FAVORITE_CARD = 'favorite-card';

describe('FavoriteRecipes component', () => {
  const setDefault = (data) => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(data));
  };

  it('renders the header with the correct title', () => {
    const { getByRole } = renderWithRouter(<FavoriteRecipes />);
    expect(getByRole('heading')).toHaveTextContent('FavoriteRecipes');
  });

  it('render all components', () => {
    setDefault(mockRecipes);

    const { getByTestId } = renderWithRouter(<FavoriteRecipes />);
    expect(getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(getByTestId(FILTER_BY_MEAL_BTN)).toBeInTheDocument();
    expect(getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(getByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
    expect(getByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(getByTestId('1-horizontal-top-text')).toBeInTheDocument();
    expect(getByTestId('1-horizontal-name')).toBeInTheDocument();
    expect(getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    expect(getByTestId('1-horizontal-favorite-btn')).toBeInTheDocument();
  });

  it('renders all the recipe cards by default', () => {
    setDefault(mockRecipes);

    const {
      getAllByTestId,
    } = renderWithRouter(<FavoriteRecipes />);
    expect(getAllByTestId(FAVORITE_CARD)).toHaveLength(2);
    expect(getAllByTestId(FAVORITE_CARD)[0]).toHaveTextContent('Caipirinha');
    expect(getAllByTestId(FAVORITE_CARD)[1]).toHaveTextContent('HotDog');
  });

  it('filters the recipe cards by meal', () => {
    setDefault(mockRecipes);

    const {
      getAllByTestId,
      getByTestId,
    } = renderWithRouter(<FavoriteRecipes />);
    fireEvent.click(getByTestId(FILTER_BY_MEAL_BTN));

    expect(getAllByTestId(FAVORITE_CARD)).toHaveLength(1);
    expect(getByTestId(FAVORITE_CARD)).toBeInTheDocument();
    expect(getByTestId(FAVORITE_CARD)).toHaveTextContent('HotDog');
    expect(getByTestId(FAVORITE_CARD)).not.toHaveTextContent('Caipirinha');
  });

  it('filters the recipe cards by drink', () => {
    setDefault(mockRecipes);

    const {
      getAllByTestId,
      getByTestId,
    } = renderWithRouter(<FavoriteRecipes />);
    fireEvent.click(getByTestId('filter-by-drink-btn'));

    expect(getAllByTestId(FAVORITE_CARD)).toHaveLength(1);
    expect(getByTestId(FAVORITE_CARD)).toBeInTheDocument();
    expect(getByTestId(FAVORITE_CARD)).not.toHaveTextContent('HotDog');
    expect(getByTestId(FAVORITE_CARD)).toHaveTextContent('Caipirinha');
  });

  it('clears the filters when clicking the All button', () => {
    setDefault(mockRecipes);

    const {
      getAllByTestId,
      getByTestId,
    } = renderWithRouter(<FavoriteRecipes />);

    expect(getAllByTestId(FAVORITE_CARD)).toHaveLength(2);

    fireEvent.click(getByTestId(FILTER_BY_MEAL_BTN));

    expect(getAllByTestId(FAVORITE_CARD)).toHaveLength(1);

    fireEvent.click(getByTestId('filter-by-all-btn'));

    expect(getAllByTestId(FAVORITE_CARD)).toHaveLength(2);
  });

  it('handleShare test', async () => {
    navigator.clipboard = {
      writeText: jest.fn(() => Promise.resolve()),
    };

    setDefault(mockRecipes);

    const {
      getByText,
      getByTestId,
    } = renderWithRouter(<FavoriteRecipes />);

    fireEvent.click(getByTestId('0-horizontal-share-btn'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/123');
    await waitFor(() => {
      expect(getByText('Link copied!')).toBeInTheDocument();
    });
  });
});

// IAs tests

// describe('FavoriteRecipes tests', () => {
//   test('FavoriteCard component renders correctly', () => {
//     const recipe = {
//       id: 1,
//       type: 'meal',
//       nationality: 'Italian',
//       category: 'Pasta',
//       name: 'Spaghetti Carbonara',
//       image: 'https://www.example.com/spaghetti-carbonara.jpg',
//     };
//     const index = 0;
//     const handler = jest.fn();
//     render(
//       <FavoriteCard
//         recipe={ recipe }
//         index={ index }
//         handler={ handler }
//       />,
//     );

//     const favoriteCard = screen.getByTestId(FAVORITE_CARD);
//     expect(favoriteCard).toBeInTheDocument();

//     const image = screen.getByTestId(`${index}-horizontal-image`);
//     expect(image).toHaveAttribute('src', recipe.image);
//     expect(image).toHaveAttribute('alt', recipe.name);

//     const name = screen.getByTestId(`${index}-horizontal-name`);
//     expect(name).toHaveTextContent(recipe.name);

//     const topText = screen.getByTestId(`${index}-horizontal-top-text`);
//     expect(topText).toHaveTextContent(`${recipe.nationality} - ${recipe.category}`);

//     const shareBtn = screen.getByTestId(`${index}-horizontal-share-btn`);
//     expect(shareBtn).toBeInTheDocument();

//     const favBtn = screen.getByTestId(`${index}-horizontal-favorite-btn`);
//     expect(favBtn).toBeInTheDocument();
//   });

//   test('handleShare function works correctly', async () => {
//     const recipe = {
//       id: 1,
//       type: 'meal',
//       nationality: 'Italian',
//       category: 'Pasta',
//       name: 'Spaghetti Carbonara',
//       image: 'https://www.example.com/spaghetti-carbonara.jpg',
//     };
//     const index = 0;
//     const handler = jest.fn();
//     render(
//       <FavoriteCard
//         recipe={ recipe }
//         index={ index }
//         handler={ handler }
//       />,
//     );

//     const shareBtn = screen.getByTestId(`${index}-horizontal-share-btn`);
//     expect(shareBtn).toBeInTheDocument();

//     const clipboardText = `http://localhost:3000/${recipe.type}s/${recipe.id}`;
//     const writeTextMock = jest.fn();
//     Object.assign(navigator, {
//       clipboard: {
//         writeText: writeTextMock,
//       },
//     });

//     fireEvent.click(shareBtn);
//     expect(writeTextMock).toHaveBeenCalledWith(clipboardText);

//     await waitFor(() => expect(screen.getByText('Link copied!')).toBeInTheDocument());

//     await waitFor(() => expect(screen.queryByText('Link copied!')).not.toBeInTheDocument());
//   });

//   test('handleFav function works correctly', () => {
//     const recipe = {
//       id: 1,
//       type: 'meal',
//       nationality: 'Italian',
//       category: 'Pasta',
//       name: 'Spaghetti Carbonara',
//       image: 'https://www.example.com/spaghetti-carbonara.jpg',
//     };
//     const index = 0;
//     const handler = jest.fn();
//     render(
//       <FavoriteCard
//         recipe={ recipe }
//         index={ index }
//         handler={ handler }
//       />,
//     );

//     const favBtn = screen.getByTestId(`${index}-horizontal-favorite-btn`);
//     expect(favBtn).toBeInTheDocument();

//     const localStorageData = [{ id: 1 }, { id: 2 }, { id: 3 }];
//     localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageData));

//     fireEvent.click(favBtn);
//     expect(localStorage.getItem('favoriteRecipes')).toEqual(JSON.stringify([{ id: 2 }, { id: 3 }]));

//     expect(handler).toHaveBeenCalledWith([{ id: 2 }, { id: 3 }]);
//   });

//   test('FavoriteRecipes component renders correctly', () => {
//     const favoriteRecipes = [
//       {
//         id: 1,
//         type: 'meal',
//         nationality: 'Italian',
//         category: 'Pasta',
//         name: 'Spaghetti Carbonara',
//         image: 'https://www.example.com/spaghetti-carbonara.jpg',
//       },
//       {
//         id: 2,
//         type: 'drink',
//         category: 'Cocktail',
//         alcoholicOrNot: 'Alcoholic',
//         name: 'Margarita',
//         image: 'https://www.example.com/margarita.jpg',
//       },
//     ];
//     localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

//     render(<FavoriteRecipes />);

//     const pageTitle = screen.getByRole('heading', { name: 'FavoriteRecipes' });
//     expect(pageTitle).toBeInTheDocument();

//     const allBtn = screen.getByTestId('filter-by-all-btn');
//     expect(allBtn).toBeInTheDocument();

//     const mealBtn = screen.getByTestId(FILTER_BY_MEAL_BTN);
//     expect(mealBtn).toBeInTheDocument();

//     const drinkBtn = screen.getByTestId('filter-by-drink-btn');
//     expect(drinkBtn).toBeInTheDocument();

//     const favoriteCards = screen.getAllByTestId(FAVORITE_CARD);
//     expect(favoriteCards).toHaveLength(2);
//   });

//   test('handleFilter function works correctly', () => {
//     const favoriteRecipes = [
//       {
//         id: 1,
//         type: 'meal',
//         nationality: 'Italian',
//         category: 'Pasta',
//         name: 'Spaghetti Carbonara',
//         image: 'https://www.example.com/spaghetti-carbonara.jpg',
//       },
//       {
//         id: 2,
//         type: 'drink',
//         category: 'Cocktail',
//         alcoholicOrNot: 'Alcoholic',
//         name: 'Margarita',
//         image: 'https://www.example.com/margarita.jpg',
//       },
//     ];
//     localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

//     render(<FavoriteRecipes />);

//     const allBtn = screen.getByTestId('filter-by-all-btn');
//     expect(allBtn).toBeInTheDocument();

//     const mealBtn = screen.getByTestId(FILTER_BY_MEAL_BTN);
//     expect(mealBtn).toBeInTheDocument();

//     const drinkBtn = screen.getByTestId('filter-by-drink-btn');
//     expect(drinkBtn).toBeInTheDocument();

//     const favoriteCards = screen.getAllByTestId(FAVORITE_CARD);
//     expect(favoriteCards).toHaveLength(2);

//     fireEvent.click(mealBtn);
//     expect(screen.getAllByTestId(FAVORITE_CARD)).toHaveLength(1);

//     fireEvent.click(drinkBtn);
//     expect(screen.getAllByTestId(FAVORITE_CARD)).toHaveLength(1);

//     fireEvent.click(allBtn);
//     expect(screen.getAllByTestId(FAVORITE_CARD)).toHaveLength(2);
//   });
// });
