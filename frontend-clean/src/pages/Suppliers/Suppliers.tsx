import { useState } from 'react';
import SupplierAddModal from '../../components/suppliers/SupplierAddModal';
import './Suppliers.css';

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: string;
  rating: number;
  status: string;
}

// Available supplier statuses
const SUPPLIER_STATUSES = ['ACTIVE', 'INACTIVE', 'BLACKLISTED'];

const Suppliers = () => {
  // Sample suppliers data for demo
  const supplierItems = [
    { 
      id: 'SUP-001', 
      name: 'Jindal Steel', 
      contactPerson: 'Rajesh Kumar', 
      email: 'rajesh@jindal.com', 
      phone: '+91 9876543210', 
      category: 'MANUFACTURER',
      rating: 4,
      status: 'ACTIVE'
    },
    { 
      id: 'SUP-002', 
      name: 'Tata Steel', 
      contactPerson: 'Amit Sharma', 
      email: 'amit@tatasteel.com', 
      phone: '+91 9876543211', 
      category: 'MANUFACTURER',
      rating: 5,
      status: 'ACTIVE'
    },
    { 
      id: 'SUP-003', 
      name: 'SAIL', 
      contactPerson: 'Priya Gupta', 
      email: 'priya@sail.com', 
      phone: '+91 9876543212', 
      category: 'MANUFACTURER',
      rating: 4,
      status: 'ACTIVE'
    },
    { 
      id: 'SUP-004', 
      name: 'Metro Distributors', 
      contactPerson: 'Sanjay Patel', 
      email: 'sanjay@metrodist.com', 
      phone: '+91 9876543213', 
      category: 'DISTRIBUTOR',
      rating: 3,
      status: 'INACTIVE'
    },
    { 
      id: 'SUP-005', 
      name: 'Global Rail Components', 
      contactPerson: 'Neha Singh', 
      email: 'neha@globalrail.com', 
      phone: '+91 9876543214', 
      category: 'IMPORTER',
      rating: 2,
      status: 'BLACKLISTED'
    },
  ];

  // State
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [suppliersData, setSuppliersData] = useState<Supplier[]>(supplierItems);

  // Handler for adding a new supplier
  const handleAddSupplier = (newSupplierData: Omit<Supplier, 'id'>) => {
    // Generate a new ID (in a real app, this would come from the backend)
    const newId = `SUP-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Create the new supplier
    const newSupplier: Supplier = {
      ...newSupplierData,
      id: newId
    };
    
    // Add to suppliers list
    setSuppliersData(prev => [...prev, newSupplier]);
  };

  // Handler for updating supplier status
  const handleStatusChange = (supplierId: string, newStatus: string) => {
    setSuppliersData(prevSuppliers => 
      prevSuppliers.map(supplier => 
        supplier.id === supplierId 
          ? { ...supplier, status: newStatus } 
          : supplier
      )
    );
  };

  // Function to render editable status dropdown
  const renderStatusDropdown = (supplier: Supplier) => {
    return (
      <div className="status-edit-container">
        <select 
          className={`status-select status-${supplier.status.toLowerCase()}`}
          value={supplier.status}
          onChange={(e) => handleStatusChange(supplier.id, e.target.value)}
        >
          {SUPPLIER_STATUSES.map(status => (
            <option key={status} value={status}>
              {status === 'ACTIVE' ? 'Active' : 
               status === 'INACTIVE' ? 'Inactive' : 
               status === 'BLACKLISTED' ? 'Blacklisted' : status}
            </option>
          ))}
        </select>
      </div>
    );
  };

  // Function to render star rating
  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star-filled">★</span>);
      } else {
        stars.push(<span key={i} className="star-empty">☆</span>);
      }
    }
    return <div className="supplier-rating">{stars}</div>;
  };

  return (
    <div className="suppliers-container">
      <div className="suppliers-header">
        <h2>Suppliers Management</h2>
        <button className="btn-primary btn-compact" onClick={() => setShowAddModal(true)}>Add Supplier</button>
      </div>

      <table className="suppliers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact Person</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {suppliersData.map((supplier: Supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.id}</td>
              <td>{supplier.name}</td>
              <td>{supplier.contactPerson}</td>
              <td>{supplier.email}</td>
              <td>{supplier.phone}</td>
              <td>{supplier.category}</td>
              <td>{renderRating(supplier.rating)}</td>
              <td>{renderStatusDropdown(supplier)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Add Supplier Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <SupplierAddModal 
              onSubmit={handleAddSupplier}
              onClose={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;