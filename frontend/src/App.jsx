import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import UserLayout from "./Routes/UserLayout";
import OrderHistory from "./Pages/OrderHistory";
import "./App.css"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./Pages/Orders";
import OrderDetails from "./Pages/OrderDetails";
import AdminDashBoard from "./Pages/Admin/AdminDashBoard";
import AdminRoute from "./Routes/AdminRoute";
import UserRoute from "./Routes/UserRoute";
import RoleRedirect from "./Routes/RoleRedirect";
import PublicRoute from "./Routes/PublicRoute";



function App() {

  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<RoleRedirect> <Home /> </RoleRedirect> } />
          <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />
          <Route path="/cart" element={<UserRoute> <Cart /> </UserRoute>} />
          <Route path="/checkout" element={<UserRoute> <Checkout /> </UserRoute>} />
          <Route path="/orders/:orderId" element={<UserRoute> <Orders /> </UserRoute>} />
          <Route path="/order_history" element={<UserRoute> <OrderHistory /> </UserRoute>} />
          <Route path="/order_history/order_details/:id" element={<UserRoute> <OrderDetails /> </UserRoute>} />
        </Route>

          <Route path="/admin/dashboard" element={<AdminRoute> <AdminDashBoard /> </AdminRoute>} />
      </Routes>
      
    </BrowserRouter>

  )
}

export default App
