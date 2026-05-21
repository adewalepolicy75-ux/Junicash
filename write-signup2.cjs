const fs = require('fs');
const code = `import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import { registerUser } from '../services/api'

function Signup() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Please fill in all fields')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    setError('')
    const res = await fetch('http://localhost:5000/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email })
    })
    const data = await res.json()
    setLoading(false)
    if (data.message === 'OTP sent') {
      setStep(2)
      setSuccess('Verification code sent to ' + form.email)
    } else {
      setError(data.message || 'Failed to send OTP')
    }
  }

  const handleOtpInput = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return
    const updated = [...otp]
    updated[index] = value
    setOtp(updated)
    if (value && index < 5) document.getElementById('otp' + (index + 1))?.focus()
  }

  const handleVerifyAndSignup = async (e) => {
    e.preventDefault()
    const otpStr = otp.join('')
    if (otpStr.length < 6) { setError('Enter the 6-digit code'); return }
    setLoading(true)
    setError('')
    const verifyRes = await fetch('http://localhost:5000/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, otp: otpStr })
    })
    const verifyData = await verifyRes.json()
    if (verifyData.message !== 'OTP verified') {
      setLoading(false)
      setError(verifyData.message || 'Invalid code')
      return
    }
    const res = await registerUser({ name: form.name, email: form.email, password: form.password })
    setLoading(false)
    if (res.user) {
      localStorage.setItem('user', JSON.stringify(res.user))
      navigate('/dashboard')
    } else {
      setError(res.message || 'Signup failed')
    }
  }

  const input = { background: '#ffffff', border: '1px solid #c4b5fd', borderRadius: '10px', color: '#0a0a0f', padding: '0.75rem 1rem', fontSize: '0.95rem', width: '100%', outline: 'none', marginBottom: '1rem' }
  const otpBox = { width: '44px', height: '52px', borderRadius: '10px', border: '2px solid #ddd6fe', fontSize: '1.4rem', fontWeight: '800', textAlign: 'center', outline: 'none', color: '#0a0a0f', background: '#f5f3ff' }

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

          {step === 1 && (
            <>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '0.5rem' }}>Create account</h2>
                <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Start managing your finances today</p>
              </div>
              {error && <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.85rem' }}>{error}</div>}
              <form onSubmit={handleSendOtp}>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Full Name</label>
                <input type='text' name='name' placeholder='John Doe' value={form.name} onChange={handleChange} style={input} />
                <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Email</label>
                <input type='email' name='email' placeholder='you@example.com' value={form.email} onChange={handleChange} style={input} />
                <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Password</label>
                <input type='password' name='password' placeholder='••••••••' value={form.password} onChange={handleChange} style={input} />
                <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Confirm Password</label>
                <input type='password' name='confirm' placeholder='••••••••' value={form.confirm} onChange={handleChange} style={input} />
                <button type='submit' disabled={loading} style={{ background: '#6d28d9', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '0.85rem', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', width: '100%', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'Sending code...' : 'Continue'}
                </button>
              </form>
              <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#9ca3af' }}>
                Already have an account? <Link to='/login' style={{ color: '#6d28d9', fontWeight: '600', textDecoration: 'none' }}>Sign in</Link>
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.5rem' }}>
                  📧
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '0.5rem' }}>Check your email</h2>
                <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{success}</p>
              </div>
              {error && <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.85rem' }}>{error}</div>}
              <form onSubmit={handleVerifyAndSignup}>
                <p style={{ fontSize: '0.85rem', fontWeight: '600', color: '#6d28d9', marginBottom: '0.75rem', textAlign: 'center' }}>Enter 6-digit code</p>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  {otp.map((val, i) => (
                    <input key={i} id={'otp' + i} type='text' maxLength={1} value={val} onChange={e => handleOtpInput(i, e.target.value)} style={otpBox} />
                  ))}
                </div>
                <button type='submit' disabled={loading} style={{ background: '#6d28d9', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '0.85rem', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', width: '100%', opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'Verifying...' : 'Create Account'}
                </button>
              </form>
              <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: '#9ca3af', cursor: 'pointer' }} onClick={() => setStep(1)}>
                Back to signup
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default Signup`;
fs.writeFileSync('src/pages/Signup.jsx', code);
console.log('done');
