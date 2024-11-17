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



function App() {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
  const data = [12, 19, 3, 5, 2, 3];

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Login và Register */}
          <Route path="/login" Component={Login}></Route>
          <Route path="/" Component={Login}></Route>
          <Route path="/register" Component={Register}></Route>

          {/* Admin Layout */}
          <Route path="/admin" element={<Privaterouter><Admin/></Privaterouter>}>
            {/* Dashboard */}
            <Route path="dashboard" Component={Dashboard}></Route>
            <Route path="add" Component={Add}></Route>
            <Route path="dashboard/update/:id" Component={Update}></Route>

            {/* Quản lý danh mục */}
            <Route path="category" Component={Listcategory}></Route>
            <Route path="addcategory" Component={Addcate}></Route>
            <Route path="category/updatecategory/:id" Component={Updatecategory}></Route>

            {/* Quản lý nhân viên */}
            <Route path="staff" Component={NhanVien}></Route>
             {/* Quản lý chăm sóc khách hàng */}
             <Route path="tro_chuyen" Component={TroChuyen}></Route>

            {/* Thống kê */}
            <Route path="thongke" element={<BarChart labels={labels} data={data} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
