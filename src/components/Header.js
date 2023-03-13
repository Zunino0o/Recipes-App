import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';
import recipesIcon from '../images/recipesIcon.png';

function Header() {
  const [title, setTitle] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const history = useHistory();
  const Path = history.location.pathname.substring(1);
  const ShowSearch = Path === 'meals' || Path === 'drinks';

  const handleProfileClick = useCallback(() => {
    setTitle('Profile');
    history.push('/profile');
  }, [history]);

  const handleSearchClick = useCallback(() => {
    setShowSearch(!showSearch);
  }, [showSearch]);

  useEffect(() => {
    const teste = Path.split('-');
    if (teste[1]) {
      const firstIndex = teste[0][0].toUpperCase() + teste[0].substring(1);
      const secondIndex = teste[1][0].toUpperCase() + teste[1].substring(1);
      const compoundPath = `${firstIndex} ${secondIndex}`;
      setTitle(compoundPath);
    } else {
      const pathTitle = Path[0].toUpperCase() + Path.substring(1);
      setTitle(pathTitle);
    }
  }, []);

  return (
    <header className="header-container">
      <nav>
        <div className="header-logo">
          <img src={ recipesIcon } alt="logo" />
          <h1>
            Recipes
            {' '}
            <span>app</span>
          </h1>
        </div>
        <div className="wrapper">
          <button onClick={ handleProfileClick } className="header-btn">
            <img data-testid="profile-top-btn" src={ ProfileIcon } alt="" />
          </button>
          <button onClick={ handleSearchClick } className="header-btn">
            {' '}
            {ShowSearch && (
              <img data-testid="search-top-btn" src={ SearchIcon } alt="" />
            )}
          </button>
        </div>
      </nav>
      <div className="header-search-bar">
        <h1 data-testid="page-title" className="header-title">{title}</h1>
        {showSearch && <SearchBar />}
      </div>
    </header>
  );
}

export default Header;
