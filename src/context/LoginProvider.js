import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [email, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [filter, setFilter] = useState();

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const context = useMemo(() => ({
    email,
    setUserEmail,
    userPassword,
    setUserPassword,
    btnDisabled,
    setBtnDisabled,
    filter,
    setFilter,
    handleFilter,
  }), [email, userPassword, btnDisabled]);

  return (
    <LoginContext.Provider value={ context }>{children}</LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
