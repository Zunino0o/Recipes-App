function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <span data-testid="profile-email">E-MAIL</span>
      <br />
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => console.log('Done Recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => console.log('Favorites Recipes') }
      >
        Favorites Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => console.log('Logout') }
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
