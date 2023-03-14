import React from 'react';
import logo from './logo.svg';
import './App.css';
import RegisterForm from './pages/register/Register';
import LoginForm from './pages/login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/Layout';
import Logout from './pages/logout/Logout';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import RQLoginForm from './pages/login/RQLogin';
import RQLogout from './pages/logout/RQLogout';
import RQRegisterForm from './pages/register/RQRegister';
import RQProfile from './pages/profile/RQProfile';
import RQMainLayout from './layout/RQLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RQMainLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<RQLoginForm />} />
          <Route path="/logout" element={<RQLogout />} />
          <Route path="/signup" element={<RQRegisterForm />} />
          <Route path="/profile" element={<RQProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
