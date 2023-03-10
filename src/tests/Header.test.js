import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import App from '../App';

test('Renderiza os elementos', async () => {
  const history = createMemoryHistory();
  render(
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
  expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
  expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
  expect(screen.getByTestId('page-title')).toBeInTheDocument();
  userEvent.click(screen.getByTestId('search-top-btn'));
  userEvent.click(screen.getByTestId('profile-top-btn'));
});
