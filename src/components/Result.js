import React, { useState } from 'react';
import axios from 'axios';

function Result({ imageData }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [invalidImageModalVisible, setInvalidImageModalVisible] = useState(false);
  const handleCallBackend = async () => {
    setLoading(true);
    console.log('Iniciando solicitud al backend...');
    try {
      const imageDataFile = dataURItoFile(imageData, 'image.jpg');

      const formData = new FormData();
      formData.append('file', imageDataFile);
      const flag = await axios.post('http://localhost:8000/validar-imagen', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (flag.data.valor === "0") {
        setInvalidImageModalVisible(true);
      } else{
        const response = await axios.post('http://localhost:8000/procesar-imagen', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Aquí puedes manejar la respuesta del servidor
        setBackendImage(response.data);
        setModalVisible(true);
      }

      
    } catch (error) {
      console.error('Error al cargar el archivo:', error.message);
    } finally {
      setLoading(false);
      console.log('Finalizando solicitud al backend.');
    }
  };
  
  function dataURItoFile(dataURI, fileName) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new File([ab], fileName, { type: 'image/jpeg' });
  }

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
      {/* Modal para imagen no válida */}
    <div className={`modal ${invalidImageModalVisible ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: invalidImageModalVisible ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Imagen no válida</h5>
            <button type="button" className="close" onClick={() => setInvalidImageModalVisible(false)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>La imagen seleccionada no corresponde a una Hoja.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setInvalidImageModalVisible(false)}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
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
                  <p>Tu imagen es parecida a: {backendImage.backendImage}</p>
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
