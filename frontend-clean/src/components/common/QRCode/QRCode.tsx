import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import './QRCode.css';

interface QRCodeProps {
  /**
   * The data to encode in the QR code
   */
  value: string;
  
  /**
   * The size of the QR code in pixels
   */
  size?: number;
  
  /**
   * The background color of the QR code
   */
  bgColor?: string;
  
  /**
   * The foreground color of the QR code
   */
  fgColor?: string;
  
  /**
   * The level of error correction
   * L - Low (7%)
   * M - Medium (15%)
   * Q - Quartile (25%)
   * H - High (30%)
   */
  level?: 'L' | 'M' | 'Q' | 'H';
  
  /**
   * Whether to include a download button
   */
  downloadable?: boolean;
  
  /**
   * The filename to use when downloading the QR code
   */
  downloadFileName?: string;
  
  /**
   * Custom className
   */
  className?: string;
}

/**
 * QR Code component for generating QR codes
 */
const QRCode = ({
  value,
  size = 128,
  bgColor = '#FFFFFF',
  fgColor = '#000000',
  level = 'M',
  downloadable = false,
  downloadFileName = 'qrcode',
  className,
}: QRCodeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleDownload = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;
    
    // Create a blob from the SVG
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    
    // Create a URL from the blob
    const url = URL.createObjectURL(svgBlob);
    
    // Create a link element and click it to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${downloadFileName}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className={`qr-code-container ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <QRCodeSVG
        id="qr-code-svg"
        value={value}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        level={level}
        className="qr-code"
      />
      
      {downloadable && isHovered && (
        <button 
          className="qr-code-download-button"
          onClick={handleDownload}
          aria-label="Download QR Code"
        >
          Download
        </button>
      )}
    </div>
  );
};

export default QRCode;