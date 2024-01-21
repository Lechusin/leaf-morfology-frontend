import React, { useState } from 'react';

function Result({ imageData, callBackend }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleCallBackend = async () => {
    setLoading(true);
    // Llamada al backend
    if (imageData) {
      try {
        const response = await fetch('http://127.0.0.1:8000/procesar-imagen', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors', // Asegura que la solicitud es de tipo CORS
          body: JSON.stringify({ imageData }),
        });

        if (response.ok) {
          const result = await response.json();
          setBackendImage(result);
          setModalVisible(true);
        } else {
          console.error('Error al llamar al backend');
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoading(false);
      }
      
    }
  };
  

  const closeModal = () => {
    setModalVisible(false);
    // Puedes agregar lógica para restablecer o limpiar el estado aquí si es necesario
  };


  return (
    <div className="text-center">
      <h3>Imagen a Procesar</h3>
      {imageData && (
        <div className="d-flex flex-column align-items-center">
          <img src={imageData} alt="Resultado" className="img-fluid mb-3" style={{ maxHeight: '400px' }} />
          <button className="btn btn-primary" onClick={handleCallBackend} disabled={loading}>
            {loading ? 'Procesando...' : 'Procesar'}
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
