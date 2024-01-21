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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <InputMethods onImageChange={handleImageChange} />
        </div>
        <div className="col-md-6">
          <Result imageData={imageData} />
        </div>
      </div>
    </div>
  );
}

export default App;
