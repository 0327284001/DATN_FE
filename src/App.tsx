import React from "react";
import logo from "./logo.svg";
import "./App.css";
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



function App() {
  return (
    <> 
    
      <BrowserRouter>
        <Routes>
          
          <Route path="/login" Component={Login}></Route>
          <Route path="/" Component={Login}></Route>

          <Route path="/register" Component={Register}></Route>

          

          <Route path="/admin" element={<Privaterouter><Admin/></Privaterouter>}>
            <Route path="dashboard" Component={Dashboard}></Route>
            <Route path="add" Component={Add}></Route>
            <Route path="category" Component={Listcategory}></Route>
            <Route path="addcategory" Component={Addcate}></Route>
            <Route path="category/updatecategory/:id" Component={Updatecategory}></Route>
            <Route path="dashboard/update/:id" Component={Update}></Route>
            
          </Route>

        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
