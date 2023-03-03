import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

function Profile() {
  const history = useHistory();
  const handleRedirect = ({ target }) => {
    switch (target.name) {
    case 'done':
      return history.push('/done-recipes');
    case 'favorite':
      return history.push('/favorite-recipes');
    case 'logout':
      return history.push('/');
    default:
      break;
    }
  };

  return (
    <div>
      <img src={ profileIcon } alt="profile icon" />
      <h1>PROFILE</h1>
      <span data-testid="profile-email">E-MAIL</span>
      <br />
      <button
        type="button"
        data-testid="profile-done-btn"
        name="done"
        onClick={ handleRedirect }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        name="favorite"
        onClick={ handleRedirect }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        name="logout"
        onClick={ handleRedirect }
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
