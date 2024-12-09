import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./Pages/Home/Home";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Navbar from "./NavBar/Navbar";
import Footer from "./Footer/Footer";
import AboutUs from "./AboutUs/AboutUs";
import Products from "./Pages/Products/ProductsPage";
import Orders from "./Pages/Orders/Orders.js";
import OrderDetail from './Pages/Orders/OrderDetail';
import ProductDetailsPage from "./Pages/Products/ProductDetailPage";
import AddProductPage from "./Pages/Admin/Product/AddProductPage";
import ProductUpdatePage from "./Pages/Admin/Product/ProductUpdatePage";


function App() {
  return (
      <Router>
        <Navbar />
        <div>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/admin/product/create" element={<AddProductPage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin/product/create" element={<AddProductPage />} />
          <Route path="/admin/product/update/:productId" element={<ProductUpdatePage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/orders/:orderId" element={<OrderDetail />} />
          </Routes>
        </div>
          <Footer />
      </Router>
  ); 
}

export default App;
