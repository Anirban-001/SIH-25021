import { useState } from 'react';
import type { FormEvent } from 'react';
import './InventoryAddModal.css';

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

interface InventoryAddModalProps {
  onClose: () => void;
  onSubmit: (item: Omit<InventoryItem, 'id' | 'lastUpdated'>) => void;
}

const InventoryAddModal = ({ onClose, onSubmit }: InventoryAddModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Fastening System',
    lotNumber: '',
    supplierName: '',
    manufacturingDate: '',
    status: 'IN_STOCK',
    location: '',
    quantity: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.lotNumber.trim()) {
      newErrors.lotNumber = 'Lot number is required';
    }
    
    if (!formData.supplierName.trim()) {
      newErrors.supplierName = 'Supplier name is required';
    }
    
    if (!formData.manufacturingDate) {
      newErrors.manufacturingDate = 'Manufacturing date is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <div className="inventory-add-modal">
      <div className="modal-header">
        <h3>Add New Inventory Item</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Item Name <span className="required">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category <span className="required">*</span></label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Fastening System">Fastening System</option>
              <option value="Track Infrastructure">Track Infrastructure</option>
              <option value="Signaling Equipment">Signaling Equipment</option>
              <option value="Maintenance Tools">Maintenance Tools</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="lotNumber">Lot Number <span className="required">*</span></label>
            <input
              type="text"
              id="lotNumber"
              name="lotNumber"
              value={formData.lotNumber}
              onChange={handleChange}
              className={errors.lotNumber ? 'error' : ''}
            />
            {errors.lotNumber && <div className="error-message">{errors.lotNumber}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="supplierName">Supplier Name <span className="required">*</span></label>
            <input
              type="text"
              id="supplierName"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              className={errors.supplierName ? 'error' : ''}
            />
            {errors.supplierName && <div className="error-message">{errors.supplierName}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="manufacturingDate">Manufacturing Date <span className="required">*</span></label>
            <input
              type="date"
              id="manufacturingDate"
              name="manufacturingDate"
              value={formData.manufacturingDate}
              onChange={handleChange}
              className={errors.manufacturingDate ? 'error' : ''}
            />
            {errors.manufacturingDate && <div className="error-message">{errors.manufacturingDate}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="status">Status <span className="required">*</span></label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="IN_STOCK">In Stock</option>
              <option value="IN_SERVICE">In Service</option>
              <option value="DEFECTIVE">Defective</option>
              <option value="RETIRED">Retired</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Location <span className="required">*</span></label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? 'error' : ''}
            />
            {errors.location && <div className="error-message">{errors.location}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="quantity">Quantity <span className="required">*</span></label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              className={errors.quantity ? 'error' : ''}
            />
            {errors.quantity && <div className="error-message">{errors.quantity}</div>}
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">Add Item</button>
        </div>
      </form>
    </div>
  );
};

export default InventoryAddModal;