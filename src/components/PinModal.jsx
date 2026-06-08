import { useState } from 'react'

function PinModal({ title, onConfirm, onCancel, userId, mode }) {
  const [pin, setPin] = useState(['', '', '', ''])
  const [confirmPin, setConfirmPin] = useState(['', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [forgotStep, setForgotStep] = useState(0)
  const [otp, setOtp] = useState('')
  const [newPin, setNewPin] = useState(['', '', '', ''])
  const [confirmNewPin, setConfirmNewPin] = useState(['', '', '', ''])

  const handleInput = (index, value, isConfirm) => {
    if (isConfirm) {
      const updated = [...confirmPin]; updated[index] = value; setConfirmPin(updated)
      if (value && index < 3) document.getElementById('cpin' + (index + 1))?.focus()
    } else {
      const updated = [...pin]; updated[index] = value; setPin(updated)
      if (value && index < 3) document.getElementById('pin' + (index + 1))?.focus()
    }
  }

  const handleNewPinInput = (index, value, isConfirm) => {
    if (isConfirm) {
      const updated = [...confirmNewPin]; updated[index] = value; setConfirmNewPin(updated)
      if (value && index < 3) document.getElementById('cnpin' + (index + 1))?.focus()
    } else {
      const updated = [...newPin]; updated[index] = value; setNewPin(updated)
      if (value && index < 3) document.getElementById('npin' + (index + 1))?.focus()
    }
  }

  const handleSubmit = async () => {
    const pinStr = pin.join('')
    if (pinStr.length < 4) { setError('Enter a 4-digit PIN'); return }
    if (mode === 'set') {
      const confirmStr = confirmPin.join('')
      if (pinStr !== confirmStr) { setError('PINs do not match'); return }
    }
    setLoading(true); setError('')
    try {
      const url = mode === 'set' ? 'https://junicash.onrender.com/api/user/set-pin' : 'https://junicash.onrender.com/api/user/verify-pin'
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, pin: pinStr }) })
      const data = await res.json()
      if (data.message === 'PIN set successfully' || data.message === 'PIN verified') { onConfirm() }
      else { setError(data.message || 'Failed') }
    } catch { setError('Network error') }
    setLoading(false)
  }

  const handleForgotPin = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('https://junicash.onrender.com/api/user/forgot-pin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId }) })
      const data = await res.json()
      if (data.message === 'OTP sent') { setForgotStep(1) }
      else { setError(data.message) }
    } catch { setError('Network error') }
    setLoading(false)
  }

  const handleResetPin = async () => {
    const newPinStr = newPin.join('')
    const confirmNewPinStr = confirmNewPin.join('')
    if (newPinStr.length < 4) { setError('Enter a 4-digit PIN'); return }
    if (newPinStr !== confirmNewPinStr) { setError('PINs do not match'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('https://junicash.onrender.com/api/user/reset-pin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, otp, newPin: newPinStr }) })
      const data = await res.json()
      if (data.message === 'PIN reset successful') { setForgotStep(2) }
      else { setError(data.message) }
    } catch { setError('Network error') }
    setLoading(false)
  }

  const pinBox = { width: '50px', height: '56px', borderRadius: '12px', border: '2px solid #ddd6fe', fontSize: '1.5rem', fontWeight: '800', textAlign: 'center', outline: 'none', color: '#0a0a0f', background: '#f5f3ff' }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '360px', margin: '1rem' }}>

        {forgotStep === 0 && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.5rem' }}>🔒</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '0.4rem' }}>{title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{mode === 'set' ? 'Create a 4-digit PIN for your account' : 'Enter your 4-digit PIN to continue'}</p>
            </div>
            {error && <div style={{ background: '#fee2e2', borderRadius: '10px', padding: '0.75rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.85rem', textAlign: 'center' }}>{error}</div>}
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', marginBottom: '0.75rem', textAlign: 'center' }}>Enter PIN</p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                {pin.map((val, i) => (<input key={i} id={'pin' + i} type='password' maxLength={1} value={val} onChange={e => handleInput(i, e.target.value, false)} style={pinBox} />))}
              </div>
            </div>
            {mode === 'set' && (
              <div style={{ marginBottom: '1.25rem' }}>
                <p style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', marginBottom: '0.75rem', textAlign: 'center' }}>Confirm PIN</p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                  {confirmPin.map((val, i) => (<input key={i} id={'cpin' + i} type='password' maxLength={1} value={val} onChange={e => handleInput(i, e.target.value, true)} style={pinBox} />))}
                </div>
              </div>
            )}
            {mode === 'verify' && (
              <p onClick={handleForgotPin} style={{ textAlign: 'center', fontSize: '0.82rem', color: '#6d28d9', fontWeight: '600', cursor: 'pointer', marginBottom: '1rem' }}>
                {loading ? 'Sending...' : 'Forgot PIN?'}
              </p>
            )}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={onCancel} style={{ flex: 1, padding: '0.85rem', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#ffffff', color: '#6b7280', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleSubmit} disabled={loading} style={{ flex: 1, padding: '0.85rem', borderRadius: '10px', border: 'none', background: '#6d28d9', color: '#ffffff', fontWeight: '700', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
                {loading ? '...' : mode === 'set' ? 'Set PIN' : 'Confirm'}
              </button>
            </div>
          </>
        )}

        {forgotStep === 1 && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📧</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '0.4rem' }}>Reset PIN</h3>
              <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Enter the code sent to your email and set a new PIN</p>
            </div>
            {error && <div style={{ background: '#fee2e2', borderRadius: '10px', padding: '0.75rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.85rem', textAlign: 'center' }}>{error}</div>}
            <input type='text' placeholder='Enter 6-digit code' value={otp} onChange={e => setOtp(e.target.value)} style={{ background: '#f5f3ff', border: '2px solid #ddd6fe', borderRadius: '10px', color: '#0a0a0f', padding: '0.75rem 1rem', fontSize: '0.95rem', width: '100%', outline: 'none', marginBottom: '1.25rem', boxSizing: 'border-box', textAlign: 'center', letterSpacing: '0.2em' }} />
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', marginBottom: '0.75rem', textAlign: 'center' }}>New PIN</p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                {newPin.map((val, i) => (<input key={i} id={'npin' + i} type='password' maxLength={1} value={val} onChange={e => handleNewPinInput(i, e.target.value, false)} style={pinBox} />))}
              </div>
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', marginBottom: '0.75rem', textAlign: 'center' }}>Confirm New PIN</p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                {confirmNewPin.map((val, i) => (<input key={i} id={'cnpin' + i} type='password' maxLength={1} value={val} onChange={e => handleNewPinInput(i, e.target.value, true)} style={pinBox} />))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => { setForgotStep(0); setError('') }} style={{ flex: 1, padding: '0.85rem', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#ffffff', color: '#6b7280', fontWeight: '600', cursor: 'pointer' }}>Back</button>
              <button onClick={handleResetPin} disabled={loading} style={{ flex: 1, padding: '0.85rem', borderRadius: '10px', border: 'none', background: '#6d28d9', color: '#ffffff', fontWeight: '700', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
                {loading ? '...' : 'Reset PIN'}
              </button>
            </div>
          </>
        )}

        {forgotStep === 2 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '2rem' }}>Your PIN has been updated successfully.</p>
            <button onClick={onCancel} style={{ background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.85rem', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', width: '100%' }}>Close</button>
          </div>
        )}

      </div>
    </div>
  )
}

export default PinModal