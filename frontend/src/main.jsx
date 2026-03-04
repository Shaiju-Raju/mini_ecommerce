import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './Components/CartContext.jsx'
import { AdminProvider } from './Pages/Admin/Components/AdminContext.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <CartProvider>
    <AdminProvider >
      <App />
    </AdminProvider> 
    </CartProvider>
  </StrictMode>,
)
