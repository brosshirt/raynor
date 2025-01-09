import React from "react";
import { Routes, Route } from "react-router-dom";
import ClipFormatter from "../components/ClipFormatter/ClipFormatter"
import Admin from "../components/Admin/Admin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<ClipFormatter/>}/>
      <Route path='/admin' element={<Admin/>}/>
    </Routes>
  )
}

export default AppRoutes