import React from 'react';
import copy from 'clipboard-copy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import './PopupComponent.css'; // Import your CSS file for styling

const PopupComponent = ({ url, onClose }) => {
  const handleCopyClick = () => {
    copy(url);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <button onClick={handleCopyClick} className="copy-button">
          <FontAwesomeIcon icon={faCopy}/>
          <span className="ellipsis-text">{url}</span>
        </button>
        <button onClick={onClose} className="solid-button">Close</button>
      </div>
    </div>
  )
};

export default PopupComponent;
