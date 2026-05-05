import { useState } from 'react'
import API from '../api/axios'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')

    // Input change hone pe form update karo
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    // Login button dabane pe
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await API.post('/auth/login', form)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            if (res.data.user?.role === 'admin') {
                navigate('/admin/orders')
            } else {
                navigate('/home')
            }
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
                <p className="text-center text-gray-500 mb-6">Login karo apne account mein</p>

                {/* Error message */}
                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        Login Karo
                    </button>
                </form>

                {/* Register link */}
                <p className="text-center text-gray-500 mt-4">
                    Account nahi hai?{' '}
                    <Link to="/register" className="text-orange-500 font-semibold hover:underline">
                        Register Karo
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login