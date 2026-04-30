import { useState, useEffect } from 'react'
import API from '../../api/axios'
import { useNavigate } from 'react-router-dom'

function AdminOrders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await API.get('/admin/orders')
      setOrders(res.data.orders)
    } catch (err) {
      console.log(err)
    }
  }

  const handleStatusUpdate = async (orderId, status) => {
    try {
      await API.put(`/admin/orders/${orderId}/status`, { status })
      fetchOrders()
    } catch (err) {
      console.log(err)
    }
  }

  const getStatusColor = (status) => {
    if (status === 'pending') return 'bg-yellow-100 text-yellow-700'
    if (status === 'out_for_delivery') return 'bg-blue-100 text-blue-700'
    if (status === 'delivered') return 'bg-green-100 text-green-700'
    return 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="min-h-screen bg-orange-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1
          onClick={() => navigate('/')}
          className="text-2xl font-bold text-orange-500 cursor-pointer"
        >
          🍱 FoodByMegha
        </h1>
        <div className="flex gap-4">
          <button onClick={() => navigate('/admin/menu')}
            className="text-gray-600 hover:text-orange-500 font-medium">
            Menu Add Karo
          </button>
          <button onClick={() => navigate('/admin/revenue')}
            className="text-gray-600 hover:text-orange-500 font-medium">
            Revenue
          </button>
          <button onClick={() => { localStorage.removeItem('token'); navigate('/login') }}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Saare Orders
            <span className="ml-2 text-orange-500">({orders.length})</span>
          </h2>
        </div>

        {orders.length === 0 ? (
          <div className="text-center text-gray-400 mt-12">
            <p className="text-5xl mb-4">📋</p>
            <p className="text-xl">Koi order nahi abhi!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.ID} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-gray-800">Order #{order.ID}</p>
                    <p className="text-gray-500 text-sm">{order.delivery_date}</p>
                    <p className="text-gray-600 text-sm mt-1">
                      👤 {order.user?.name} — {order.user?.phone}
                    </p>
                    <p className="text-gray-600 text-sm">📍 {order.address}</p>
                    {order.notes && (
                      <p className="text-gray-400 text-sm">📝 {order.notes}</p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {/* Status update buttons */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleStatusUpdate(order.ID, 'pending')}
                    className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm hover:bg-yellow-200"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(order.ID, 'out_for_delivery')}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
                  >
                    Out for Delivery
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(order.ID, 'delivered')}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200"
                  >
                    Delivered
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminOrders