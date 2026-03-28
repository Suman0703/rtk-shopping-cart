import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login, logout, selectIsLoggedIn, selectUser } from '../store/authSlice'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const user = useSelector(selectUser)

  const [form, setForm] = useState({ name: '', email: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email) {
      setError('Please fill in all fields.')
      return
    }
    dispatch(login({ name: form.name, email: form.email }))
    navigate('/')
  }

  // If already logged in — show profile instead
  if (isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-6 py-32 flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-gray-900 text-white flex items-center justify-center text-2xl font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-400 mt-1">{user.email}</p>
        </div>
        <div className="flex gap-3 w-full">
          <Link
            to="/"
            className="flex-1 text-center border border-gray-200 text-gray-700 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Go Shopping
          </Link>
          <button
            onClick={() => dispatch(logout())}
            className="flex-1 bg-gray-900 text-white py-3 text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white border border-gray-100 p-10 w-full max-w-md">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-400 mt-1">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {error && (
            <p className="text-xs text-red-500 bg-red-50 px-4 py-3 border border-red-100">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="John Doe"
              className="border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-900 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="john@example.com"
              className="border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-900 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="bg-gray-900 text-white py-3 text-sm font-medium hover:bg-gray-700 transition-colors mt-2"
          >
            Sign In
          </button>

        </form>
      </div>
    </div>
  )
}

export default LoginPage