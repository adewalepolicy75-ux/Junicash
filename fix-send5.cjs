const fs = require('fs');
let send = fs.readFileSync('src/pages/SendPage.jsx', 'utf8');
send = send.replace(
  `import { FiArrowRight, FiCheck } from 'react-icons/fi'`,
  `import { FiArrowRight, FiCheck } from 'react-icons/fi'
import ConfirmModal from '../components/ConfirmModal'`
);
send = send.replace(
  `  const [loading, setLoading] = useState(false)`,
  `  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)`
);
send = send.replace(
  `  const handleTransfer = async () => {
    if (!receiver || !form.amount || !form.category) return
    setLoading(true)`,
  `  const handleTransfer = async () => {
    if (!receiver || !form.amount || !form.category) return
    setShowConfirm(true)
  }

  const confirmTransfer = async () => {
    setShowConfirm(false)
    setLoading(true)`
);
send = send.replace(
  `        {error && <div style={{ background: '#fee2e2'`,
  `        {showConfirm && (
          <ConfirmModal
            title='Confirm Transfer'
            message={'Send ₦' + Number(form.amount).toLocaleString() + ' to ' + receiver?.name + '?'}
            onConfirm={confirmTransfer}
            onCancel={() => setShowConfirm(false)}
            confirmText='Send Money'
            confirmColor='#6d28d9'
          />
        )}
        {error && <div style={{ background: '#fee2e2'`
);
fs.writeFileSync('src/pages/SendPage.jsx', send);
console.log('done');
