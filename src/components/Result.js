import React, { useState } from 'react';

function Result({ imageData, callBackend }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [backendImage, setBackendImage] = useState(null);

  const handleCallBackend = async () => {
    // Simulación de la llamada al backend (deberías realizar la llamada real)
    // Aquí, setBackendImage con la imagen recibida del backend
    // const backendImageData = await callBackend(imageData);
    const backendImageData = {
      "backendImage": "Acorazonada",
      "mensaje": "Procesamiento exitoso",
    };
    setBackendImage(backendImageData);

    // Mostrar el modal después de llamar al backend
    setModalVisible(true);
  };

  const closeModal = () => {
    // Cerrar el modal
    setModalVisible(false);
  };

  return (
    <div className="text-center">
      <h3>Imagen a Procesar</h3>
      {imageData && (
        <div className="d-flex flex-column align-items-center">
          <img src={imageData} alt="Resultado" className="img-fluid mb-3" style={{ maxHeight: '400px' }} />
          <button className="btn btn-primary" onClick={handleCallBackend}>
            Procesar
          </button>
        </div>
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
              {/* Mostrar la imagen original y la imagen del backend */}
              {backendImage && (
                <div className="d-flex justify-content-between">
                  <div>
                    <h5>Tu Imagen</h5>
                    <img src={imageData} alt="Original" className="img-fluid" style={{ maxHeight: '180px' }} />
                  </div>
                  <div>
                    <h5>Imagen Parecida</h5>
                    <img src={process.env.PUBLIC_URL + '/Hojas/' + backendImage.backendImage + '.png'} alt="Backend" className="img-fluid" style={{ maxHeight: '180px' }} />
                  </div>
                </div>
              )}
              {backendImage && (
                <div>
                  <p>{backendImage.mensaje}</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Fondo Borroso */}
      {modalVisible && <div className="modal-backdrop fade show"></div>}
      {/* Fin del Modal */}
    </div>
  );
}

export default Result;
