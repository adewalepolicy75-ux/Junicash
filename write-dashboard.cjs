const fs = require('fs');
const code = `import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SummaryCards from '../components/SummaryCards'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import SendPage from './SendPage'
import PayPage from './PayPage'
import CardPage from './CardPage'
import BudgetPage from './BudgetPage'
import { getTransactions, addTransaction, deleteTransaction, getCurrentUser, logout } from '../services/api'

function Dashboard() {
  const [transactions, setTransactions] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) { navigate('/login'); return }
    setUser(currentUser)
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    const data = await getTransactions()
    setTransactions(data)
  }

  const handleAdd = async (form) => {
    const newTx = await addTransaction(form)
    setTransactions(prev => [newTx, ...prev])
    setActiveTab('overview')
  }

  const handleDelete = async (id) => {
    await deleteTransaction(id)
    setTransactions(prev => prev.filter(tx => tx._id !== id))
  }

  const handleLogout = () => { logout(); navigate('/login') }

  const totalBalance = transactions
    .reduce((sum, tx) => tx.type === 'income' ? sum + Number(tx.amount) : sum - Number(tx.amount), 0)

  const formatAmount = (amount) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount)

  const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Navbar user={user} onLogout={handleLogout} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {activeTab === 'overview' && (
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid #bbf7d0' }}>NGN Account</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0a0a0f', margin: '0.5rem 0 0.25rem' }}>
              {formatAmount(totalBalance)}
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: '1.5rem' }}>Last updated just now</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Send', icon: '↑', tab: 'send' },
                { label: 'Save', icon: '+', tab: 'add' },
                { label: 'Borrow', icon: '↓', tab: 'overview' },
                { label: 'Invest', icon: '◈', tab: 'overview' },
              ].map(action => (
                <button key={action.label} onClick={() => setActiveTab(action.tab)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1.25rem', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#ffffff', color: '#0a0a0f', cursor: 'pointer', fontSize: '0.88rem', fontWeight: '600' }}>
                  <span style={{ color: '#6d28d9' }}>{action.icon}</span> {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'overview' && (
          <>
            <SummaryCards transactions={transactions} />
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0a0a0f' }}>Recent Transactions</h3>
                <span onClick={() => setActiveTab('transactions')} style={{ color: '#6d28d9', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}>View All</span>
              </div>
              {recent.length === 0 && <p style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem 0' }}>No transactions yet</p>}
              {recent.map(tx => (
                <div key={tx._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 0', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: tx.type === 'income' ? '#d1fae5' : '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: tx.type === 'income' ? '#059669' : '#dc2626' }}>
                      {tx.type === 'income' ? '+' : '-'}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#0a0a0f' }}>{tx.description}</p>
                      <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{tx.category} · {new Date(tx.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <p style={{ fontWeight: '700', color: tx.type === 'income' ? '#059669' : '#dc2626' }}>
                      {tx.type === 'income' ? '+' : '-'}{formatAmount(tx.amount)}
                    </p>
                    <span style={{ color: '#d1d5db' }}>›</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'add' && <TransactionForm onAdd={handleAdd} />}
        {activeTab === 'transactions' && <TransactionList transactions={transactions} onDelete={handleDelete} />}
        {activeTab === 'send' && <SendPage user={user} />}
        {activeTab === 'pay' && <PayPage />}
        {activeTab === 'card' && <CardPage user={user} />}
        {activeTab === 'budget' && <BudgetPage transactions={transactions} />}

      </div>
    </div>
  )
}

export default Dashboard`;
fs.writeFileSync('src/pages/Dashboard.jsx', code);
console.log('done');
