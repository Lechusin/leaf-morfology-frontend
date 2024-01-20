import React from 'react';

function LocalImageUploader({ onImageChange }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="text-center">
      <h3>Subir una imagen desde tu equipo</h3>
      <label htmlFor="fileInput" className="btn btn-primary mt-3">
        Seleccionar Imagen
      </label>
      <input type="file" accept="image/*" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
    </div>
  );
}

export default LocalImageUploader;
