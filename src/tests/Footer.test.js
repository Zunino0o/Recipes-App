import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Testes do componente Footer', () => {
  it('Renderização dos botões', () => {
    render(<Footer />);
    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    const mealsButton = screen.getByTestId('meals-bottom-btn');
    expect(drinksButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
  });
});
