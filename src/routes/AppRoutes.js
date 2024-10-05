import React from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignUp from '../components/Registration/SignUp';
import Login from '../components/Registration/Login';
import ResetPassword from '../components/Registration/ResetPassword';
import Dashboard from '../components/screens/DashBoard';
import PendingRequest from '../components/screens/PendingRequest';
import HelpAndSupport from '../components/screens/HelpAndSupport';
import CreateProvider from '../components/screens/CreateProvider';
function AppRoutes() {
  // const location = useLocation();
  // const { pathname } = location;
  
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/dashboard" />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/resetpassword' element={<ResetPassword />} />

      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/pendingRequest' element={<PendingRequest />} />
      <Route path='/helpandsupport' element={<HelpAndSupport />} />
      <Route path='/createprovider' element={<CreateProvider />} />
    </Routes>
  );
}

export default AppRoutes;