import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../Pages/beranda";
import ListBarang from "../Pages/list_barang";
import LoginPage from "../Pages/login";
import RegisterForm from "../Pages/registerForm";

export default function IndexRoutes() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/beranda" element={<Home />} />
            <Route path="/barang" element={<ListBarang />} />

            {/* <Route path="*" element={<EmptyPage />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    );
}