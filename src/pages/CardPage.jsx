import { useState } from 'react'
import { FiSettings, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

function CardPage({ user }) {
  const [showDetails, setShowDetails] = useState(false)

  const cardName = user ? user.name.toUpperCase() : 'YOUR NAME'

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0a0a0f' }}>Cards</h2>
        <button style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: '600', color: '#0a0a0f', cursor: 'pointer' }}>
          Get A Card
        </button>
      </div>

      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '2rem', marginBottom: '1rem' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: '320px', height: '200px', borderRadius: '20px', background: 'linear-gradient(135deg, #ede9fe, #c4b5fd)', padding: '1.5rem', position: 'relative', boxShadow: '0 8px 32px rgba(109,40,217,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <p style={{ fontWeight: '800', fontSize: '1.1rem', color: '#6d28d9' }}>Juni<span style={{ color: '#0a0a0f' }}>Cash</span></p>
              <p style={{ fontSize: '0.65rem', color: '#6d28d9', fontWeight: '600', letterSpacing: '0.1em' }}>NAIRA VIRTUAL</p>
            </div>
            <p style={{ fontSize: '1rem', letterSpacing: '0.2em', color: '#4c1d95', fontWeight: '600', marginBottom: '1.25rem' }}>
              {showDetails ? '5399 8821 4412 3344' : '**** **** **** 3344'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <p style={{ fontSize: '0.65rem', color: '#7c3aed', marginBottom: '0.2rem' }}>CARD HOLDER</p>
                <p style={{ fontSize: '0.85rem', fontWeight: '700', color: '#4c1d95' }}>{cardName}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.65rem', color: '#7c3aed', marginBottom: '0.2rem' }}>EXPIRES</p>
                <p style={{ fontSize: '0.85rem', fontWeight: '700', color: '#4c1d95' }}>{showDetails ? '12/28' : '**/**'}</p>
              </div>
              <p style={{ fontSize: '1.1rem', fontWeight: '800', color: '#4c1d95' }}>VISA</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => setShowDetails(!showDetails)} style={{ background: '#6d28d9', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '0.75rem 2rem', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {showDetails ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
      </div>

      <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <span style={{ color: '#f59e0b', fontSize: '1rem', marginTop: '2px' }}>⚠</span>
        <div>
          <p style={{ fontSize: '0.88rem', fontWeight: '700', color: '#92400e', marginBottom: '0.2rem' }}>You Have 3 Virtual Card Requests Left</p>
          <p style={{ fontSize: '0.8rem', color: '#92400e' }}>You can only request 3 virtual cards every three months.</p>
        </div>
      </div>

      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        {[
          { icon: <FiSettings size={18} />, title: 'Manage Card', desc: 'Choose where your card works', color: '#f59e0b' },
          { icon: <FiLock size={18} />, title: 'Freeze Card', desc: 'Temporarily disable your card', color: '#6d28d9' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.1rem 1.25rem', borderBottom: i === 0 ? '1px solid #f3f4f6' : 'none', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}>
                {item.icon}
              </div>
              <div>
                <p style={{ fontSize: '0.95rem', fontWeight: '700', color: '#6d28d9' }}>{item.title}</p>
                <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{item.desc}</p>
              </div>
            </div>
            <span style={{ color: '#d1d5db' }}>›</span>
          </div>
        ))}
      </div>

    </div>
  )
}

export default CardPage