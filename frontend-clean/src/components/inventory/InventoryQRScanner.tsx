import { useState, useRef } from 'react';
import QRScanner from '../common/QRScanner';
import { parseQRCodeValue, validateQRCodeValue } from '../../utils/qrCodeUtils';
import './InventoryQRScanner.css';
import jsQR from 'jsqr';

interface InventoryQRScannerProps {
  onScanComplete?: (data: Record<string, any>) => void;
  onClose?: () => void;
}

/**
 * Component for scanning inventory QR codes
 */
const InventoryQRScanner = ({ onScanComplete, onClose }: InventoryQRScannerProps) => {
  const [scanning, setScanning] = useState<boolean>(true);
  const [scanResult, setScanResult] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleScan = (decodedText: string) => {
    setScanning(false);
    
    // Validate the QR code
    if (!validateQRCodeValue(decodedText)) {
      setError('Invalid QR code format. Please scan a valid inventory QR code.');
      return;
    }
    
    // Parse the QR code value
    const data = parseQRCodeValue(decodedText);
    
    if (!data) {
      setError('Could not parse QR code data. Please try again.');
      return;
    }
    
    // Check if it's an inventory item
    if (data.type !== 'inventory') {
      setError('This QR code is not for an inventory item. Please scan a valid inventory QR code.');
      return;
    }
    
    // Set the scan result
    setScanResult(data);
    
    // Call the onScanComplete callback if provided
    if (onScanComplete) {
      onScanComplete(data);
    }
  };
  
  const handleError = (errorMessage: string) => {
    console.error('QR Scanner Error:', errorMessage);
    setError(`Error scanning QR code: ${errorMessage}`);
  };
  
  const resetScan = () => {
    setScanning(true);
    setScanResult(null);
    setError(null);
  };

  // Handle file upload for QR code scanning
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const imageData = e.target?.result;
      if (!imageData || typeof imageData !== 'string') {
        setError('Could not read the uploaded image.');
        return;
      }

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          setError('Could not process the image.');
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
        
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code) {
          handleScan(code.data);
        } else {
          setError('No QR code found in the uploaded image.');
        }
      };
      img.src = imageData;
    };
    fileReader.onerror = () => {
      setError('Error reading the file.');
    };
    fileReader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="inventory-qr-scanner">
      <div className="scanner-header">
        <h3>{scanning ? 'Scan Inventory QR Code' : (scanResult ? 'Item Found' : 'Scan Error')}</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <div className="scanner-content">
        {scanning ? (
          <>
            <QRScanner 
              onScan={handleScan} 
              onError={handleError}
              height={300}
              continuous={false}
            />
            <div className="upload-option">
              <button className="upload-button" onClick={triggerFileInput}>
                Upload QR Code Image
              </button>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="file-input"
              />
            </div>
          </>
        ) : (
          <div className="scan-result">
            {scanResult ? (
              <div className="item-found">
                <div className="success-icon">✓</div>
                <h4>{scanResult.name}</h4>
                
                <div className="item-details">
                  <div className="item-detail">
                    <span className="detail-label">ID:</span>
                    <span className="detail-value">{scanResult.id}</span>
                  </div>
                  
                  <div className="item-detail">
                    <span className="detail-label">Category:</span>
                    <span className="detail-value">{scanResult.category}</span>
                  </div>
                  
                  <div className="item-detail">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{scanResult.location}</span>
                  </div>
                  
                  <div className="item-detail">
                    <span className="detail-label">Quantity:</span>
                    <span className="detail-value">{scanResult.quantity}</span>
                  </div>
                  
                  {scanResult.lastUpdated && (
                    <div className="item-detail">
                      <span className="detail-label">Last Updated:</span>
                      <span className="detail-value">
                        {new Date(scanResult.lastUpdated).toLocaleString()}
                      </span>
                    </div>
                  )}
                  
                  {/* Display any additional properties */}
                  {Object.entries(scanResult)
                    .filter(([key]) => !['id', 'name', 'type', 'category', 'location', 'quantity', 'lastUpdated', 'createdAt'].includes(key))
                    .map(([key, value]) => {
                      // Format the key with camelCase to proper spacing
                      const formattedKey = key
                        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
                        .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
                      
                      return (
                        <div className="item-detail" key={key}>
                          <span className="detail-label">{formattedKey}:</span>
                          <span className="detail-value">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </span>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
            ) : (
              <div className="error-message">
                <div className="error-icon">!</div>
                <p>{error || 'An unknown error occurred.'}</p>
              </div>
            )}
            
            <button className="scan-again-button" onClick={resetScan}>
              Scan Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryQRScanner;