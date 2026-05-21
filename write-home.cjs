const fs = require('fs');
const code = `import { Link } from 'react-router-dom'
import { FiShield, FiTarget, FiGlobe, FiTrendingUp, FiUsers, FiArrowRight } from 'react-icons/fi'

function Home() {
  const features = [
    { icon: <FiShield size={28} />, title: 'Top Security', desc: 'Your money and data are protected with bank-grade security. We take your safety seriously.', img: 'https://placehold.co/400x200/1a1030/8b5cf6?text=Top+Security' },
    { icon: <FiTrendingUp size={28} />, title: 'Zero Interest Loans', desc: 'Borrow money when you need it most with absolutely no interest. We are here to support you.', img: 'https://placehold.co/400x200/1a1030/8b5cf6?text=Zero+Interest' },
    { icon: <FiTarget size={28} />, title: 'Smart Savings', desc: 'Set savings goals, thrift plans and targets. We help you stay focused and disciplined.', img: 'https://placehold.co/400x200/1a1030/8b5cf6?text=Smart+Savings' },
    { icon: <FiUsers size={28} />, title: 'Thrift & Groups', desc: 'Join cooperative savings groups and thrift plans with people you trust.', img: 'https://placehold.co/400x200/1a1030/8b5cf6?text=Thrift+Groups' },
    { icon: <FiGlobe size={28} />, title: 'International Transactions', desc: 'Send and receive money across borders with ease. No stress, no hidden charges.', img: 'https://placehold.co/400x200/1a1030/8b5cf6?text=International' },
    { icon: <FiTrendingUp size={28} />, title: 'Modern Banking', desc: 'Experience a banking system built for the modern world. Simple, fast and reliable.', img: 'https://placehold.co/400x200/1a1030/8b5cf6?text=Modern+Banking' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', fontFamily: 'Segoe UI, sans-serif' }}>

      <nav style={{ background: '#0a0a0f', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>Juni<span style={{ color: '#8b5cf6' }}>Cash</span></h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to='/login' style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.9rem' }}>Login</Link>
          <Link to='/signup' style={{ background: '#6d28d9', color: '#ffffff', textDecoration: 'none', padding: '0.5rem 1.2rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600' }}>Get Started</Link>
        </div>
      </nav>

      <section style={{ background: '#0a0a0f', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <span style={{ background: '#1a1030', color: '#8b5cf6', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', border: '1px solid #2d1f4e' }}>
              Next Generation Banking
            </span>
            <h2 style={{ fontSize: '3rem', fontWeight: '800', color: '#ffffff', margin: '1.5rem 0 1rem', lineHeight: '1.2' }}>
              Banking That <span style={{ color: '#8b5cf6' }}>Works</span> For You
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
              Save smarter, borrow with zero interest, send money globally and experience a banking system built around your financial freedom.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to='/signup' style={{ background: '#6d28d9', color: '#ffffff', textDecoration: 'none', padding: '0.85rem 2rem', borderRadius: '10px', fontSize: '1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Open Account <FiArrowRight />
              </Link>
              <Link to='/login' style={{ background: 'transparent', color: '#ffffff', textDecoration: 'none', padding: '0.85rem 2rem', borderRadius: '10px', fontSize: '1rem', fontWeight: '600', border: '1px solid #2d1f4e' }}>
                Sign In
              </Link>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: '280px', display: 'flex', justifyContent: 'center' }}>
            <img src='/images/our logo.png' alt='JuniCash Banking' style={{ width: '100%', maxWidth: '480px', borderRadius: '20px', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      <section style={{ background: '#f5f3ff', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
        {[['10K+', 'Happy Users'], ['0%', 'Interest Rate'], ['150+', 'Countries'], ['99.9%', 'Uptime']].map(([val, label]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.8rem', fontWeight: '800', color: '#6d28d9' }}>{val}</p>
            <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>{label}</p>
          </div>
        ))}
      </section>

      <section style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#0a0a0f', marginBottom: '0.75rem' }}>Everything You Need</h3>
          <p style={{ color: '#9ca3af', fontSize: '1rem' }}>One platform for all your financial needs</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {features.map((f) => (
            <div key={f.title} style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden' }}>
              <img src={f.img} alt={f.title} style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '1.25rem' }}>
                <div style={{ color: '#6d28d9', marginBottom: '0.5rem' }}>{f.icon}</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0a0a0f', marginBottom: '0.4rem' }}>{f.title}</h4>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.6' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#0a0a0f', padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#ffffff', marginBottom: '1rem' }}>
            Ready to Take Control of Your <span style={{ color: '#8b5cf6' }}>Finances?</span>
          </h3>
          <p style={{ color: '#9ca3af', marginBottom: '2rem', fontSize: '1rem' }}>Join thousands of people already using JuniCash to build a better financial future.</p>
          <Link to='/signup' style={{ background: '#6d28d9', color: '#ffffff', textDecoration: 'none', padding: '0.85rem 2.5rem', borderRadius: '10px', fontSize: '1rem', fontWeight: '700' }}>
            Create Free Account
          </Link>
        </div>
      </section>

      <footer style={{ background: '#0a0a0f', borderTop: '1px solid #1e1a2e', padding: '1.5rem 2rem', textAlign: 'center' }}>
        <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>© 2026 JuniCash. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default Home`;
fs.writeFileSync('src/pages/Home.jsx', code);
console.log('done');
