import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

function Header() {
  const [title, setTitle] = useState();
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
      const path = Path[0].toUpperCase() + Path.substring(1);
      setTitle(path);
    }
  }, []);

  return (
    <header>
      <button onClick={ handleProfileClick }>
        <img
          data-testid="profile-top-btn"
          src={ ProfileIcon }
          alt=""
        />
      </button>
      <button onClick={ handleSearchClick }>
        {' '}

        {ShowSearch && (
          <img data-testid="search-top-btn" src={ SearchIcon } alt="" />
        )}
      </button>
      {showSearch && (
        <input data-testid="search-input" type="text" placeholder="Search" />
      )}
      <p data-testid="page-title">
        {title}
      </p>
    </header>
  );
}

export default Header;
