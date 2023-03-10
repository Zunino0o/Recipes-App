import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [email, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [type, setType] = useState('meals');
  const [recipes, setRecipes] = useState([]);
  const [recipesArray, setRecipesArray] = useState([]);
  const [btnsCategory, setBtnsCategory] = useState([]);
  const context = useMemo(() => ({
    email,
    setUserEmail,
    userPassword,
    setUserPassword,
    btnDisabled,
    setBtnDisabled,
    type,
    setType,
    recipes,
    setRecipes,
    btnsCategory,
    setBtnsCategory,
    recipesArray,
    setRecipesArray,
  }), [email, userPassword, btnDisabled, type, recipes, btnsCategory, recipesArray]);

  return (
    <LoginContext.Provider value={ context }>{children}</LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
