import React from 'react';
import { fireEvent } from '@testing-library/react';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouter from './RenderWithRouter';
import mockData from './helper/mockData';

describe('FavoriteRecipes component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => mockData,
    }));
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('renders the header with the correct title', () => {
    const { getByRole } = renderWithRouter(<FavoriteRecipes />);
    expect(getByRole('heading')).toHaveTextContent('FavoriteRecipes');
  });

  it('render all components', () => {
    const mockRecipes = [
      { id: '1', name: 'Recipe 1', type: 'meal' },
      { id: '2', name: 'Recipe 2', type: 'drink' },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));

    const { getByTestId } = renderWithRouter(<FavoriteRecipes />);
    expect(getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(getByTestId('filter-by-meal-btn')).toBeInTheDocument();
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
    const mockRecipes = [
      { id: '1', name: 'Recipe 1', type: 'meal' },
      { id: '2', name: 'Recipe 2', type: 'drink' },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));

    const {
      getAllByTestId,
      getByTestId,
    } = renderWithRouter(<FavoriteRecipes />);
    expect(getAllByTestId('favorite-card')).toHaveLength(2);
    expect(getByTestId('favorite-card')).toHaveTextContent('Recipe 1');
    expect(getByTestId('favorite-card')).toHaveTextContent('Recipe 2');
  });

  it('filters the recipe cards by meal', () => {
    const mockRecipes = [
      { id: '1', name: 'Recipe 1', type: 'meal' },
      { id: '2', name: 'Recipe 2', type: 'drink' },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));

    const {
      getAllByTestId,
      getByTestId,
    } = renderWithRouter(<FavoriteRecipes />);
    fireEvent.click(getByTestId('filter-by-meal-btn'));

    expect(getAllByTestId('favorite-card')).toHaveLength(1);
    expect(getByTestId('favorite-card')).toBeInTheDocument();
    expect(getByTestId('favorite-card')).toHaveTextContent('Recipe 1');
    expect(getByTestId('favorite-card')).not.toHaveTextContent('Recipe 2');
  });

  it('filters the recipe cards by drink', () => {
    const mockRecipes = [
      { id: '1', name: 'Recipe 1', type: 'meal' },
      { id: '2', name: 'Recipe 2', type: 'drink' },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));

    const {
      getAllByTestId,
      getByTestId,
    } = renderWithRouter(<FavoriteRecipes />);
    fireEvent.click(getByTestId('filter-by-drink-btn'));

    expect(getAllByTestId('favorite-card')).toHaveLength(1);
    expect(getByTestId('favorite-card')).toBeInTheDocument();
    expect(getByTestId('favorite-card')).not.toHaveTextContent('Recipe 1');
    expect(getByTestId('favorite-card')).toHaveTextContent('Recipe 2');
  });

  it('clears the filters when clicking the All button', () => {
    const mockRecipes = [
      { id: '1', name: 'Recipe 1', type: 'meal' },
      { id: '2', name: 'Recipe 2', type: 'drink' },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));

    const {
      getAllByTestId,
      getByTestId,
    } = renderWithRouter(<FavoriteRecipes />);

    expect(getAllByTestId('favorite-card')).toHaveLength(2);

    fireEvent.click(getByTestId('filter-by-meal-btn'));

    expect(getAllByTestId('favorite-card')).toHaveLength(1);

    fireEvent.click(getByTestId('filter-by-all-btn'));

    expect(getAllByTestId('favorite-card')).toHaveLength(2);
  });

  it('test copy to clipboard', async () => {
    const mockRecipes = [{
      id: 123,
      type: 'drink',
      nationality: null,
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Caipirinha',
      image: 'https://www.example.com/caipirinha.jpg',
    },
    {
      id: 321,
      type: 'meal',
      nationality: 'American',
      category: 'Fast Food',
      alcoholicOrNot: null,
      name: 'HotDog',
      image: 'https://www.example.com/hotdog.jpg',
    }];

    navigator.clipboard = {
      writeText: jest.fn(() => Promise.resolve()),
    };

    const {
      getByTestId,
      getByText,
    } = renderWithRouter(<FavoriteRecipes />);

    localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));

    const shareButton = getByTestId('0-horizontal-share-btn');
    fireEvent.click(shareButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/123');
    expect(getByText('Link copied!')).toBeInTheDocument();
  });
});
