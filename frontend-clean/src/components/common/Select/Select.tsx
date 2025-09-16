import { useState } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  onChange?: (value: string) => void;
}

const Select = ({
  label,
  options,
  error,
  helperText,
  fullWidth = false,
  value,
  onChange,
  className = '',
  id,
  ...props
}: SelectProps) => {
  const [isFocused, setIsFocused] = useState(false);
  
  // Generate a unique ID if one isn't provided
  const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).substring(2, 9)}`;
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };
  
  return (
    <div className={`select-container ${fullWidth ? 'select-full-width' : ''} ${className}`}>
      {label && (
        <label htmlFor={selectId} className="select-label">
          {label}
        </label>
      )}
      
      <div className={`select-wrapper ${error ? 'select-error' : ''} ${isFocused ? 'select-focused' : ''}`}>
        <select
          id={selectId}
          className="select-field"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        >
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="select-icon">
          <FiChevronDown />
        </div>
      </div>
      
      {(error || helperText) && (
        <div className={`select-text ${error ? 'select-error-text' : 'select-helper-text'}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};

export default Select;