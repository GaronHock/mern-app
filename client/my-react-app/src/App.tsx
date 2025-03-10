// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Home route */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard/:username" element={<Dashboard />} />{' '}
      {/* Dashboard route with username */}
    </Routes>
  );
};

export default App;
