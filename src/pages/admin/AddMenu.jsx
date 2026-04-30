import { useState } from 'react'
import API from '../../api/axios'
import { useNavigate } from 'react-router-dom'

function AddMenu() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    duration_days: '',
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await API.post('/admin/menu', {
        ...form,
        price: parseFloat(form.price),
        duration_days: parseInt(form.duration_days),
      })
      setMessage('Naya plan add ho gaya! 🍱')
      setForm({ name: '', description: '', price: '', duration_days: '' })
    } catch (err) {
      setError(err.response?.data?.error || 'Kuch gadbad hui!')
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

      <div className="max-w-lg mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Naya Plan Add Karo</h2>

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Plan Ka Naam</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Monthly Tiffin"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Description</label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="30 din ka ghar ka khana"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="3999"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Kitne Din Ka Plan</label>
              <input
                type="number"
                name="duration_days"
                value={form.duration_days}
                onChange={handleChange}
                placeholder="30"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Plan Add Karo 🍱
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddMenu