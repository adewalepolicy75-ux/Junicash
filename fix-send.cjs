const fs = require('fs');
let send = fs.readFileSync('src/pages/SendPage.jsx', 'utf8');
send = send.replace(
  `  const [form, setForm] = useState({ accountNumber: '', amount: '', description: '' })`,
  `  const [form, setForm] = useState({ accountNumber: '', amount: '', description: '', category: '' })
  
  const CATEGORIES = ['Food', 'Transport', 'Housing', 'Entertainment', 'Health', 'Shopping', 'Utilities', 'Other']
  const CATEGORY_ICONS = { Food: 'í½”', Transport: 'íº—', Housing: 'í¿ ', Entertainment: 'í¾®', Health: 'í¿¥', Shopping: 'í»ï¸', Utilities: 'âš¡', Other: 'í³¦' }`
);

send = send.replace(
  `  const handleTransfer = async () => {
    if (!receiver || !form.amount) return`,
  `  const handleTransfer = async () => {
    if (!receiver || !form.amount || !form.category) return`
);

send = send.replace(
  `      senderAccountNumber: user.accountNumber,
      receiverAccountNumber: form.accountNumber,
      amount: Number(form.amount),
      description: form.description`,
  `      senderAccountNumber: user.accountNumber,
      receiverAccountNumber: form.accountNumber,
      amount: Number(form.amount),
      description: form.category + (form.description ? ' - ' + form.description : '') + ' (Transfer to ' + form.accountNumber + ')'`
);

send = send.replace(
  `          <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Description (optional)</label>
          <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder='What is this for?' style={input} />`,
  `          <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.5rem' }}>Category <span style={{ color: '#dc2626' }}>(required)</span></label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} type='button' onClick={() => setForm({ ...form, category: cat })} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.75rem', borderRadius: '10px', border: form.category === cat ? '2px solid #6d28d9' : '1px solid #e5e7eb', background: form.category === cat ? '#6d28d9' : '#ffffff', color: form.category === cat ? '#ffffff' : '#0a0a0f', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600' }}>
                {CATEGORY_ICONS[cat]} {cat}
              </button>
            ))}
          </div>

          <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6d28d9', display: 'block', marginBottom: '0.4rem' }}>Description (optional)</label>
          <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder='What is this for?' style={input} />`
);

send = send.replace(
  `disabled={loading || !receiver || !form.amount}`,
  `disabled={loading || !receiver || !form.amount || !form.category}`
);

send = send.replace(
  `opacity: (!receiver || !form.amount) ? 0.6 : 1`,
  `opacity: (!receiver || !form.amount || !form.category) ? 0.6 : 1`
);

fs.writeFileSync('src/pages/SendPage.jsx', send);
console.log('done');
