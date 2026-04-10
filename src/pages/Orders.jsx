import { useState, useEffect } from 'react'
import API from '../api/axios'
import { useNavigate } from 'react-router-dom'

function Orders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await API.get('/orders')
      setOrders(res.data.orders)
    } catch (err) {
      console.log(err)
    }
  }

  const handleCreateOrder = async () => {
    try {
      await API.post('/orders', {
        address: 'Sarojini Nagar, Lucknow',
        notes: 'kam mirch daalna',
      })
      setMessage('Order place ho gaya! 🍱')
      fetchOrders()
    } catch (err) {
      setMessage(err.response?.data?.error || 'Kuch gadbad hui!')
    }
  }

  const getStatusColor = (status) => {
    if (status === 'pending') return 'bg-yellow-100 text-yellow-700'
    if (status === 'out_for_delivery') return 'bg-blue-100 text-blue-700'
    if (status === 'delivered') return 'bg-green-100 text-green-700'
    return 'bg-gray-100 text-gray-700'
  }

  const getStatusText = (status) => {
    if (status === 'pending') return '⏳ Pending'
    if (status === 'out_for_delivery') return '🚗 Delivery Pe Hai'
    if (status === 'delivered') return '✅ Deliver Ho Gaya'
    return status
  }

  return (
    <div className="min-h-screen bg-orange-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-500">🍱 FoodByMegha</h1>
        <button
          onClick={() => navigate('/home')}
          className="text-gray-600 hover:text-orange-500 font-medium"
        >
          ← Wapas Jao
        </button>
      </nav>

      <div className="max-w-3xl mx-auto p-6">

        {/* Message */}
        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-6 text-center">
            {message}
          </div>
        )}

        {/* Order button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Mere Orders</h2>
          <button
            onClick={handleCreateOrder}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            + Aaj Ka Order
          </button>
        </div>

        {/* Orders list */}
        {orders.length === 0 ? (
          <div className="text-center text-gray-400 mt-12">
            <p className="text-5xl mb-4">🍽️</p>
            <p className="text-xl">Koi order nahi hai abhi!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.ID} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-gray-800">Order #{order.ID}</p>
                    <p className="text-gray-500 text-sm">{order.delivery_date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <p className="text-gray-600">📍 {order.address}</p>
                {order.notes && (
                  <p className="text-gray-400 text-sm mt-1">📝 {order.notes}</p>
                )}
                <button
                  onClick={() => navigate(`/track/${order.ID}`)}
                  className="mt-3 text-orange-500 hover:underline text-sm font-medium"
                >
                  Track Karo →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders