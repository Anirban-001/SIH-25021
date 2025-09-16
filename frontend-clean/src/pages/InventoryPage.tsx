import { useState } from 'react';
import InventoryQRGenerator from '../components/inventory/InventoryQRGenerator';
import InventoryQRScanner from '../components/inventory/InventoryQRScanner';
import './InventoryPage.css';

// Sample inventory data
const sampleInventoryItems = [
  {
    id: 'INV-001',
    name: 'Brake Shoe Assembly',
    category: 'Brake Components',
    location: 'Warehouse A-12',
    quantity: 150,
    unit: 'pcs',
    lastUpdated: '2025-09-10T08:30:00Z',
    supplierInfo: {
      id: 'SUP-005',
      name: 'Bharat Railways Supply Co.'
    },
    specifications: {
      material: 'Cast Iron',
      weight: '2.5kg',
      dimensions: '280mm x 80mm x 30mm'
    }
  },
  {
    id: 'INV-002',
    name: 'Axle Bearings',
    category: 'Wheel Components',
    location: 'Warehouse B-05',
    quantity: 320,
    unit: 'pcs',
    lastUpdated: '2025-09-12T14:15:00Z',
    supplierInfo: {
      id: 'SUP-008',
      name: 'Techno Bearings Ltd.'
    },
    specifications: {
      type: 'Roller Bearing',
      size: '120mm',
      loadCapacity: '25 tons'
    }
  },
  {
    id: 'INV-003',
    name: 'Control Panel Units',
    category: 'Electronics',
    location: 'Secure Storage C-01',
    quantity: 42,
    unit: 'sets',
    lastUpdated: '2025-09-15T09:45:00Z',
    supplierInfo: {
      id: 'SUP-012',
      name: 'ElectroTech Systems'
    },
    specifications: {
      voltage: '24V DC',
      interfaces: 'MODBUS, CAN',
      certification: 'ISO 9001:2025'
    }
  }
];

const InventoryPage = () => {
  const [selectedItem, setSelectedItem] = useState<typeof sampleInventoryItems[0] | null>(null);
  const [showQRGenerator, setShowQRGenerator] = useState<boolean>(false);
  const [showQRScanner, setShowQRScanner] = useState<boolean>(false);
  const [scannedItem, setScannedItem] = useState<Record<string, any> | null>(null);

  const handleGenerateQR = (item: typeof sampleInventoryItems[0]) => {
    setSelectedItem(item);
    setShowQRGenerator(true);
  };

  const handleScanComplete = (data: Record<string, any>) => {
    setScannedItem(data);
    // You could also search for the item in your inventory based on the scanned ID
  };

  return (
    <div className="inventory-page">
      <div className="page-header">
        <h1>Inventory Management</h1>
        <div className="page-actions">
          <button className="scan-button" onClick={() => setShowQRScanner(true)}>
            Scan QR Code
          </button>
        </div>
      </div>

      {scannedItem && (
        <div className="scanned-item-banner">
          <div className="scanned-item-info">
            <span className="scan-label">Last Scanned Item:</span>
            <span className="scan-value">{scannedItem.name}</span>
          </div>
          <button className="clear-scan" onClick={() => setScannedItem(null)}>×</button>
        </div>
      )}

      <div className="inventory-table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Quantity</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sampleInventoryItems.map((item) => (
              <tr key={item.id} className={scannedItem?.id === item.id ? 'highlighted-row' : ''}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.location}</td>
                <td>{item.quantity} {item.unit}</td>
                <td>{new Date(item.lastUpdated).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="generate-qr-button"
                    onClick={() => handleGenerateQR(item)}
                  >
                    Generate QR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* QR Code Generator Modal */}
      {showQRGenerator && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-container">
            <InventoryQRGenerator 
              item={selectedItem}
              onClose={() => setShowQRGenerator(false)}
            />
          </div>
        </div>
      )}

      {/* QR Code Scanner Modal */}
      {showQRScanner && (
        <div className="modal-overlay">
          <div className="modal-container">
            <InventoryQRScanner 
              onScanComplete={handleScanComplete}
              onClose={() => setShowQRScanner(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;