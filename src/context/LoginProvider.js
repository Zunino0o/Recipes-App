import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [email, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [filter, setFilter] = useState('ingredients');
  const [searchInput, setSearchInput] = useState('');
  const [render, setRender] = useState();

  const context = useMemo(() => ({
    email,
    setUserEmail,
    userPassword,
    setUserPassword,
    btnDisabled,
    setBtnDisabled,
    searchInput,
    setSearchInput,
    filter,
    setFilter,
    render,
    setRender,
  }), [
    email,
    userPassword,
    btnDisabled,
    filter,
    searchInput,
    render,
  ]);

  return (
    <LoginContext.Provider
      value={ context }
    >
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
