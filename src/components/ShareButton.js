import PropTypes from 'prop-types';
import { useState } from 'react';
import copy from 'clipboard-copy';
import iconBtn from '../images/shareIcon.svg';

function ShareButton({ url, dataTestid }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = () => {
    copy(url);
    setIsCopied(true);
  };

  return (
    <div>
      <button type="button" onClick={ handleShare }>
        <img src={ iconBtn } alt="Compartilhar" data-testid={ dataTestid } />
      </button>
      {isCopied && <p>Link copied!</p>}
    </div>
  );
}

ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
};

export default ShareButton;
