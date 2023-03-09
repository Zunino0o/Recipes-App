import PropTypes from 'prop-types';
import { useState } from 'react';
import iconBtn from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ url, dataTestid }) {
  const [isCliped, setIsCliped] = useState(false);

  const handleShare = () => {
    setIsCliped(true);
    copy(url);
  };

  return (
    <div>
      <button type="button" onClick={ handleShare }>
        <img src={ iconBtn } alt="share-link" data-testid={ dataTestid } />
      </button>
      {isCliped && <p>Link copied!</p>}
    </div>
  );
}

ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
};

export default ShareButton;
