import type { ReactNode } from 'react';
import './Card.css';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  headerRight?: ReactNode;
  footer?: ReactNode;
  className?: string;
  noPadding?: boolean;
}

const Card = ({
  children,
  title,
  subtitle,
  headerRight,
  footer,
  className = '',
  noPadding = false,
}: CardProps) => {
  const hasHeader = title || subtitle || headerRight;
  
  return (
    <div className={`card ${className}`}>
      {hasHeader && (
        <div className="card-header">
          <div className="card-header-left">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <div className="card-subtitle">{subtitle}</div>}
          </div>
          {headerRight && (
            <div className="card-header-right">
              {headerRight}
            </div>
          )}
        </div>
      )}
      
      <div className={`card-body ${noPadding ? 'card-body-no-padding' : ''}`}>
        {children}
      </div>
      
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;