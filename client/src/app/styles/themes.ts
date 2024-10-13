import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// Define your custom colors
const colors = {
  brand: {
    'polynesian-blue': '#004b91ff',
    'alice-blue': '#f6fbffff',
    'bright-pink-crayola': '#ea526fff',
    'smoky-black': '#070600ff',
    'celestial-blue': '#279af1ff',
  },
};

// Define any additional theme settings, e.g., fonts, radii, fontWeights, etc.
const fonts = {
  body: 'Roboto, system-ui, sans-serif',
  heading: 'Roboto, system-ui, sans-serif',
  mono: 'Menlo, monospace',
};

const fontWeights = {
  normal: 400,
  medium: 600,
  bold: 700,
};

const radii = {
  sm: '5px',
  md: '8px',
};

// Combine these into a theme object
const customTheme = extendTheme({
  colors,
  fonts,
  fontWeights,
  radii,
});

export default customTheme;
