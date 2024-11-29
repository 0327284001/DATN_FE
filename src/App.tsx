import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./layout/Admin";
import Dashboard from "./components/admin/Dashboard";
import Add from "./components/admin/add";
import Update from "./components/admin/update";
import Login from "./components/login";
import Register from "./components/register";
import Privaterouter from "./components/privaterouter";
import Addcategory from "./components/admin/Category";
import Updatecategory from "./components/admin/Updatecategory";
import Listcategory from "./components/admin/Category";
import Addcate from "./components/admin/addCategory";
import BarChart from "./components/chart/BarChart";
import NhanVien from "./components/nhanVien/nhan_vien";
import TroChuyen from "./components/trochuyen/tro_chuyen";
import ProductDetail from "./components/admin/ProductDetail";
import UpdateProduct from "./components/admin/update";
import ProductDetails from "./components/admin/ProductDetail";

function App() {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
  const data = [12, 19, 3, 5, 2, 3];

  return (
    <BrowserRouter>
      <Routes>
        {/* Login và Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Layout */}
        <Route path="/admin" element={<Privaterouter><Admin /></Privaterouter>}>
          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Chi tiết sản phẩm */}
          <Route path="dashboard/product/details/:id" element={<ProductDetails />} />

          <Route path="add" element={<Add />} />
          <Route path="/admin/dashboard/:id" element={<Update />} />

          {/* Quản lý danh mục */}
          <Route path="category" element={<Listcategory />} />
          <Route path="addcategory" element={<Addcate />} />
          <Route path="category/updatecategory/:id" element={<Updatecategory />} />

          {/* Quản lý nhân viên */}
          <Route path="staff" element={<NhanVien />} />

          {/* Quản lý chăm sóc khách hàng */}
          <Route path="tro_chuyen" element={<TroChuyen />} />

          {/* Thống kê */}
          <Route path="thongke" element={<BarChart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
