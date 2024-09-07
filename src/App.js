import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Dashboard from "./page/Dashboard";
import Order from "./components/Order";
import ListProducts from "./page/ListProducts";
import ProductsAdd from "./page/ProductsAdd";
import AdminAdd from "./page/AdminAdd";
import CustomerAdd from "./page/CustomerAdd";
import Customer from "./components/Customer";
import Profile from "./components/Profile";
import Login from "./auth/Login";
import Income from "./components/Income";
import Alladmin from "./components/Alladmin";
import StatusProducts from "./components/detailsProducts/StatusProducts";
import OrderManagement from "./OrderManagement";
import Swal from "sweetalert2";
import ParentComponent from "./redux/ParentComponent";

function App() {
  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState(null);
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   if (!token) {
  //     Swal.fire({
  //       title: "Fail",
  //       text: "You need to log in to access this page.",
  //       icon: "error",
  //       confirmButtonText: "Close",
  //     }).then(() => {
  //       navigate("/login");
  //     });
  //   }
  // }, [token, navigate]);
   useEffect(() => {
     const handleUserActivity = () => {
       if (timeoutId) {
         clearTimeout(timeoutId);
       }
       const id = setTimeout(() => {
         navigate('/login');
         localStorage.removeItem("token");
       }, 3 * 24 * 60 * 60 * 1000);  
// 3d
// 
       setTimeoutId(id);
     };

     window.addEventListener('mousemove', handleUserActivity);
     window.addEventListener('keydown', handleUserActivity);

     return () => {
       window.removeEventListener('mousemove', handleUserActivity);
       window.removeEventListener('keydown', handleUserActivity);
       if (timeoutId) {
         clearTimeout(timeoutId);
       }
     };
   }, [timeoutId, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/order" element={<Order />} />
      <Route path="/listProducts" element={<ListProducts />} />
      <Route path="/addProducts" element={<ProductsAdd />} />
      <Route path="/adminAdd" element={<AdminAdd />} />
      <Route path="/customerAdd" element={<CustomerAdd />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/income" element={<Income />} />
      <Route path="/admin" element={<Alladmin />} />
      <Route path="/status_Products" element={<StatusProducts />} />
      <Route path="/test" element={<OrderManagement />} />
      {/* <Route path="/testApi" element={<ParentComponent />} /> */}
    </Routes>
  );
}

export default App;
