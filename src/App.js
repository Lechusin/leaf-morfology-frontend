import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LocalImageUploader from './components/LocalImageUploader';
import UrlImageUploader from './components/UrlImageUploader';
import CameraImageCapture from './components/CameraImageCapture';

function App() {
  const [imageData, setImageData] = useState(null);
  const [activeTab, setActiveTab] = useState('local');

  const handleImageChange = (data) => {
    setImageData(data);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mt-5">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'local' ? 'active' : ''}`} onClick={() => switchTab('local')}>
            Desde Equipo
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'url' ? 'active' : ''}`} onClick={() => switchTab('url')}>
            Desde URL
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'camera' ? 'active' : ''}`} onClick={() => switchTab('camera')}>
            Con Cámara
          </button>
        </li>
      </ul>

      <div className="tab-content">
        <div className={`tab-pane ${activeTab === 'local' ? 'active' : ''}`} id="local">
          <LocalImageUploader onImageChange={handleImageChange} />
        </div>
        <div className={`tab-pane ${activeTab === 'url' ? 'active' : ''}`} id="url">
          <UrlImageUploader onImageChange={handleImageChange} />
        </div>
        <div className={`tab-pane ${activeTab === 'camera' ? 'active' : ''}`} id="camera">
          <CameraImageCapture onImageChange={handleImageChange} />
        </div>
      </div>

      {imageData && (
        <div className="mt-5">
          <h2>Imagen Capturada o Cargada</h2>
          <img src={imageData} alt="Imagen" className="img-fluid" />
        </div>
      )}
    </div>
  );
}

export default App;
