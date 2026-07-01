import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ColorThemeProvider } from "./context/context.jsx";
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ColorThemeProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
            className: "capitalize text-[14px] font-semibold",
          }}
        />
        <App />
      </ColorThemeProvider>
    </QueryClientProvider>
</BrowserRouter>
  </React.StrictMode>
);
