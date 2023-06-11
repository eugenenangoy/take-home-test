import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "../Pages/beranda";
import ListBarang from "../Pages/list_barang";
import LoginPage from "../Pages/login";
import RegisterForm from "../Pages/registerForm";

export default function IndexRoutes(props) {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/beranda" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/barang" element={<PrivateRoute><ListBarang /></PrivateRoute>} />

            {/* <Route path="*" element={<EmptyPage />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    );
}

const PrivateRoute = (props) =>{
  const token = localStorage.getItem('token')
  if(!token) return <Navigate to ='/'/>
  return props.children
}