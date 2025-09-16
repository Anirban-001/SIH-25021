import type { Meta, StoryObj } from '@storybook/react';
import QRCode from './QRCode';

// Meta information for the component
const meta = {
  title: 'Common/QRCode',
  component: QRCode,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { 
      control: 'text',
      description: 'The data to encode in the QR code',
    },
    size: { 
      control: { type: 'range', min: 64, max: 256, step: 8 },
      description: 'The size of the QR code in pixels',
    },
    bgColor: { 
      control: 'color',
      description: 'The background color of the QR code',
    },
    fgColor: { 
      control: 'color', 
      description: 'The foreground color of the QR code',
    },
    level: { 
      control: 'select', 
      options: ['L', 'M', 'Q', 'H'],
      description: 'Error correction level (L: 7%, M: 15%, Q: 25%, H: 30%)',
    },
    downloadable: { 
      control: 'boolean',
      description: 'Whether to include a download button on hover',
    },
    downloadFileName: { 
      control: 'text',
      description: 'The filename when downloading the QR code',
    },
  },
} satisfies Meta<typeof QRCode>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    value: 'https://www.indianrailways.gov.in/',
    size: 128,
    bgColor: '#FFFFFF',
    fgColor: '#000000',
    level: 'M',
    downloadable: true,
    downloadFileName: 'indianrailways-qrcode',
  },
};

// Blue variant
export const BlueVariant: Story = {
  args: {
    value: 'https://www.indianrailways.gov.in/',
    size: 128,
    bgColor: '#F0F8FF',
    fgColor: '#003f7f',
    level: 'M',
    downloadable: true,
    downloadFileName: 'indianrailways-qrcode-blue',
  },
};

// Large QR code
export const Large: Story = {
  args: {
    value: 'https://www.indianrailways.gov.in/',
    size: 200,
    bgColor: '#FFFFFF',
    fgColor: '#000000',
    level: 'H',
    downloadable: true,
    downloadFileName: 'indianrailways-qrcode-large',
  },
};

// High error correction
export const HighErrorCorrection: Story = {
  args: {
    value: 'https://www.indianrailways.gov.in/',
    size: 128,
    bgColor: '#FFFFFF',
    fgColor: '#000000',
    level: 'H',
    downloadable: true,
    downloadFileName: 'indianrailways-qrcode-highEC',
  },
};