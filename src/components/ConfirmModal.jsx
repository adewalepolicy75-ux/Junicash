function ConfirmModal({ title, message, onConfirm, onCancel, confirmText, confirmColor }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '380px', margin: '1rem', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.5rem' }}>
            🔐
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '0.5rem' }}>{title}</h3>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6' }}>{message}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={onCancel} style={{ flex: 1, padding: '0.85rem', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#ffffff', color: '#6b7280', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}>
            Cancel
          </button>
          <button onClick={onConfirm} style={{ flex: 1, padding: '0.85rem', borderRadius: '10px', border: 'none', background: confirmColor || '#6d28d9', color: '#ffffff', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}>
            {confirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal