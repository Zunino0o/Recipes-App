import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

const inputEmail = screen.getByTestId('email-input');
const inputPassword = screen.getByTestId('password-input');
const btn = screen.getByTestId('login-submit-btn');
const validEmail = 'fulano@email.com';

describe(('Testa as telas de login', () => {
  it('Testa se os elementos estão presentes', () => {
    renderWithRouter(<App />);
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });
  it('Testa se o botão está desabilitado', () => {
    renderWithRouter(<App />);
    expect(btn).toBeDisabled();
  });
  it('Testa se ao preencher o formulário com dados inválidos o botão continua desabilitado', () => {
    renderWithRouter(<App />);
    userEvent.type(inputEmail, 'invalido');
    userEvent.type(inputPassword, '12345');

    expect(btn).toBeDisabled();
  });
  it('Testa se ao preencher o formulário com dados válidos o botão fica habilitado', () => {
    renderWithRouter(<App />);

    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, '1234567');

    expect(btn).toBeEnabled();
  });
  it('Testa se ao preencher o formulário os dados são renderizados', () => {
    renderWithRouterAndRedux(<App />);

    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, '1234567');

    expect(inputEmail.value).toBe(validEmail);
    expect(inputPassword.value).toBe('1234567');
  });
  it('Testa se ao clicar no botão o usuário é redirecionado', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');

    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, '1234567');

    expect(btn).toBeEnabled();

    userEvent.click(btn);
    expect(history.location.pathname).toBe('/meals');
  });
  it('Testa se o email é salvo no localStorage', () => {
    renderWithRouter(<App />);
    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, '1234567');
    userEvent.click(btn);

    const user = JSON.parse(localStorage.getItem('user'));
    expect(user).toEqual({ email: validEmail });
  });
}));
