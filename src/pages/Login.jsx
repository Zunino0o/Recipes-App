import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LoginContext from '../context/LoginContext';

function Login() {
  const history = useHistory();
  const { email,
    setUserEmail,
    userPassword,
    setUserPassword,
    btnDisabled,
    setBtnDisabled,
  } = useContext(LoginContext);

  const handleButton = () => {
    const regexEmail = /\S+[@]\w+[.]\w+/gm;
    const lengthPassword = 5;
    if ((regexEmail.test(email)
      && userPassword.length > lengthPassword)) {
      setBtnDisabled(false);
    }
  };
  const handleChangeEmail = (em) => {
    setUserEmail(em);
    console.log(email);
    handleButton();
  };

  const handleChangePassword = (p) => {
    setUserPassword(p);
    console.log(userPassword);
    handleButton();
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <form>
      <label htmlFor="email">
        <input
          type="email"
          data-testid="email-input"
          name="email"
          id="email"
          onChange={ (e) => { handleChangeEmail(e.target.value); } }
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          data-testid="password-input"
          name="password"
          id="password"
          onChange={ (e) => { handleChangePassword(e.target.value); } }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ btnDisabled }
        onClick={ handleClick }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
