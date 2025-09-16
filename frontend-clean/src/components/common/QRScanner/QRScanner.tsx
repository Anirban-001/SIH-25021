import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import './QRScanner.css';

interface QRScannerProps {
  /**
   * Function called when a QR code is successfully scanned
   */
  onScan: (decodedText: string, decodedResult: any) => void;
  
  /**
   * Function called when there's an error during scanning
   */
  onError?: (errorMessage: string) => void;
  
  /**
   * Width of the scanner view
   */
  width?: number | string;
  
  /**
   * Height of the scanner view
   */
  height?: number | string;
  
  /**
   * Whether to scan continuously or stop after first successful scan
   */
  continuous?: boolean;
  
  /**
   * CSS class name for the scanner container
   */
  className?: string;
}

/**
 * A component for scanning QR codes using the device camera
 */
const QRScanner = ({
  onScan,
  onError,
  width = '100%',
  height = 300,
  continuous = false,
  className = '',
}: QRScannerProps) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerDivId = 'qr-scanner';
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [cameras, setCameras] = useState<Array<{id: string, label: string}>>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);
  
  useEffect(() => {
    // Initialize QR Scanner
    scannerRef.current = new Html5Qrcode(scannerDivId);
    
    // Get available cameras
    Html5Qrcode.getCameras()
      .then(devices => {
        if (devices && devices.length) {
          setCameras(devices);
          setSelectedCamera(devices[0].id);
        }
      })
      .catch(err => {
        console.error('Error getting cameras', err);
        if (err.name === 'NotAllowedError') {
          setPermissionDenied(true);
        }
      });
    
    // Cleanup on component unmount
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop()
          .catch(err => console.error('Error stopping scanner', err));
      }
    };
  }, []);
  
  const startScanner = () => {
    if (!scannerRef.current || !selectedCamera) return;
    
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1,
    };
    
    setIsScanning(true);
    
    scannerRef.current.start(
      selectedCamera,
      config,
      (decodedText, decodedResult) => {
        onScan(decodedText, decodedResult);
        if (!continuous) {
          stopScanner();
        }
      },
      (errorMessage) => {
        if (onError) onError(errorMessage);
      }
    )
    .catch(err => {
      console.error('Error starting scanner', err);
      setIsScanning(false);
      if (err.name === 'NotAllowedError') {
        setPermissionDenied(true);
      }
    });
  };
  
  const stopScanner = () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop()
        .then(() => {
          setIsScanning(false);
        })
        .catch(err => {
          console.error('Error stopping scanner', err);
        });
    }
  };
  
  const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cameraId = e.target.value;
    setSelectedCamera(cameraId);
    
    // If already scanning, restart with new camera
    if (isScanning) {
      stopScanner();
      // Short delay to ensure the previous scanner is stopped
      setTimeout(() => {
        if (cameraId) startScanner();
      }, 300);
    }
  };

  return (
    <div className={`qr-scanner-container ${className}`}>
      {permissionDenied ? (
        <div className="permission-denied">
          <p>Camera access is denied. Please allow camera access to scan QR codes.</p>
          <button 
            onClick={() => {
              setPermissionDenied(false);
              Html5Qrcode.getCameras()
                .then(devices => {
                  if (devices && devices.length) {
                    setCameras(devices);
                    setSelectedCamera(devices[0].id);
                  }
                })
                .catch(err => {
                  console.error('Error getting cameras', err);
                  if (err.name === 'NotAllowedError') {
                    setPermissionDenied(true);
                  }
                });
            }}
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="scanner-controls">
            {cameras.length > 0 && (
              <div className="camera-select">
                <label htmlFor="camera-select">Camera:</label>
                <select 
                  id="camera-select" 
                  value={selectedCamera} 
                  onChange={handleCameraChange}
                  disabled={isScanning}
                >
                  {cameras.map(camera => (
                    <option key={camera.id} value={camera.id}>
                      {camera.label || `Camera ${camera.id}`}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <div className="scanner-buttons">
              {!isScanning ? (
                <button 
                  className="start-button"
                  onClick={startScanner}
                  disabled={!selectedCamera || cameras.length === 0}
                >
                  Start Scanning
                </button>
              ) : (
                <button 
                  className="stop-button"
                  onClick={stopScanner}
                >
                  Stop Scanning
                </button>
              )}
            </div>
          </div>
          
          <div 
            id={scannerDivId} 
            style={{ 
              width: width, 
              height: height 
            }}
            className="scanner-view"
          ></div>
          
          {isScanning && (
            <div className="scanning-indicator">
              <div className="scanning-animation"></div>
              <p>Scanning...</p>
            </div>
          )}
          
          {cameras.length === 0 && !permissionDenied && (
            <div className="no-cameras">
              <p>No cameras found. Please connect a camera to use the scanner.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QRScanner;