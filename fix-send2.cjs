const fs = require('fs');
let send = fs.readFileSync('src/pages/SendPage.jsx', 'utf8');

send = send.replace(
  `          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} type='button' onClick={() => setForm({ ...form, category: cat })} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.75rem', borderRadius: '10px', border: form.category === cat ? '2px solid #6d28d9' : '1px solid #e5e7eb', background: form.category === cat ? '#6d28d9' : '#ffffff', color: form.category === cat ? '#ffffff' : '#0a0a0f', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600' }}>
                {CATEGORY_ICONS[cat]} {cat}
              </button>
            ))}
          </div>`,
  `          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', marginBottom: '1rem', background: '#ffffff', color: '#0a0a0f', cursor: 'pointer' }}>
            <option value=''>-- Select Category --</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>`
);

fs.writeFileSync('src/pages/SendPage.jsx', send);
console.log('done');
