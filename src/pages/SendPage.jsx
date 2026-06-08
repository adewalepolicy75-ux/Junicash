import { useState } from 'react'
import { FiArrowRight, FiCheck, FiLock } from 'react-icons/fi'
import { useEffect } from 'react'
import ConfirmModal from '../components/ConfirmModal'
import PinModal from '../components/PinModal'
import { lookupAccount, transferMoney } from '../services/api'

function SendPage({ user }) {
  const [tab, setTab] = useState('internal')
  const [form, setForm] = useState({ accountNumber: '', amount: '', description: '', category: '' })
  
  const CATEGORIES = ['Food', 'Transport', 'Housing', 'Entertainment', 'Health', 'Shopping', 'Utilities', 'Other']
  const CATEGORY_ICONS = { Food: '���', Transport: '���', Housing: '���', Entertainment: '���', Health: '���', Shopping: '���️', Utilities: '⚡', Other: '���' }
  const [receiver, setReceiver] = useState(null)
  const [looking, setLooking] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showPin, setShowPin] = useState(false)
  const [hasPin, setHasPin] = useState(true)

  useEffect(() => {
    const checkPin = async () => {
      if (!user) return
      const res = await fetch('https://junicash.onrender.com/api/user/' + user.id)
      const data = await res.json()
      setHasPin(!!data.pin)
    }
    checkPin()
  }, [user])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleLookup = async () => {
    if (form.accountNumber.length < 10) return
    setLooking(true)
    setReceiver(null)
    setError('')
    const res = await lookupAccount(form.accountNumber)
    setLooking(false)
    if (res.accountNumber) {
      setReceiver(res)
    } else {
      setError(res.message || 'Account not found')
    }
  }

  const handleTransfer = async () => {
    if (!receiver || !form.amount || !form.category) return
    setShowConfirm(true)
  }

  const confirmTransfer = async () => {
    setShowConfirm(false)
    setShowPin(true)
  }

  const handlePinConfirmed = async () => {
    setShowPin(false)
    setLoading(true)
    setError('')
    setSuccess('')
    const res = await transferMoney({
      senderAccountNumber: user.accountNumber,
      receiverAccountNumber: form.accountNumber,
      amount: Number(form.amount),
      category: form.category,
      description: form.description || 'Transfer to ' + form.accountNumber
    })
    setLoading(false)
    if (res.message === 'Transfer successful') {
      setSuccess('Transfer successful!')
      setForm({ accountNumber: '', amount: '', description: '' })
      setReceiver(null)
    } else {
      setError(res.message || 'Transfer failed')
    }
  }

  const input = { width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', marginBottom: '1rem' }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '1.5rem', textAlign: 'center' }}>Send Money</h2>

      {user && (
        <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: '600', marginBottom: '0.2rem' }}>Your Account Number</p>
            <p style={{ fontSize: '1.1rem', fontWeight: '800', color: '#4c1d95', letterSpacing: '0.1em' }}>{user.accountNumber}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: '600', marginBottom: '0.2rem' }}>Name</p>
            <p style={{ fontSize: '0.9rem', fontWeight: '700', color: '#4c1d95' }}>{user.name}</p>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: '#ffffff', padding: '0.4rem', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
        {[{ key: 'internal', label: 'JuniCash to JuniCash' }, { key: 'external', label: 'Send to Any Bank' }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', background: tab === t.key ? '#6d28d9' : 'transparent', color: tab === t.key ? '#ffffff' : '#6b7280' }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'internal' && (
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
          {showPin && (
          <PinModal
            title='Verify Your Identity'
            userId={user?.id}
            mode='verify'
            onConfirm={handlePinConfirmed}
            onCancel={() => setShowPin(false)}
          />
        )}
        {showConfirm && (
          <ConfirmModal
            title='Confirm Transfer'
            message={'Send ₦' + Number(form.amount).toLocaleString() + ' to ' + receiver?.name + '?'}
            onConfirm={confirmTransfer}
            onCancel={() => setShowConfirm(false)}
            confirmText='Send Money'
            confirmColor='#6d28d9'
          />
        )}
        {!hasPin && (
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiLock size={18} color='#f59e0b' />
              <p style={{ fontSize: '0.88rem', color: '#92400e', fontWeight: '600' }}>You need to set a PIN before sending money</p>
            </div>
            <button onClick={() => window.dispatchEvent(new CustomEvent('go-to-account'))} style={{ background: '#f59e0b', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Set PIN
            </button>
          </div>
        )}
        {error && <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.85rem' }}>{error}</div>}
          {success && <div style={{ background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#059669', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiCheck /> {success}</div>}

          <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Recipient Account Number</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input value={form.accountNumber} onChange={e => setForm({ ...form, accountNumber: e.target.value })} placeholder='Enter 10-digit account number' style={{ ...input, marginBottom: 0, flex: 1 }} maxLength={10} />
            <button onClick={handleLookup} style={{ background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '10px', padding: '0 1rem', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
              {looking ? '...' : 'Verify'}
            </button>
          </div>

          {receiver && (
            <div style={{ background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontSize: '0.88rem', fontWeight: '600' }}>
              <FiCheck /> {receiver.name}
            </div>
          )}

          <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Amount (NGN)</label>
          <input type='number' value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder='Enter amount' style={input} min='1' />

          <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.5rem' }}>Category <span style={{ color: '#dc2626' }}>(required)</span></label>
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', marginBottom: '1rem', background: '#ffffff', color: '#0a0a0f', cursor: 'pointer' }}>
            <option value=''>-- Select Category --</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Description (optional)</label>
          <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder='What is this for?' style={input} />

          <button onClick={handleTransfer} disabled={loading || !receiver || !form.amount || !form.category || !hasPin} style={{ width: '100%', background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.85rem', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: (!receiver || !form.amount || !form.category || !hasPin) ? 0.6 : 1 }}>
            {loading ? 'Sending...' : <><FiArrowRight /> Send Money</>}
          </button>
        </div>
      )}

      {tab === 'external' && (
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>���</p>
          <p style={{ fontWeight: '700', color: '#0a0a0f', marginBottom: '0.5rem' }}>External Bank Transfer</p>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Coming soon! You will be able to send to any Nigerian bank account.</p>
        </div>
      )}
    </div>
  )
}

export default SendPage