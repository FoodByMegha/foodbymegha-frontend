import { useState } from 'react'
import API from '../api/axios'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await API.post('/auth/register', form)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.error || 'Kuch gadbad hui!')
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

        {/* Header */}
        <h1
          onClick={() => navigate('/')}
          className="text-3xl font-bold text-orange-500 text-center mb-2 cursor-pointer"
        >
          🍱 FoodByMegha
        </h1>
        <p className="text-center text-gray-500 mb-6">Naya account banao</p>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Naam</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="9999999999"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Register Karo
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-gray-500 mt-4">
          Pehle se account hai?{' '}
          <Link to="/login" className="text-orange-500 font-semibold hover:underline">
            Login Karo
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register