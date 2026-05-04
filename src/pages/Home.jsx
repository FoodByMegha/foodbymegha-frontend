import { useState, useEffect } from 'react'
import API from '../api/axios'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const [plans, setPlans] = useState([])
  const [myPlan, setMyPlan] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPlans()
    fetchMyPlan()
  }, [])

  const fetchPlans = async () => {
    try {
      const res = await API.get('/plans')
      setPlans(res.data.plans || [])
    } catch (err) {
      console.log(err)
    }
  }

  const fetchMyPlan = async () => {
    try {
      const res = await API.get('/my-plan')
      setMyPlan(res.data.my_plan || null)
    } catch (err) {
      // No active plan — koi baat nahi
    }
  }

  const handlePayment = async (plan) => {
    setLoading(true)
    try {
      // Step 1 — Backend se Razorpay order banao
      const res = await API.post('/payment', { plan_id: plan.ID })
      const { razorpay_order_id, amount, currency, key_id, plan_name } = res.data

      // Step 2 — Razorpay window kholo
      const options = {
        key: key_id,
        amount: amount,
        currency: currency,
        name: 'FoodByMegha',
        description: plan_name,
        order_id: razorpay_order_id,
        handler: async function (response) {
          // Step 3 — Payment verify karo
          try {
            await API.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
            setMessage('Payment successful! Subscription active ho gaya! 🎉')
            fetchMyPlan()
          } catch (err) {
            setMessage('Payment verify nahi hui!')
          }
        },
        prefill: {
          name: 'FoodByMegha Customer',
          contact: '',
          email: '',
        },
        theme: {
          color: '#f97316',
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      setMessage(err.response?.data?.error || 'Kuch gadbad hui!')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
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
          <button
            onClick={() => navigate('/orders')}
            className="text-gray-600 hover:text-orange-500 font-medium"
          >
            Mere Orders
          </button>
          <button
            onClick={handleLogout}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">

        {/* Message */}
        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-6 text-center">
            {message}
          </div>
        )}

        {/* Active Plan */}
        {myPlan && (
          <div className="bg-orange-100 border border-orange-300 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-orange-600 mb-2">✅ Tera Active Plan</h2>
            <p className="text-gray-700">Plan: <strong>{myPlan.Plan?.name || myPlan.plan?.name}</strong></p>
            <p className="text-gray-700">Shuru: {new Date(myPlan.start_date).toLocaleDateString('hi-IN')}</p>
            <p className="text-gray-700">Khatam: {new Date(myPlan.end_date).toLocaleDateString('hi-IN')}</p>
          </div>
        )}

        {/* Plans */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div key={plan.ID} className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
              <p className="text-gray-500 mb-3">{plan.description}</p>
              <p className="text-3xl font-bold text-orange-500 mb-1">₹{plan.price}</p>
              <p className="text-gray-400 text-sm mb-4">{plan.duration_days} din ka plan</p>
              <button
                onClick={() => handlePayment(plan)}
                disabled={!!myPlan || loading}
                className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {myPlan ? 'Plan Active Hai' : loading ? 'Processing...' : '💳 Pay Karo & Subscribe'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home