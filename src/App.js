// App.js

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import InputMethods from './components/InputMethods';
import Result from './components/Result';

function App() {
  const [imageData, setImageData] = useState(null);

  const handleImageChange = (data) => {
    setImageData(data);
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-primary text-white text-center py-4">
        <h1>Proyecto de Detección de Hojas</h1>
      </header>

      {/* Main Content */}
      <div className="container mt-5 main-content">
        <div className="row">
          <div className="col-md-6">
            {/* InputMethods */}
            <InputMethods onImageChange={handleImageChange} />
          </div>
          <div className="col-md-6">
            {/* Result */}
            <Result imageData={imageData} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p>Integrantes: Luis Chusino, Mateo Reinoso, Angel Chuqui, Andrea Rodriguez, Juan Diego Orellana.</p>
      </footer>
    </div>
  );
}

export default App;
