import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ✅ Chakra imports
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// 🎨 Tema personalizado con tu color y modo oscuro
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  }, fonts: {
    heading: "Roboto, sans-serif",
    body: "Roboto, sans-serif",
  },
  colors: {
    brand: {
      500: "#ca5c43", // Tu color principal
      600: "#d02c12", // Un tono más oscuro para hover
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);

reportWebVitals();
