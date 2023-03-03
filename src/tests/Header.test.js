import { createMemoryHistory } from 'history';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import Header from '../components/Header';

const PAGE_TITLE = 'page-title';

test('should render Header component without errors', async () => {
  render(<Header />);
  const headerElement = await screen.findByRole('banner');
  expect(headerElement).toBeInTheDocument();
});

test('should render the correct title', async () => {
  render(<Header />);
  const pageTitleElement = await screen.findByTestId(PAGE_TITLE);
  expect(pageTitleElement.textContent).toBe('Home');
});

test('should navigate to the profile page when the profile button is clicked', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <Header />
    </Router>,
  );
  const profileButtonElement = await screen.findByTestId('profile-top-btn');
  userEvent.click(profileButtonElement);
  await waitFor(() => expect(history.location.pathname).toBe('/profile'));
});

test('should show the search input when the search button is clicked', async () => {
  render(<Header />);
  const searchButtonElement = await screen.findByTestId('search-top-btn');
  userEvent.click(searchButtonElement);
  const searchInputElement = await screen.findByTestId('search-input');
  expect(searchInputElement).toBeInTheDocument();
});

test('should render the correct title for the Meals page', async () => {
  const history = createMemoryHistory();
  history.push('/meals');
  render(
    <Router history={ history }>
      <Header />
    </Router>,
  );
  const pageTitleElement = await screen.findByTestId(PAGE_TITLE);
  expect(pageTitleElement.textContent).toBe('Meals');
});

test('should render the correct title for the Drinks page', async () => {
  const history = createMemoryHistory();
  history.push('/drinks');
  render(
    <Router history={ history }>
      <Header />
    </Router>,
  );
  const pageTitleElement = await screen.findByTestId(PAGE_TITLE);
  expect(pageTitleElement.textContent).toBe('Drinks');
});
