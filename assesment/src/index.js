import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from './App';

// Create a custom theme with white background and black text
const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'white',
        color: 'black',
      },
      '#root': {
        backgroundColor: 'white',
      },
      // Set default text color for all text elements
      'h1, h2, h3, h4, h5, h6, p, span, td, th, button, text': {
        color: 'black !important',
      },
      // Style table headers
      'th': {
        color: 'black !important',
      },
      // Style table cells
      'td': {
        color: 'black !important',
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  // Override default component styles
  components: {
    Heading: {
      baseStyle: {
        color: 'black',
      },
    },
    Text: {
      baseStyle: {
        color: 'black',
      },
    },
    Table: {
      baseStyle: {
        th: {
          color: 'black',
        },
        td: {
          color: 'black',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
