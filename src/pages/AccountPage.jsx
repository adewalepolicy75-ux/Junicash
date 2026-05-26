import { useState } from 'react'
import { FiUser, FiShield, FiFileText, FiCreditCard, FiHelpCircle, FiLink, FiSliders, FiEyeOff, FiMoon, FiLock } from 'react-icons/fi'
import PinModal from '../components/PinModal'

function AccountPage({ user, onLogout, hideBalance, setHideBalance, darkMode, setDarkMode }) {
  const [showSetPin, setShowSetPin] = useState(false)
  const [pinSuccess, setPinSuccess] = useState(false)
  const [showTopUp, setShowTopUp] = useState(false)
  const [topUpAmount, setTopUpAmount] = useState('')
  const [topUpLoading, setTopUpLoading] = useState(false)
  const [topUpSuccess, setTopUpSuccess] = useState('')
  const [topUpError, setTopUpError] = useState('')
  const [showSecurity, setShowSecurity] = useState(false)
  const [securityTab, setSecurityTab] = useState('password')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [currentPin, setCurrentPin] = useState(['', '', '', ''])
  const [newPin, setNewPin] = useState(['', '', '', ''])
  const [confirmNewPin, setConfirmNewPin] = useState(['', '', '', ''])
  const [pinError, setPinError] = useState('')
  const [pinChangeSuccess, setPinChangeSuccess] = useState('')
  const [pinChangeLoading, setPinChangeLoading] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    middleName: user?.middleName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    profilePhoto: user?.profilePhoto || ''
  })
  const [profileError, setProfileError] = useState('')
  const [profileSuccess, setProfileSuccess] = useState('')
  const [profileLoading, setProfileLoading] = useState(false)

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

  const handleUpdateProfile = async () => {
    if (!profileForm.firstName || !profileForm.lastName) { setProfileError('First and last name are required'); return }
    setProfileLoading(true); setProfileError(''); setProfileSuccess('')
    try {
      const res = await fetch('http://localhost:5000/api/user/update-profile', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, ...profileForm })
      })
      const data = await res.json()
      if (data.user) {
        setProfileSuccess('Profile updated successfully!')
        localStorage.setItem('user', JSON.stringify({ ...user, ...data.user }))
        setTimeout(() => { setShowEditProfile(false); setProfileSuccess(''); window.location.reload() }, 1500)
      } else { setProfileError(data.message) }
    } catch { setProfileError('Network error') }
    setProfileLoading(false)
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX = 200
        let w = img.width, h = img.height
        if (w > h) { if (w > MAX) { h = h * MAX / w; w = MAX } }
        else { if (h > MAX) { w = w * MAX / h; h = MAX } }
        canvas.width = w; canvas.height = h
        canvas.getContext('2d').drawImage(img, 0, 0, w, h)
        setProfileForm(prev => ({ ...prev, profilePhoto: canvas.toDataURL('image/jpeg', 0.7) }))
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  }

  const handleTopUp = async () => {
    if (!topUpAmount || Number(topUpAmount) <= 0) return
    setTopUpLoading(true); setTopUpError(''); setTopUpSuccess('')
    try {
      const res = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: 'Top Up', amount: Number(topUpAmount), type: 'income', category: 'Other Income', date: new Date(), userId: user.id })
      })
      if (res.ok) { setTopUpSuccess('Balance topped up successfully!'); setTopUpAmount(''); setTimeout(() => { setShowTopUp(false); setTopUpSuccess('') }, 2000) }
      else { setTopUpError('Top up failed. Try again.') }
    } catch { setTopUpError('Network error.') }
    setTopUpLoading(false)
  }

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) { setPasswordError('Please fill in all fields'); return }
    if (newPassword !== confirmNewPassword) { setPasswordError('New passwords do not match'); return }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(newPassword)) { setPasswordError('Password must be at least 8 characters with uppercase, lowercase, number and symbol (!@#$%^&*)'); return }
    setPasswordLoading(true); setPasswordError(''); setPasswordSuccess('')
    try {
      const res = await fetch('http://localhost:5000/api/user/change-password', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, currentPassword, newPassword })
      })
      const data = await res.json()
      if (data.message === 'Password changed successfully') { setPasswordSuccess('Password changed successfully!'); setCurrentPassword(''); setNewPassword(''); setConfirmNewPassword('') }
      else { setPasswordError(data.message) }
    } catch { setPasswordError('Network error') }
    setPasswordLoading(false)
  }

  const handlePinInput = (index, value, type) => {
    if (!/^[0-9]?$/.test(value)) return
    if (type === 'current') {
      const updated = [...currentPin]; updated[index] = value; setCurrentPin(updated)
      if (value && index < 3) document.getElementById('cp' + (index + 1))?.focus()
    } else if (type === 'new') {
      const updated = [...newPin]; updated[index] = value; setNewPin(updated)
      if (value && index < 3) document.getElementById('np' + (index + 1))?.focus()
    } else {
      const updated = [...confirmNewPin]; updated[index] = value; setConfirmNewPin(updated)
      if (value && index < 3) document.getElementById('cnp' + (index + 1))?.focus()
    }
  }

  const handleChangePin = async () => {
    const currentPinStr = currentPin.join('')
    const newPinStr = newPin.join('')
    const confirmNewPinStr = confirmNewPin.join('')
    if (currentPinStr.length < 4) { setPinError('Enter your current PIN'); return }
    if (newPinStr.length < 4) { setPinError('Enter a new 4-digit PIN'); return }
    if (newPinStr !== confirmNewPinStr) { setPinError('New PINs do not match'); return }
    setPinChangeLoading(true); setPinError(''); setPinChangeSuccess('')
    try {
      const res = await fetch('http://localhost:5000/api/user/change-pin', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, currentPin: currentPinStr, newPin: newPinStr })
      })
      const data = await res.json()
      if (data.message === 'PIN changed successfully') { setPinChangeSuccess('PIN changed successfully!'); setCurrentPin(['','','','']); setNewPin(['','','','']); setConfirmNewPin(['','','','']) }
      else { setPinError(data.message) }
    } catch { setPinError('Network error') }
    setPinChangeLoading(false)
  }

  const pinBox = { width: '46px', height: '52px', borderRadius: '10px', border: '2px solid #ddd6fe', fontSize: '1.4rem', fontWeight: '800', textAlign: 'center', outline: 'none', color: '#0a0a0f', background: '#f5f3ff' }
  const input = { background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', color: '#0a0a0f', padding: '0.75rem 1rem', fontSize: '0.9rem', width: '100%', outline: 'none', marginBottom: '1rem', boxSizing: 'border-box' }

  const menuItems = [
    [
      { icon: <FiUser size={18} />, label: 'View Profile', color: '#6d28d9', onClick: () => setShowEditProfile(true) },
      { icon: <FiSliders size={18} />, label: 'Account Limits', color: '#059669', locked: true },
    ],
    [
      { icon: <FiFileText size={18} />, label: 'Statement & Reports', color: '#059669', locked: true },
      { icon: <FiFileText size={18} />, label: 'Legal', color: '#0891b2', locked: true },
    ],
    [
      { icon: <FiCreditCard size={18} />, label: 'Saved Cards', color: '#0891b2', locked: true },
      { icon: <FiShield size={18} />, label: 'Security', color: '#f59e0b', onClick: () => setShowSecurity(true) },
    ],
    [
      { icon: <FiHelpCircle size={18} />, label: 'Get Help', color: '#dc2626', locked: true },
      { icon: <FiEyeOff size={18} />, label: 'Hide Balance', color: '#6d28d9', toggle: true, value: hideBalance, onChange: () => setHideBalance(!hideBalance) },
    ],
    [
      { icon: <FiLink size={18} />, label: 'Linked Accounts', color: '#f59e0b', locked: true },
      { icon: <FiMoon size={18} />, label: 'Dark Mode', color: '#6d28d9', toggle: true, value: darkMode, onChange: () => setDarkMode(!darkMode) },
    ],
  ]

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>

      {showEditProfile && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '420px', margin: '1rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0a0a0f' }}>Edit Profile</h3>
              <button onClick={() => { setShowEditProfile(false); setProfileError(''); setProfileSuccess('') }} style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#6b7280' }}>x</button>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#6d28d9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '2rem', border: '3px solid #ddd6fe', overflow: 'hidden', margin: '0 auto' }}>
                  {profileForm.profilePhoto ? <img src={profileForm.profilePhoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (user?.name?.charAt(0).toUpperCase() || 'U')}
                </div>
                <label style={{ position: 'absolute', bottom: 0, right: 0, width: '26px', height: '26px', borderRadius: '50%', background: '#6d28d9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid #fff' }}>
                  <span style={{ color: '#fff', fontSize: '0.7rem' }}>+</span>
                  <input type='file' accept='image/*' onChange={handlePhotoUpload} style={{ display: 'none' }} />
                </label>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem' }}>Tap to change photo</p>
            </div>
            {profileError && <div style={{ background: '#fee2e2', borderRadius: '10px', padding: '0.75rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.85rem' }}>{profileError}</div>}
            {profileSuccess && <div style={{ background: '#d1fae5', borderRadius: '10px', padding: '0.75rem', marginBottom: '1rem', color: '#059669', fontSize: '0.85rem' }}>{profileSuccess}</div>}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>First Name *</label>
                <input type='text' value={profileForm.firstName} onChange={e => setProfileForm(p => ({ ...p, firstName: e.target.value }))} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', color: '#0a0a0f', padding: '0.75rem', fontSize: '0.9rem', width: '100%', outline: 'none', marginBottom: '1rem', boxSizing: 'border-box' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Last Name *</label>
                <input type='text' value={profileForm.lastName} onChange={e => setProfileForm(p => ({ ...p, lastName: e.target.value }))} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', color: '#0a0a0f', padding: '0.75rem', fontSize: '0.9rem', width: '100%', outline: 'none', marginBottom: '1rem', boxSizing: 'border-box' }} />
              </div>
            </div>
            <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#9ca3af', display: 'block', marginBottom: '0.4rem' }}>Middle Name (optional)</label>
            <input type='text' value={profileForm.middleName} onChange={e => setProfileForm(p => ({ ...p, middleName: e.target.value }))} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', color: '#0a0a0f', padding: '0.75rem 1rem', fontSize: '0.9rem', width: '100%', outline: 'none', marginBottom: '1rem', boxSizing: 'border-box' }} />
            <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Phone Number</label>
            <input type='tel' placeholder='+234 000 000 0000' value={profileForm.phone} onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', color: '#0a0a0f', padding: '0.75rem 1rem', fontSize: '0.9rem', width: '100%', outline: 'none', marginBottom: '1rem', boxSizing: 'border-box' }} />
            <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Date of Birth</label>
            <input type='date' value={profileForm.dateOfBirth} onChange={e => setProfileForm(p => ({ ...p, dateOfBirth: e.target.value }))} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', color: '#0a0a0f', padding: '0.75rem 1rem', fontSize: '0.9rem', width: '100%', outline: 'none', marginBottom: '1.5rem', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setShowEditProfile(false)} style={{ flex: 1, padding: '0.85rem', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#fff', color: '#6b7280', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleUpdateProfile} disabled={profileLoading} style={{ flex: 1, padding: '0.85rem', borderRadius: '10px', border: 'none', background: '#6d28d9', color: '#fff', fontWeight: '700', cursor: 'pointer', opacity: profileLoading ? 0.7 : 1 }}>
                {profileLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSecurity && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '420px', margin: '1rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0a0a0f' }}>Security</h3>
              <button onClick={() => { setShowSecurity(false); setPasswordError(''); setPasswordSuccess(''); setPinError(''); setPinChangeSuccess('') }} style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#6b7280' }}>x</button>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: '#f5f3ff', borderRadius: '10px', padding: '0.25rem' }}>
              <button onClick={() => setSecurityTab('password')} style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: 'none', background: securityTab === 'password' ? '#6d28d9' : 'transparent', color: securityTab === 'password' ? '#ffffff' : '#6b7280', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' }}>Password</button>
              <button onClick={() => setSecurityTab('pin')} style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: 'none', background: securityTab === 'pin' ? '#6d28d9' : 'transparent', color: securityTab === 'pin' ? '#ffffff' : '#6b7280', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' }}>PIN</button>
            </div>

            {securityTab === 'password' && (
              <>
                {passwordError && <div style={{ background: '#fee2e2', borderRadius: '10px', padding: '0.75rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.85rem' }}>{passwordError}</div>}
                {passwordSuccess && <div style={{ background: '#d1fae5', borderRadius: '10px', padding: '0.75rem', marginBottom: '1rem', color: '#059669', fontSize: '0.85rem' }}>{passwordSuccess}</div>}
                <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Current Password</label>
                <input type='password' placeholder='........' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} style={input} />
                <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>New Password</label>
                <input type='password' placeholder='........' value={newPassword} onChange={e => setNewPassword(e.target.value)} style={input} />
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
                      <span style={{ fontSize: '0.8rem', color: rule.test ? '#16a34a' : '#9ca3af', fontWeight: rule.test ? '600' : '400' }}>{rule.label}</span>
                    </div>
                  ))}
                </div>
              )}
              <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Confirm New Password</label>
                <input type='password' placeholder='........' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} style={input} />
                <button onClick={handleChangePassword} disabled={passwordLoading} style={{ background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.85rem', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', width: '100%', opacity: passwordLoading ? 0.7 : 1 }}>
                  {passwordLoading ? 'Changing...' : 'Change Password'}
                </button>
                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.82rem', color: '#9ca3af' }}>
                  Forgot your password? <a href='/forgot-password' style={{ color: '#6d28d9', fontWeight: '600', textDecoration: 'none' }}>Reset it here</a>
                </p>
              </>
            )}

            {securityTab === 'pin' && (
              <>
                {pinError && <div style={{ background: '#fee2e2', borderRadius: '10px', padding: '0.75rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.85rem' }}>{pinError}</div>}
                {pinChangeSuccess && <div style={{ background: '#d1fae5', borderRadius: '10px', padding: '0.75rem', marginBottom: '1rem', color: '#059669', fontSize: '0.85rem' }}>{pinChangeSuccess}</div>}
                <p style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', marginBottom: '0.75rem', textAlign: 'center' }}>Current PIN</p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  {currentPin.map((val, i) => (<input key={i} id={'cp' + i} type='password' maxLength={1} value={val} onChange={e => handlePinInput(i, e.target.value, 'current')} style={pinBox} />))}
                </div>
                <p style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', marginBottom: '0.75rem', textAlign: 'center' }}>New PIN</p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  {newPin.map((val, i) => (<input key={i} id={'np' + i} type='password' maxLength={1} value={val} onChange={e => handlePinInput(i, e.target.value, 'new')} style={pinBox} />))}
                </div>
                <p style={{ fontSize: '0.78rem', fontWeight: '600', color: '#6d28d9', marginBottom: '0.75rem', textAlign: 'center' }}>Confirm New PIN</p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  {confirmNewPin.map((val, i) => (<input key={i} id={'cnp' + i} type='password' maxLength={1} value={val} onChange={e => handlePinInput(i, e.target.value, 'confirm')} style={pinBox} />))}
                </div>
                <button onClick={handleChangePin} disabled={pinChangeLoading} style={{ background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.85rem', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', width: '100%', opacity: pinChangeLoading ? 0.7 : 1 }}>
                  {pinChangeLoading ? 'Changing...' : 'Change PIN'}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showTopUp && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '380px', margin: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '1.25rem' }}>Top Up Balance</h3>
            {topUpSuccess && <div style={{ background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: '10px', padding: '0.75rem', marginBottom: '1rem', color: '#059669', fontSize: '0.85rem' }}>{topUpSuccess}</div>}
            {topUpError && <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.75rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.85rem' }}>{topUpError}</div>}
            <input type='number' placeholder='Enter amount (NGN)' value={topUpAmount} onChange={e => setTopUpAmount(e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', marginBottom: '1rem', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setShowTopUp(false)} style={{ flex: 1, padding: '0.75rem', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#ffffff', color: '#6b7280', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}>Cancel</button>
              <button onClick={handleTopUp} disabled={topUpLoading} style={{ flex: 1, padding: '0.75rem', borderRadius: '10px', border: 'none', background: '#6d28d9', color: '#ffffff', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', opacity: topUpLoading ? 0.7 : 1 }}>
                {topUpLoading ? 'Processing...' : 'Top Up'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSetPin && (
        <PinModal title='Set Transaction PIN' userId={user?.id} mode='set' onConfirm={() => { setShowSetPin(false); setPinSuccess(true) }} onCancel={() => setShowSetPin(false)} />
      )}

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#6d28d9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '2rem', margin: '0 auto 1rem', border: '3px solid #ddd6fe' }}>
          {user?.profilePhoto ? <img src={user.profilePhoto} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /> : (user ? user.name.charAt(0).toUpperCase() : 'U')}
        </div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '0.4rem' }}>{user ? user.name : 'User'}</h2>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1rem' }}>
          <button onClick={() => setShowTopUp(true)} style={{ background: '#6d28d9', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '0.6rem 1.5rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer' }}>+ Add Money</button>
          <button onClick={() => setShowSetPin(true)} style={{ background: '#0a0a0f', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '0.6rem 1.5rem', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer' }}>Set PIN</button>
        </div>
        {pinSuccess && <p style={{ color: '#059669', fontSize: '0.85rem', marginBottom: '0.75rem', fontWeight: '600' }}>PIN set successfully!</p>}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ color: '#6d28d9' }}>o</span>
            <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>@{user ? user.name.toLowerCase().replace(' ', '') : 'username'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ color: '#6d28d9' }}>o</span>
            <span style={{ fontSize: '0.9rem', color: '#6b7280', letterSpacing: '0.05em' }}>{user ? user.accountNumber : '0000000000'}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {menuItems.map((row, rowIndex) =>
          row.map((item, colIndex) => (
            <div key={rowIndex + '-' + colIndex} onClick={item.onClick} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: item.locked ? '#fafafa' : '#ffffff', border: '1px solid #f3f4f6', borderRadius: '12px', padding: '1rem 1.25rem', cursor: item.locked ? 'not-allowed' : item.toggle ? 'default' : 'pointer', opacity: item.locked ? 0.7 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#0a0a0f' }}>{item.label}</span>
              </div>
              {item.locked ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <FiLock size={14} color='#9ca3af' />
                  <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Soon</span>
                </div>
              ) : item.toggle ? (
                <div onClick={item.onChange} style={{ width: '44px', height: '24px', borderRadius: '999px', background: item.value ? '#6d28d9' : '#e5e7eb', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#ffffff', position: 'absolute', top: '2px', left: item.value ? '22px' : '2px', transition: 'left 0.2s' }} />
                </div>
              ) : (
                <span style={{ color: '#d1d5db' }}>›</span>
              )}
            </div>
          ))
        )}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={onLogout} style={{ background: 'transparent', border: 'none', color: '#dc2626', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Sign Out</button>
      </div>
    </div>
  )
}

export default AccountPage