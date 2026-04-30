import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Orders from './pages/Orders'
import Track from './pages/Track'
import AdminOrders from './pages/admin/AdminOrders'
import AddMenu from './pages/admin/AddMenu'
import Revenue from './pages/admin/Revenue'

// ✅ Admin route guard
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!token) return <Navigate to="/login" />
  if (user.role !== 'admin') return <Navigate to="/home" />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/track/:id" element={<Track />} />

        {/* ✅ Protected Admin Routes */}
        <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
        <Route path="/admin/menu" element={<AdminRoute><AddMenu /></AdminRoute>} />
        <Route path="/admin/revenue" element={<AdminRoute><Revenue /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App