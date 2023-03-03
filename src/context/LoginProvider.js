import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [email, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  const context = useMemo(() => ({
    email,
    setUserEmail,
    userPassword,
    setUserPassword,
    btnDisabled,
    setBtnDisabled,
  }), [email, userPassword, btnDisabled]);

  return (
    <LoginContext.Provider value={ context }>{children}</LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
