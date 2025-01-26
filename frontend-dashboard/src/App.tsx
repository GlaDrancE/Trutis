import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import CreateAgent from './pages/CreateAgent';
import Clients from './pages/Clients';
import QRCodes from './pages/QRCodes';
import PaymentLogs from './pages/PaymentLogs';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/agents/new" element={<CreateAgent />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/qr-codes" element={<QRCodes />} />
            <Route path="/payment-logs" element={<PaymentLogs />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;