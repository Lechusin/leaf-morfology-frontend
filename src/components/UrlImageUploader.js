import React, { useState } from 'react';

function UrlImageUploader({ onImageChange }) {
  const [imageUrl, setImageUrl] = useState('');

  const handleInputChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleLoadImage = () => {
    onImageChange(imageUrl);
  };

  return (
    <div className="text-center">
      <h3>Cargar imagen mediante una URL</h3>
      <input
        type="text"
        placeholder="Ingrese la URL de la imagen"
        value={imageUrl}
        onChange={handleInputChange}
        className="form-control mt-3"
      />
      <button className="btn btn-primary mt-3" onClick={handleLoadImage}>
        Cargar Imagen
      </button>

    </div>
  );
}

export default UrlImageUploader;
