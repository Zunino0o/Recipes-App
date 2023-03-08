import PropTypes from 'prop-types';
import { useState } from 'react';
import iconBtn from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ url, dataTestid }) {
  console.log(dataTestid);
  const [isCliped, setIsCliped] = useState(false);

  const handleShare = () => {
    setIsCliped(true);
    copy(url);
  };

  return (
    <div>
      <button type="button" onClick={ handleShare } data-testid={ dataTestid }>
        <img src={ iconBtn } alt="share-link" />
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
