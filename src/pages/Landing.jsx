import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="bg-orange-500 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">🍱 FoodByMegha</h1>
        <div className="flex gap-4 items-center">
          <a href="#plans" className="text-white text-sm hover:opacity-80">Plans</a>
          <a href="#about" className="text-white text-sm hover:opacity-80">About</a>
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-orange-500 px-4 py-1.5 rounded-lg text-sm font-semibold"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-orange-500 px-6 pt-12 pb-16 text-center">
        <p className="text-orange-100 text-sm mb-3 uppercase tracking-widest">
          Sarojini Nagar, Lucknow
        </p>
        <h1 className="text-4xl font-bold text-white leading-tight mb-4">
          Ghar Ka Khana,<br />Ghar Pe Pahunche!
        </h1>
        <p className="text-orange-100 text-base mb-8 max-w-md mx-auto">
          Students aur office workers ke liye fresh, healthy aur affordable tiffin — roz subah darwaze pe!
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-orange-500 px-6 py-3 rounded-xl font-semibold"
          >
            Plan Lo Abhi 🍱
          </button>

          <a
            href="#plans"
            className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold"
          >
            Plans Dekho
          </a>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-6 px-8 py-10 max-w-3xl mx-auto">
        <div className="text-center">
          <div className="text-4xl mb-3">🚀</div>
          <h3 className="font-semibold text-gray-800 mb-1">Fast Delivery</h3>
          <p className="text-gray-500 text-sm">30 minute mein ghar pe</p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-3">🍛</div>
          <h3 className="font-semibold text-gray-800 mb-1">Fresh Food</h3>
          <p className="text-gray-500 text-sm">Roz subah fresh banta hai</p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-3">💰</div>
          <h3 className="font-semibold text-gray-800 mb-1">Affordable</h3>
          <p className="text-gray-500 text-sm">Sirf ₹999 se shuru</p>
        </div>
      </div>

      {/* Plans */}
      <div id="plans" className="bg-orange-50 px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Hamare Plans</h2>
        <p className="text-center text-gray-500 mb-8">Apne budget ke hisaab se plan chuno</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">

          <div className="bg-white rounded-2xl p-6 border border-orange-100">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Weekly Tiffin</h3>
            <p className="text-gray-500 text-sm mb-4">7 din ka ghar ka fresh khana</p>
            <p className="text-4xl font-bold text-orange-500 mb-1">₹999</p>
            <p className="text-gray-400 text-sm mb-5">per week</p>
            <button
              onClick={() => navigate('/register')}
              className="w-full bg-orange-500 text-white py-2.5 rounded-xl font-semibold"
            >
              Abhi Lo!
            </button>
          </div>

          <div className="bg-orange-500 rounded-2xl p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-orange-500 text-xs font-bold px-3 py-1 rounded-full">
              Most Popular ⭐
            </div>
            <div className="text-3xl mb-3">🗓️</div>
            <h3 className="text-xl font-bold text-white mb-1">Monthly Tiffin</h3>
            <p className="text-orange-100 text-sm mb-4">30 din ka ghar ka fresh khana</p>
            <p className="text-4xl font-bold text-white mb-1">₹3999</p>
            <p className="text-orange-200 text-sm mb-5">per month</p>
            <button
              onClick={() => navigate('/register')}
              className="w-full bg-white text-orange-500 py-2.5 rounded-xl font-semibold"
            >
              Abhi Lo!
            </button>
          </div>

        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 border-t border-b border-gray-100">
        <div className="text-center py-8 border-r border-gray-100">
          <p className="text-3xl font-bold text-orange-500">500+</p>
          <p className="text-gray-500 text-sm mt-1">Happy Customers</p>
        </div>
        <div className="text-center py-8 border-r border-gray-100">
          <p className="text-3xl font-bold text-orange-500">₹999</p>
          <p className="text-gray-500 text-sm mt-1">Se Shuru</p>
        </div>
        <div className="text-center py-8">
          <p className="text-3xl font-bold text-orange-500">30 min</p>
          <p className="text-gray-500 text-sm mt-1">Delivery Time</p>
        </div>
      </div>

      {/* About */}
      <div id="about" className="px-6 py-12 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Megha Ke Haath Ka Khana 👩‍🍳
        </h2>
        <p className="text-gray-500 leading-relaxed">
          FoodByMegha ek ghar se chalna wali tiffin service hai — jahan Megha roz fresh, healthy aur tasty khana banati hain. Koi preservative nahi, koi artificial flavor nahi — sirf sachcha ghar jaisa khana!
        </p>
      </div>

      {/* Reviews */}
      <div className="bg-orange-50 px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Customers Kya Kehte Hain ⭐
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { name: 'Rahul S.', review: 'Bahut tasty khana! Bilkul ghar jaisa lagta hai. Roz ka tension khatam!', role: 'Student' },
            { name: 'Priya M.', review: 'Office ke baad fresh tiffin mile — kya baat hai! Highly recommended!', role: 'Office Worker' },
            { name: 'Amit K.', review: 'Price bhi sahi, quality ekdum top. Megha didi ka khana best hai!', role: 'Student' },
          ].map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-6">
              <p className="text-yellow-400 text-lg mb-3">⭐⭐⭐⭐⭐</p>
              <p className="text-gray-600 text-sm italic mb-4">"{r.review}"</p>
              <p className="font-semibold text-gray-800 text-sm">{r.name}</p>
              <p className="text-gray-400 text-xs">{r.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-orange-500 px-6 py-14 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Aaj Hi Shuru Karo! 🍱</h2>
        <p className="text-orange-100 mb-8">Pehle din se hi ghar ka swad — register karo abhi!</p>
        <button
          onClick={() => navigate('/register')}
          className="bg-white text-orange-500 px-8 py-3 rounded-xl font-bold text-lg"
        >
          Free Mein Register Karo
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 px-6 py-8 text-center">
        <p className="text-white font-bold text-lg mb-1">🍱 FoodByMegha</p>
        <p className="text-gray-400 text-sm mb-2">Sarojini Nagar, Lucknow</p>

        {/* ✅ Inquiry Number */}
        <a
          href="tel:+919711301479"
          className="text-orange-400 font-semibold text-sm mb-4 block hover:text-orange-300"
        >
          📞 Inquiry: +91 9711301479
        </a>

        <div className="flex justify-center gap-6 mb-4">
          <button onClick={() => navigate('/login')} className="text-gray-400 text-sm hover:text-white">Login</button>
          <button onClick={() => navigate('/register')} className="text-gray-400 text-sm hover:text-white">Register</button>
          <a href="#plans" className="text-gray-400 text-sm hover:text-white">Plans</a>
        </div>
        <p className="text-gray-600 text-xs">© 2026 FoodByMegha. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default Landing