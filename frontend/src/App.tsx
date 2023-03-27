import './App.css';
import LoginForm from './pages/login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/Layout';
import Home from './pages/home/Home';
import RQRegisterForm from './pages/register/RQRegister';
import RQProfile from './pages/profile/RQProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<RQRegisterForm />} />
          <Route path="/profile" element={<RQProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
