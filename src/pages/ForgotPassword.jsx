import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'

function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[a-z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[!@#$%^&*]/.test(pwd)) score++
    if (score <= 1) return { label: 'Very Weak', color: '#ef4444', width: '20%' }
    if (score === 2) return { label: 'Weak', color: '#f97316', width: '40%' }
    if (score === 3) return { label: 'Fair', color: '#eab308', width: '60%' }
    if (score === 4) return { label: 'Strong', color: '#22c55e', width: '80%' }
    return { label: 'Very Strong', color: '#16a34a', width: '100%' }
  }


  const input = { background: '#ffffff', border: '1px solid #c4b5fd', borderRadius: '10px', color: '#0a0a0f', padding: '0.75rem 1rem', fontSize: '0.95rem', width: '100%', outline: 'none', marginBottom: '1rem', boxSizing: 'border-box' }

  const handleSendOTP = async () => {
    if (!email) { setError('Please enter your email'); return }
    setLoading(true); setError('')
    const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    const data = await res.json()
    setLoading(false)
    if (data.message === 'OTP sent') { setStep(2) }
    else { setError(data.message) }
  }

  const handleReset = async () => {
    if (!otp) { setError('Please enter the OTP'); return }
    if (!newPassword) { setError('Please enter a new password'); return }
    if (newPassword !== confirmPassword) { setError('Passwords do not match'); return }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(newPassword)) { setError('Password must be at least 8 characters with uppercase, lowercase, number and symbol (!@#$%^&*)'); return }
    setLoading(true); setError('')
    const res = await fetch('http://localhost:5000/api/auth/reset-password', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword })
    })
    const data = await res.json()
    setLoading(false)
    if (data.message === 'Password reset successful') { setStep(3) }
    else { setError(data.message) }
  }

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
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔑</div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '0.5rem' }}>Forgot Password</h2>
                <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Enter your email to receive a reset code</p>
              </div>
              {error && <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.85rem' }}>{error}</div>}
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Email</label>
              <input type='email' placeholder='you@example.com' value={email} onChange={e => setEmail(e.target.value)} style={input} />
              <button onClick={handleSendOTP} disabled={loading} style={{ background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.85rem', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', width: '100%', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Sending...' : 'Send Reset Code'}
              </button>
              <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#9ca3af' }}>
                Remember it? <Link to='/login' style={{ color: '#6d28d9', fontWeight: '600', textDecoration: 'none' }}>Sign in</Link>
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📧</div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '0.5rem' }}>Reset Password</h2>
                <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Enter the code sent to <strong>{email}</strong></p>
              </div>
              {error && <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.85rem' }}>{error}</div>}
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Verification Code</label>
              <input type='text' placeholder='Enter 6-digit code' value={otp} onChange={e => setOtp(e.target.value)} style={input} />
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>New Password</label>
              <input type='password' placeholder='••••••••' value={newPassword} onChange={e => setNewPassword(e.target.value)} style={input} />
              {newPassword && (
              <div style={{ marginBottom: '1rem', marginTop: '-0.5rem' }}>
                <div style={{ height: '4px', background: '#e5e7eb', borderRadius: '999px', overflow: 'hidden', marginBottom: '0.3rem' }}>
                  <div style={{ height: '100%', width: getPasswordStrength(newPassword).width, background: getPasswordStrength(newPassword).color, borderRadius: '999px', transition: 'all 0.3s' }} />
                </div>
                <p style={{ fontSize: '0.75rem', color: getPasswordStrength(newPassword).color, fontWeight: '600' }}>{getPasswordStrength(newPassword).label}</p>
              </div>
            )}
              {newPassword && (
  <div style={{ marginBottom: '1rem', background: '#f9fafb', borderRadius: '10px', padding: '0.75rem 1rem' }}>
    {[
      { label: 'At least 8 characters', test: newPassword.length >= 8 },
      { label: 'Uppercase letter (A-Z)', test: /[A-Z]/.test(newPassword) },
      { label: 'Lowercase letter (a-z)', test: /[a-z]/.test(newPassword) },
      { label: 'Number (0-9)', test: /[0-9]/.test(newPassword) },
      { label: 'Symbol (!@#$%^&*)', test: /[!@#$%^&*]/.test(newPassword) },
    ].map((rule, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
        <span style={{ fontSize: '0.8rem', color: rule.test ? '#16a34a' : '#9ca3af' }}>{rule.test ? '✓' : '○'}</span>
        <span style={{ fontSize: '0.8rem', color: rule.test ? '#16a34a' : '#9ca3af', fontWeight: rule.test ? '600' : '400', textDecoration: rule.test ? 'none' : 'none' }}>{rule.label}</span>
      </div>
    ))}
  </div>
)}
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Confirm Password</label>
              <input type='password' placeholder='••••••••' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={input} />
              <button onClick={handleReset} disabled={loading} style={{ background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.85rem', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', width: '100%', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
              <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: '#9ca3af', cursor: 'pointer' }} onClick={handleSendOTP}>
                Didn't receive code? <span style={{ color: '#6d28d9', fontWeight: '600' }}>Resend</span>
              </p>
            </>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '0.5rem' }}>Password Reset!</h2>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '2rem' }}>Your password has been updated successfully.</p>
              <button onClick={() => navigate('/login')} style={{ background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.85rem', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', width: '100%' }}>
                Back to Login
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
