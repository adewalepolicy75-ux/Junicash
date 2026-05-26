const fs = require('fs');
let acc = fs.readFileSync('src/pages/AccountPage.jsx', 'utf8');
acc = acc.replace(
  `const LOCKED_ITEMS = []`,
  ``
);
acc = acc.replace(
  `      { icon: <FiUser size={18} />, label: 'View Profile', color: '#6d28d9' },
      { icon: <FiSliders size={18} />, label: 'Account Limits', color: '#059669' },`,
  `      { icon: <FiUser size={18} />, label: 'View Profile', color: '#6d28d9', locked: true },
      { icon: <FiSliders size={18} />, label: 'Account Limits', color: '#059669', locked: true },`
);
acc = acc.replace(
  `      { icon: <FiFileText size={18} />, label: 'Statement & Reports', color: '#059669' },
      { icon: <FiFileText size={18} />, label: 'Legal', color: '#0891b2' },`,
  `      { icon: <FiFileText size={18} />, label: 'Statement & Reports', color: '#059669', locked: true },
      { icon: <FiFileText size={18} />, label: 'Legal', color: '#0891b2', locked: true },`
);
acc = acc.replace(
  `      { icon: <FiCreditCard size={18} />, label: 'Saved Cards', color: '#0891b2' },`,
  `      { icon: <FiCreditCard size={18} />, label: 'Saved Cards', color: '#0891b2', locked: true },`
);
acc = acc.replace(
  `      { icon: <FiHelpCircle size={18} />, label: 'Get Help', color: '#dc2626' },`,
  `      { icon: <FiHelpCircle size={18} />, label: 'Get Help', color: '#dc2626', locked: true },`
);
acc = acc.replace(
  `      { icon: <FiLink size={18} />, label: 'Linked Accounts', color: '#f59e0b' },`,
  `      { icon: <FiLink size={18} />, label: 'Linked Accounts', color: '#f59e0b', locked: true },`
);
acc = acc.replace(
  `style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem 1.25rem', cursor: item.toggle ? 'default' : 'pointer' }}`,
  `style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: item.locked ? '#fafafa' : '#ffffff', border: '1px solid #f3f4f6', borderRadius: '12px', padding: '1rem 1.25rem', cursor: item.locked ? 'not-allowed' : item.toggle ? 'default' : 'pointer', opacity: item.locked ? 0.7 : 1 }}`
);
acc = acc.replace(
  `              {item.toggle ? (`,
  `              {item.locked ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <FiLock size={14} color='#9ca3af' />
                  <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Soon</span>
                </div>
              ) : item.toggle ? (`
);
acc = acc.replace(
  `import { FiUser, FiShield, FiFileText, FiCreditCard, FiHelpCircle, FiLink, FiSliders, FiEyeOff, FiMoon } from 'react-icons/fi'`,
  `import { FiUser, FiShield, FiFileText, FiCreditCard, FiHelpCircle, FiLink, FiSliders, FiEyeOff, FiMoon, FiLock } from 'react-icons/fi'`
);
fs.writeFileSync('src/pages/AccountPage.jsx', acc);
console.log('done');
