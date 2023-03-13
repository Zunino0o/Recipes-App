import { screen } from '@testing-library/react';
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

// const waitingTime = (milliseconds) => {
//     return new Promise(resolve => {
//         setTimeout(resolve, milliseconds);
//     });
//   }

// beforeEach(() => {
//   jest.spyOn(global, 'fetch').mockImplementation(fetch);
// });

// afterEach(() => {
//   jest.restoreAllMocks();
// });

describe('', () => {
  test('aloi', async () => {
    const history = createMemoryHistory();
    renderWithRouter(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btn = screen.getByTestId('login-submit-btn');
    userEvent.type(email, 'email@email.com');
    userEvent.type(password, '1234567');
    userEvent.click(btn);
    expect(await screen.findByTestId('Beef-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('Breakfast-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('Chicken-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('Dessert-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('All-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('0-card-img')).toBeInTheDocument();
    expect(await screen.findByText('Corba')).toBeInTheDocument();
    userEvent.click(await screen.findByTestId('Beef-category-filter'));
    expect(await screen.findByText('Beef and Mustard Pie')).toBeInTheDocument();

    // userEvent.click(screen.getByTestId('drinks-bottom-btn'));
  });
});
