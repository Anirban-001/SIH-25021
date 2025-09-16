import { useState } from 'react';
import QRCode from '../common/QRCode';
import { generateQRCodeValue } from '../../utils/qrCodeUtils';
import './InventoryQRGenerator.css';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  location: string;
  quantity: number;
  lastUpdated: string;
  [key: string]: any; // For additional properties
}

interface InventoryQRGeneratorProps {
  item: InventoryItem;
  onClose?: () => void;
  onPrint?: () => void;
}

/**
 * Component for generating QR codes for inventory items
 */
const InventoryQRGenerator = ({ item, onClose, onPrint }: InventoryQRGeneratorProps) => {
  const [qrSize, setQrSize] = useState<number>(180);
  
  // Generate QR code value with metadata
  const qrValue = generateQRCodeValue(
    item.id,
    'inventory',
    item.name,
    {
      category: item.category,
      location: item.location,
      quantity: item.quantity,
      lastUpdated: item.lastUpdated,
      // Add any other metadata from the item
      ...Object.entries(item)
        .filter(([key]) => !['id', 'name', 'category', 'location', 'quantity', 'lastUpdated'].includes(key))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    }
  );
  
  const handlePrint = () => {
    // First call the onPrint callback if provided
    if (onPrint) {
      onPrint();
    }
    
    // Open a new window with just the QR code for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    // Create content for the print window
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Code - ${item.name}</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              font-family: Arial, sans-serif;
            }
            .qr-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 8px;
            }
            .item-details {
              margin-top: 15px;
              text-align: center;
            }
            .item-name {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .item-id {
              font-size: 14px;
              color: #666;
              margin-bottom: 5px;
            }
            .item-category {
              font-size: 14px;
              margin-bottom: 5px;
            }
            .item-location {
              font-size: 14px;
            }
            @media print {
              @page {
                size: 58mm 40mm;
                margin: 0;
              }
              body {
                width: 58mm;
                height: 40mm;
              }
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <img src="${document.getElementById('qr-code-svg')?.outerHTML ? 
              'data:image/svg+xml;charset=utf-8,' + 
              encodeURIComponent(document.getElementById('qr-code-svg')?.outerHTML || '') : 
              ''}" width="${qrSize}px" height="${qrSize}px" />
            <div class="item-details">
              <div class="item-name">${item.name}</div>
              <div class="item-id">ID: ${item.id}</div>
              <div class="item-category">Category: ${item.category}</div>
              <div class="item-location">Location: ${item.location}</div>
            </div>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(content);
    printWindow.document.close();
    
    // Print the window after loading
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  return (
    <div className="inventory-qr-generator">
      <div className="qr-header">
        <h3>QR Code for {item.name}</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <div className="qr-content">
        <div className="qr-preview">
          <QRCode 
            value={qrValue}
            size={qrSize}
            level="M"
            bgColor="#FFFFFF"
            fgColor="#000000"
            downloadable={true}
            downloadFileName={`inventory-${item.id}`}
          />
        </div>
        
        <div className="qr-details">
          <div className="item-detail">
            <span className="detail-label">ID:</span>
            <span className="detail-value">{item.id}</span>
          </div>
          <div className="item-detail">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{item.name}</span>
          </div>
          <div className="item-detail">
            <span className="detail-label">Category:</span>
            <span className="detail-value">{item.category}</span>
          </div>
          <div className="item-detail">
            <span className="detail-label">Location:</span>
            <span className="detail-value">{item.location}</span>
          </div>
          <div className="item-detail">
            <span className="detail-label">Quantity:</span>
            <span className="detail-value">{item.quantity}</span>
          </div>
          <div className="item-detail">
            <span className="detail-label">Last Updated:</span>
            <span className="detail-value">{new Date(item.lastUpdated).toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="qr-controls">
        <div className="size-control">
          <label htmlFor="qr-size">Size:</label>
          <input 
            type="range"
            id="qr-size"
            min="100"
            max="300"
            step="10"
            value={qrSize}
            onChange={(e) => setQrSize(Number(e.target.value))}
          />
          <span>{qrSize}px</span>
        </div>
        
        <div className="qr-buttons">
          <button className="print-button" onClick={handlePrint}>
            Print QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryQRGenerator;