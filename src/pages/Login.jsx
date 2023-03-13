import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LoginContext from '../context/LoginContext';
import '../styles/Login.css';
import tomateIcon from '../images/tomateIcon.png';
import logo from '../images/logo.png';

function Login() {
  const history = useHistory();
  const {
    email,
    setUserEmail,
    userPassword,
    setUserPassword,
    btnDisabled,
    setBtnDisabled,
  } = useContext(LoginContext);

  const handleButton = () => {
    const regexEmail = /\S+[@]\w+[.]\w+/gm;
    const lengthPassword = 5;
    if (regexEmail.test(email) && userPassword.length > lengthPassword) {
      setBtnDisabled(false);
    }
  };
  const handleChangeEmail = ({ target }) => {
    setUserEmail(target.value);
    console.log(email);
    handleButton();
  };

  const handleChangePassword = ({ target }) => {
    setUserPassword(target.value);
    console.log(userPassword);
    handleButton();
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <section className="login-container">
      <form className="login-form">
        <img src={ logo } className="logo" alt="logo" />
        <img src={ tomateIcon } alt="icone de tomate" />
        <h1 className="title">Login</h1>
        <div className="wrapper">
          <label htmlFor="email">
            <input
              type="email"
              data-testid="email-input"
              placeholder="Email"
              name="email"
              id="email"
              onChange={ handleChangeEmail }
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              data-testid="password-input"
              placeholder="Password"
              name="password"
              id="password"
              onChange={ handleChangePassword }
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
        </div>
      </form>
    </section>
  );
}

export default Login;
