import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import DoneRecipes from '../pages/DoneRecipes';

const mockRecipes = [
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    tags: ['Soup'],
    doneDate: '2023-03-08T17:52:48.729Z',
  },
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image:
      'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    tags: [],
    doneDate: '2023-03-08T17:55:37.504Z',
  },
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image:
      'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    tags: [],
    doneDate: '2023-03-08T17:55:37.504Z',
  },
];

describe('Testes da pagina DoneRecipes', () => {
  it('Testa se os elementos são renderizados', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockRecipes));
    const history = createMemoryHistory();
    history.push('/done-recipes');
    render(
      <Router history={ history }>
        <DoneRecipes />
      </Router>,
    );

    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
  });

  it('Testa os filtros', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockRecipes));
    const history = createMemoryHistory();
    history.push('/done-recipes');
    render(
      <Router history={ history }>
        <DoneRecipes />
      </Router>,
    );

    const filterMeal = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(filterMeal);
    expect(screen.queryByTestId('1-horizontal-name')).not.toBeInTheDocument();

    const filterDrink = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(filterDrink);
    expect(screen.queryByTestId('1-horizontal-name')).toBeInTheDocument();
    expect(screen.queryByTestId('2-horizontal-name')).not.toBeInTheDocument();

    const filterAll = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filterAll);
    expect(screen.queryByTestId('2-horizontal-name')).toBeInTheDocument();
  });
});
