import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Testa os elementos da tela de Login', () => {
  it('Testa as funcionalidades da tela de login', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btn = screen.getByTestId('login-submit-btn');
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btn).toBeDisabled();
    userEvent.type(email, 'email@email.com');
    userEvent.type(password, '1234567');
    expect(btn).toBeEnabled();
    userEvent.click(btn);
    const user = JSON.parse(localStorage.getItem('user'));
    expect(user).toEqual({ email: 'email@email.com' });
  });
});
