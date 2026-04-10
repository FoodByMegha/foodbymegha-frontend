import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Orders from './pages/Orders'
import Track from './pages/Track'
import AdminOrders from './pages/admin/AdminOrders'
import AddMenu from './pages/admin/AddMenu'
import Revenue from './pages/admin/Revenue'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/track/:id" element={<Track />} />
        
        {/* Admin Routes */}
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/menu" element={<AddMenu />} />
        <Route path="/admin/revenue" element={<Revenue />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App