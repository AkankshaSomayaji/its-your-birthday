import React from 'react';
import { useState } from 'react';
import PopupComponent from './PopupComponent';

function GeneratePage() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    message: ''
  });
  const [showPopup, setShowPopup] = useState(false);
  const [generatedURL, setGeneratedURL] = useState("");
  

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const encodedData = btoa(JSON.stringify(formData));
    setGeneratedURL(`/result?data=${encodedData}`);
    setShowPopup(true);
  };

  const handleCloseClick = () => {
    setShowPopup(false);
    setFormData({
      name: '',
      age: '',
      message: ''
    });
  }

  return (
    <div className="page-container">
      <div className="page-body" style={showPopup ? {opacity:"0.2"} : {}}>
        <div className="page-content">
          <div className='page-content-left'>
            <div className='page-content-left-bottom'>
              <span className='pclb-subtitle'> Come on! It's someone's birthday! Let's surprise them with a virtual cake! That's the least that you can do!</span>
              <span className='pclb-title'> Go Shawty! It's your Birthday!</span>
            </div>
          </div>
          <div className='page-content-right'>
            <span className='pcr-title'>Enter the birthday person's name, age, and a custom message that will appear after they blow out their candles.</span>
            <div>
              <form onSubmit={handleFormSubmit} className="generate-form">
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Name..."
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="age"
                  className="input"
                  placeholder="Age..."
                  min="1"
                  max="100"
                  value={formData.age}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="message"
                  className="input"
                  placeholder="Message..."
                  value={formData.message}
                  onChange={handleInputChange}
                />
                <button className="solid-button" type="submit">
                  <span>Create</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showPopup && <PopupComponent url={generatedURL} onClose={handleCloseClick}/>}
    </div>
  )
}

export default GeneratePage;