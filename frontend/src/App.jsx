import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Navbar from "./Components/Navbar";
import OrderHistory from "./Pages/OrderHistory";
import "./App.css"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./Pages/Orders";
import OrderDetails from "./Pages/OrderDetails";


function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="/orders/:orderId" element={<Orders />} />
        <Route path="order_history" element={<OrderHistory />} />
        <Route path="order_history/order_details/:id" element={<OrderDetails />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
