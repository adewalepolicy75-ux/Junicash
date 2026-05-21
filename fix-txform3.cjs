const fs = require('fs');
let form = fs.readFileSync('src/components/TransactionForm.jsx', 'utf8');
form = form.replace(
  `import { useState } from 'react'
import ConfirmModal from './ConfirmModal'`,
  `import { useState } from 'react'
import ConfirmModal from './ConfirmModal'
import { FiBriefcase, FiMonitor, FiTrendingUp, FiGift, FiDollarSign, FiShoppingBag, FiTruck, FiHome, FiPlay, FiHeart, FiShoppingCart, FiZap, FiPackage } from 'react-icons/fi'`
);
form = form.replace(
  `const CATEGORY_ICONS = {
  Salary: '💼', Freelance: '🖥️', Investment: '📈', Gift: '🎁', 'Other Income': '💰',
  Food: '🍔', Transport: '🚗', Housing: '🏠', Entertainment: '🎮', Health: '🏥',
  Shopping: '🛍️', Utilities: '⚡', Other: '📦',
}`,
  `const CATEGORY_ICONS = {
  Salary: <FiBriefcase size={14} />,
  Freelance: <FiMonitor size={14} />,
  Investment: <FiTrendingUp size={14} />,
  Gift: <FiGift size={14} />,
  'Other Income': <FiDollarSign size={14} />,
  Food: <FiShoppingBag size={14} />,
  Transport: <FiTruck size={14} />,
  Housing: <FiHome size={14} />,
  Entertainment: <FiPlay size={14} />,
  Health: <FiHeart size={14} />,
  Shopping: <FiShoppingCart size={14} />,
  Utilities: <FiZap size={14} />,
  Other: <FiPackage size={14} />,
}`
);
fs.writeFileSync('src/components/TransactionForm.jsx', form);
console.log('done');
