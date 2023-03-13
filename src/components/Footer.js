import drink from '../images/drinkIcon.png';
import meal from '../images/mealIcon.png';
import '../styles/Footer.css';

function Footer() {
  return (
    <div data-testid="footer" className="footer-container">
      <a href="/drinks">
        <img src={ drink } data-testid="drinks-bottom-btn" alt="drinks" />
      </a>
      <a href="/meals">
        <img src={ meal } data-testid="meals-bottom-btn" alt="meals" />
      </a>
    </div>
  );
}

export default Footer;
