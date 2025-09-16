import { useState } from 'react';
import InventoryQRGenerator from '../../components/inventory/InventoryQRGenerator';
import InventoryQRScanner from '../../components/inventory/InventoryQRScanner';
import InventoryAddModal from '../../components/inventory/InventoryAddModal';
import './Inventory.css';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  lotNumber: string;
  supplierName: string;
  manufacturingDate: string;
  status: string;
  location: string;
  quantity: number;
  lastUpdated: string;
}

const Inventory = () => {
  // Sample inventory data for demo
  const inventoryItems: InventoryItem[] = [
    { 
      id: 'ERC-1001', 
      name: 'Elastic Rail Clip', 
      category: 'Fastening System',
      lotNumber: 'L-789', 
      supplierName: 'Jindal Steel', 
      manufacturingDate: '2023-08-15', 
      status: 'IN_STOCK', 
      location: 'Delhi Depot',
      quantity: 500,
      lastUpdated: '2025-09-10T08:30:00Z'
    },
    { 
      id: 'RP-2034', 
      name: 'Rail Pad', 
      category: 'Fastening System',
      lotNumber: 'L-456', 
      supplierName: 'Tata Steel', 
      manufacturingDate: '2023-07-20', 
      status: 'IN_SERVICE', 
      location: 'Mumbai Track Section',
      quantity: 320,
      lastUpdated: '2025-09-08T11:45:00Z'
    },
    { 
      id: 'LNR-3089', 
      name: 'Liner', 
      category: 'Fastening System',
      lotNumber: 'L-123', 
      supplierName: 'SAIL', 
      manufacturingDate: '2023-09-10', 
      status: 'IN_STOCK', 
      location: 'Chennai Depot',
      quantity: 750,
      lastUpdated: '2025-09-12T15:20:00Z'
    },
    { 
      id: 'ERC-1045', 
      name: 'Elastic Rail Clip', 
      category: 'Fastening System',
      lotNumber: 'L-789', 
      supplierName: 'Jindal Steel', 
      manufacturingDate: '2023-08-15', 
      status: 'DEFECTIVE', 
      location: 'Delhi Depot',
      quantity: 25,
      lastUpdated: '2025-09-14T09:10:00Z'
    },
    { 
      id: 'SLP-5012', 
      name: 'Sleeper', 
      category: 'Track Infrastructure',
      lotNumber: 'L-567', 
      supplierName: 'Concrete Industries', 
      manufacturingDate: '2023-06-05', 
      status: 'IN_SERVICE', 
      location: 'Kolkata Track Section',
      quantity: 100,
      lastUpdated: '2025-09-05T14:30:00Z'
    },
  ];

  // State for QR code functionality
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showQRGenerator, setShowQRGenerator] = useState<boolean>(false);
  const [showQRScanner, setShowQRScanner] = useState<boolean>(false);
  const [scannedItem, setScannedItem] = useState<Record<string, any> | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>(inventoryItems);

  // Function to render status badge
  const renderStatusBadge = (status: string) => {
    let className = 'status-badge';
    
    switch (status) {
      case 'IN_STOCK':
        className += ' status-in-stock';
        return <span className={className}>In Stock</span>;
      case 'IN_SERVICE':
        className += ' status-in-service';
        return <span className={className}>In Service</span>;
      case 'DEFECTIVE':
        className += ' status-defective';
        return <span className={className}>Defective</span>;
      case 'RETIRED':
        className += ' status-retired';
        return <span className={className}>Retired</span>;
      default:
        return <span className={className}>{status}</span>;
    }
  };

  const handleGenerateQR = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowQRGenerator(true);
  };

  const handleScanComplete = (data: Record<string, any>) => {
    setScannedItem(data);
    // In a real application, you would search for the item in your inventory
    // and potentially highlight it or show details
  };

  const handleAddItem = (newItemData: Omit<InventoryItem, 'id' | 'lastUpdated'>) => {
    // Generate a new ID (in a real app, this would come from the backend)
    const newId = `ITEM-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Create the new item with current timestamp
    const newItem: InventoryItem = {
      ...newItemData,
      id: newId,
      lastUpdated: new Date().toISOString()
    };
    
    // Add to inventory
    setInventoryData(prev => [...prev, newItem]);
  };

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h2>Inventory Management</h2>
        <div className="search-filter">
          <input 
            type="text" 
            placeholder="Search inventory..." 
            className="search-input" 
          />
          <button className="btn-primary scan-qr" onClick={() => setShowQRScanner(true)}>
            Scan QR Code
          </button>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>Add Item</button>
        </div>
      </div>

      {scannedItem && (
        <div className="scanned-notification">
          <div className="notification-content">
            <span className="notification-label">Item Scanned:</span>
            <span className="notification-value">{scannedItem.name}</span>
          </div>
          <button className="notification-close" onClick={() => setScannedItem(null)}>×</button>
        </div>
      )}

      <table className="inventory-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Lot Number</th>
            <th>Supplier</th>
            <th>Manufacturing Date</th>
            <th>Status</th>
            <th>Location</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item) => (
            <tr key={item.id} className={scannedItem?.id === item.id ? 'highlighted-row' : ''}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.lotNumber}</td>
              <td>{item.supplierName}</td>
              <td>{new Date(item.manufacturingDate).toLocaleDateString()}</td>
              <td>{renderStatusBadge(item.status)}</td>
              <td>{item.location}</td>
              <td>{item.quantity}</td>
              <td>
                <button 
                  className="action-button qr-button"
                  onClick={() => handleGenerateQR(item)}
                >
                  QR Code
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

      {/* Add Inventory Item Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <InventoryAddModal 
              onSubmit={handleAddItem}
              onClose={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;