/**
 * Generates a QR code value with metadata for inventory items or other entities
 * 
 * @param id - Unique identifier for the item
 * @param type - Type of item (e.g., 'inventory', 'supplier', 'equipment')
 * @param name - Name of the item
 * @param metadata - Additional metadata to include
 * @returns A string containing a JSON object with all the data
 */
export function generateQRCodeValue(
  id: string,
  type: string,
  name: string,
  metadata: Record<string, any> = {}
): string {
  // Current timestamp for creation
  const timestamp = new Date().toISOString();
  
  // Basic data
  const qrData = {
    id,
    type,
    name,
    createdAt: timestamp,
    // Add any additional metadata
    ...metadata
  };
  
  // Return as JSON string
  return JSON.stringify(qrData);
}

/**
 * Parses a QR code value back into an object
 * 
 * @param qrValue - The string value from the QR code
 * @returns The parsed object or null if invalid
 */
export function parseQRCodeValue(qrValue: string): Record<string, any> | null {
  try {
    return JSON.parse(qrValue);
  } catch (error) {
    console.error('Error parsing QR code value:', error);
    return null;
  }
}

/**
 * Validates a QR code value to ensure it has the required fields
 * 
 * @param qrValue - The string value from the QR code
 * @returns Whether the QR code is valid
 */
export function validateQRCodeValue(qrValue: string): boolean {
  try {
    const data = JSON.parse(qrValue);
    return (
      typeof data === 'object' &&
      data !== null &&
      typeof data.id === 'string' &&
      typeof data.type === 'string' &&
      typeof data.name === 'string' &&
      typeof data.createdAt === 'string'
    );
  } catch (error) {
    return false;
  }
}