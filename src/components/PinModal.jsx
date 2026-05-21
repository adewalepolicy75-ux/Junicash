import { useState } from 'react'

function PinModal({ title, onConfirm, onCancel, userId, mode }) {
  const [pin, setPin] = useState(['', '', '', ''])
  const [confirmPin, setConfirmPin] = useState(['', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInput = (index, value, isConfirm) => {
    if (!/^[0-9]?$/.test(value)) return
    if (isConfirm) {
      const updated = [...confirmPin]
      updated[index] = value
      setConfirmPin(updated)
      if (value && index < 3) document.getElementById('cpin' + (index + 1))?.focus()
    } else {
      const updated = [...pin]
      updated[index] = value
      setPin(updated)
      if (value && index < 3) document.getElementById('pin' + (index + 1))?.focus()
    }
  }

  const handleSubmit = async () => {
    const pinStr = pin.join('')
    if (pinStr.length < 4) { setError('Enter a 4-digit PIN'); return }

    if (mode === 'set') {
      const confirmStr = confirmPin.join('')
      if (pinStr !== confirmStr) { setError('PINs do not match'); return }
    }

    setLoading(true)
    setError('')

    try {
      const url = mode === 'set' ? 'http://localhost:5000/api/user/set-pin' : 'http://localhost:5000/api/user/verify-pin'
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, pin: pinStr })
      })
      const data = await res.json()
      if (data.message === 'PIN set successfully' || data.message === 'PIN verified') {
        onConfirm()
      } else {
        setError(data.message || 'Failed')
      }
    } catch {
      setError('Network error')
    }
    setLoading(false)
  }

  const pinBox = { width: '50px', height: '56px', borderRadius: '12px', border: '2px solid #ddd6fe', fontSize: '1.5rem', fontWeight: '800', textAlign: 'center', outline: 'none', color: '#0a0a0f', background: '#f5f3ff' }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '360px', margin: '1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.5rem' }}>
            🔒
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '0.4rem' }}>{title}</h3>
          <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{mode === 'set' ? 'Create a 4-digit PIN for your account' : 'Enter your 4-digit PIN to continue'}</p>
        </div>

        {error && <div style={{ background: '#fee2e2', borderRadius: '10px', padding: '0.75rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.85rem', textAlign: 'center' }}>{error}</div>}

        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', marginBottom: '0.75rem', textAlign: 'center' }}>
            {mode === 'set' ? 'Enter PIN' : 'Enter PIN'}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            {pin.map((val, i) => (
              <input key={i} id={'pin' + i} type='password' maxLength={1} value={val} onChange={e => handleInput(i, e.target.value, false)} style={pinBox} />
            ))}
          </div>
        </div>

        {mode === 'set' && (
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', marginBottom: '0.75rem', textAlign: 'center' }}>Confirm PIN</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              {confirmPin.map((val, i) => (
                <input key={i} id={'cpin' + i} type='password' maxLength={1} value={val} onChange={e => handleInput(i, e.target.value, true)} style={pinBox} />
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={onCancel} style={{ flex: 1, padding: '0.85rem', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#ffffff', color: '#6b7280', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} style={{ flex: 1, padding: '0.85rem', borderRadius: '10px', border: 'none', background: '#6d28d9', color: '#ffffff', fontWeight: '700', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? '...' : mode === 'set' ? 'Set PIN' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PinModal