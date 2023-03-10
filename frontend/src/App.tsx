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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
