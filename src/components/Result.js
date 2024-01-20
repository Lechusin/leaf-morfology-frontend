import React, { useState } from 'react';

function Result({ imageData, callBackend }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [backendImage, setBackendImage] = useState(null);

  const handleCallBackend = async () => {
    // Simulación de la llamada al backend (deberías realizar la llamada real)
    // Aquí, setBackendImage con la imagen recibida del backend
    const backendImageData = await callBackend(imageData);
    setBackendImage(backendImageData);

    // Mostrar el modal después de llamar al backend
    setModalVisible(true);
  };

  const closeModal = () => {
    // Cerrar el modal y limpiar la imagen del backend
    setModalVisible(false);
    setBackendImage(null);
  };

  return (
    <div className="text-center">
      <h3>Imagen a Procesar</h3>
      {imageData && <img src={imageData} alt="Resultado" className="img-fluid" />}
      {imageData && (
        <button className="btn btn-primary mt-3" onClick={handleCallBackend}>
          Procesar
        </button>
      )}
      {!imageData && (
        <div className="alert alert-warning mt-3" role="alert">
          No hay imagen cargada.
        </div>
      )}

      {/* Modal */}
      <div className={`modal ${modalVisible ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: modalVisible ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Resultado del Procesamiento</h5>
              <button type="button" className="close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-around">
                {/* Imagen original */}
                <div>
                  <h5>Imagen Original</h5>
                  <img src={imageData} alt="Imagen Original" className="img-fluid" />
                </div>
                {/* Imagen del backend */}
                {backendImage && (
                  <div>
                    <h5>Imagen del Backend</h5>
                    <img src={backendImage} alt="Imagen del Backend" className="img-fluid" />
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Fin del Modal */}
    </div>
  );
}

export default Result;
