import { useState, useEffect } from 'react'
import API from '../api/axios'
import { useNavigate, useParams } from 'react-router-dom'

function Track() {
  const navigate = useNavigate()
  const { id } = useParams() // URL se order ID nikalo
  const [order, setOrder] = useState(null)

  useEffect(() => {
    fetchOrder()
  }, [])

  const fetchOrder = async () => {
    try {
      const res = await API.get(`/track/${id}`)
      setOrder(res.data.order)
    } catch (err) {
      console.log(err)
    }
  }

  const steps = [
    { key: 'pending', label: 'Order Place Hua', icon: '📦' },
    { key: 'out_for_delivery', label: 'Delivery Pe Hai', icon: '🚗' },
    { key: 'delivered', label: 'Deliver Ho Gaya', icon: '✅' },
  ]

  const getStepIndex = (status) => {
    return steps.findIndex((s) => s.key === status)
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
        <button
          onClick={() => navigate('/orders')}
          className="text-gray-600 hover:text-orange-500 font-medium"
        >
          ← Wapas Jao
        </button>
      </nav>

      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Track Karo</h2>

        {!order ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-6">

            {/* Order details */}
            <div className="mb-6">
              <p className="font-bold text-gray-800 text-lg">Order #{order.ID}</p>
              <p className="text-gray-500">{order.delivery_date}</p>
              <p className="text-gray-600 mt-1">📍 {order.address}</p>
              {order.notes && (
                <p className="text-gray-400 text-sm mt-1">📝 {order.notes}</p>
              )}
            </div>

            {/* Progress steps */}
            <div className="space-y-4">
              {steps.map((step, index) => {
                const currentIndex = getStepIndex(order.status)
                const isDone = index <= currentIndex
                return (
                  <div key={step.key} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${isDone ? 'bg-orange-500' : 'bg-gray-200'}`}>
                      {step.icon}
                    </div>
                    <p className={`font-medium ${isDone ? 'text-orange-500' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                    {isDone && <span className="text-green-500 ml-auto">✓</span>}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Track