import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CreateProduct from './pages/products/createProduct';
import AllProduct from "./pages/products/AllProducts"
import {  Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import EditProduct from './pages/products/editProduct';
import Login from './pages/users/login';
import Register from './pages/users/register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<BrowserRouter>
<Routes>
  <Route path="/addProduct" element={<CreateProduct />} />
  <Route path="/editProduct/:id" element={<EditProduct />} />
  <Route path="/" element={<AllProduct/>} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
</Routes>
</BrowserRouter>
);
