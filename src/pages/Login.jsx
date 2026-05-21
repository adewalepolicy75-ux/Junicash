import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import { loginUser } from '../services/api'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please fill in all fields')
      return
    }
    setLoading(true)
    setError('')
    const res = await loginUser(form)
    setLoading(false)
    if (res.user) {
      localStorage.setItem('user', JSON.stringify(res.user))
      navigate('/dashboard')
    } else {
      setError(res.message || 'Login failed')
    }
  }

  const input = { background: '#ffffff', border: '1px solid #c4b5fd', borderRadius: '10px', color: '#0a0a0f', padding: '0.75rem 1rem', fontSize: '0.95rem', width: '100%', outline: 'none', marginBottom: '1rem' }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: '#0a0a0f', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>Juni<span style={{ color: '#8b5cf6' }}>Cash</span></h1>
        <Link to='/' style={{ color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none', fontSize: '0.85rem' }}>
          <FiHome size={18} /> Home
        </Link>
      </nav>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', padding: '2rem' }}>
        <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '2.5rem', width: '100%', maxWidth: '420px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '0.5rem' }}>Welcome back</h2>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Sign in to your JuniCash account</p>
          </div>
          {error && (
            <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.85rem' }}>{error}</div>
          )}
          <form onSubmit={handleSubmit}>
            <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Email</label>
            <input type='email' name='email' placeholder='you@example.com' value={form.email} onChange={handleChange} style={input} />
            <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Password</label>
            <input type='password' name='password' placeholder='••••••••' value={form.password} onChange={handleChange} style={input} />
            <button type='submit' disabled={loading} style={{ background: '#6d28d9', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '0.85rem', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', width: '100%', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#9ca3af' }}>
            Don't have an account? <Link to='/signup' style={{ color: '#6d28d9', fontWeight: '600', textDecoration: 'none' }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login