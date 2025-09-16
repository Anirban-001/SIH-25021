import type { InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = ({
  label,
  error,
  helperText,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}: InputProps) => {
  // Generate a unique ID if one isn't provided
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).substring(2, 9)}`;
  
  return (
    <div className={`input-container ${fullWidth ? 'input-full-width' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      
      <div className={`input-wrapper ${error ? 'input-error' : ''}`}>
        {leftIcon && <div className="input-icon input-icon-left">{leftIcon}</div>}
        
        <input
          id={inputId}
          className={`input-field ${leftIcon ? 'has-left-icon' : ''} ${rightIcon ? 'has-right-icon' : ''}`}
          {...props}
        />
        
        {rightIcon && <div className="input-icon input-icon-right">{rightIcon}</div>}
      </div>
      
      {(error || helperText) && (
        <div className={`input-text ${error ? 'input-error-text' : 'input-helper-text'}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};

export default Input;