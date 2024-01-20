import React, { useRef, useState } from 'react';

function CameraImageCapture({ onImageChange }) {
  const videoRef = useRef(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  const requestCameraPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCameraEnabled(true);
      setButtonsVisible(true);
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      setCameraEnabled(false);
    }
  };

  const captureImage = () => {
    if (cameraEnabled) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL('image/png');
      onImageChange(dataUrl);
    }
  };

  const stopCamera = () => {
    if (cameraEnabled) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraEnabled(false);
      setButtonsVisible(false);
    }
  };

  return (
    <div className="text-center">
      <h3>Capturar una imagen desde la cámara</h3>
      <div className="d-flex justify-content-center">
        {!cameraEnabled && (
          <button className="btn btn-primary m-2" onClick={requestCameraPermissions}>
            Activar Cámara
          </button>
        )}
        {buttonsVisible && (
          <>
            <button className="btn btn-primary m-2" onClick={captureImage} disabled={!cameraEnabled}>
              Capturar Imagen
            </button>
            <button className="btn btn-primary m-2" onClick={stopCamera} disabled={!cameraEnabled}>
              Detener Cámara
            </button>
          </>
        )}
      </div>
      <video ref={videoRef} className="mt-3" style={{ display: cameraEnabled ? 'block' : 'none', maxWidth: '90%' }} autoPlay playsInline />
    </div>
  );
}

export default CameraImageCapture;
