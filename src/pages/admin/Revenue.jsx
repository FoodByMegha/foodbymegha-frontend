import { useState, useEffect } from 'react'
import API from '../../api/axios'
import { useNavigate } from 'react-router-dom'

function Revenue() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchRevenue()
  }, [])

  const fetchRevenue = async () => {
    try {
      const res = await API.get('/admin/revenue')
      setData(res.data || null)
    } catch (err) {
      console.log(err)
    }
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
          onClick={() => navigate('/admin/orders')}
          className="text-gray-600 hover:text-orange-500 font-medium"
        >
          ← Wapas Jao
        </button>
      </nav>

      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Aaj Ki Kamaai 💰
        </h2>

        {!data ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Revenue card */}
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <p className="text-4xl mb-2">💰</p>
              <p className="text-3xl font-bold text-orange-500">
                ₹{data.today_revenue}
              </p>
              <p className="text-gray-500 mt-1">Aaj Ki Kamaai</p>
            </div>

            {/* Payments card */}
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <p className="text-4xl mb-2">💳</p>
              <p className="text-3xl font-bold text-orange-500">
                {data.today_payments}
              </p>
              <p className="text-gray-500 mt-1">Aaj Ki Payments</p>
            </div>

            {/* Subscriptions card */}
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <p className="text-4xl mb-2">👥</p>
              <p className="text-3xl font-bold text-orange-500">
                {data.active_subscriptions}
              </p>
              <p className="text-gray-500 mt-1">Active Subscribers</p>
            </div>

            {/* Date */}
            <div className="col-span-1 md:col-span-3 bg-orange-100 rounded-2xl p-4 text-center">
              <p className="text-gray-600 font-medium">📅 Date: {data.date}</p>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default Revenue