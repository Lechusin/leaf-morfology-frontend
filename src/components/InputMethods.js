import React, { useState } from 'react';
import LocalImageUploader from './LocalImageUploader';
// import UrlImageUploader from './UrlImageUploader';
import CameraImageCapture from './CameraImageCapture';

function InputMethods({ onImageChange }) {
  const [activeTab, setActiveTab] = useState('local');

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="text-center">
      <h3>Métodos de Entrada</h3>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'local' ? 'active' : ''}`} onClick={() => switchTab('local')}>
            Desde Equipo
          </button>
        </li>
        {/* <li className="nav-item">
          <button className={`nav-link ${activeTab === 'url' ? 'active' : ''}`} onClick={() => switchTab('url')}>
            Desde URL
          </button>
        </li> */}
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'camera' ? 'active' : ''}`} onClick={() => switchTab('camera')}>
            Desde Cámara
          </button>
        </li>
      </ul>

      <div className="tab-content mt-3">
        <div className={`tab-pane ${activeTab === 'local' ? 'active' : ''}`} id="local">
          <LocalImageUploader onImageChange={onImageChange} />
        </div>
        {/* <div className={`tab-pane ${activeTab === 'url' ? 'active' : ''}`} id="url">
          <UrlImageUploader onImageChange={onImageChange} />
        </div> */}
        <div className={`tab-pane ${activeTab === 'camera' ? 'active' : ''}`} id="camera">
          <CameraImageCapture onImageChange={onImageChange} />
        </div>
      </div>
    </div>
  );
}

export default InputMethods;
