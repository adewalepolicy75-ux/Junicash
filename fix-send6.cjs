const fs = require('fs');
let send = fs.readFileSync('src/pages/SendPage.jsx', 'utf8');
send = send.replace(
  `import ConfirmModal from '../components/ConfirmModal'`,
  `import ConfirmModal from '../components/ConfirmModal'
import PinModal from '../components/PinModal'`
);
send = send.replace(
  `  const [showConfirm, setShowConfirm] = useState(false)`,
  `  const [showConfirm, setShowConfirm] = useState(false)
  const [showPin, setShowPin] = useState(false)`
);
send = send.replace(
  `  const confirmTransfer = async () => {
    setShowConfirm(false)
    setLoading(true)`,
  `  const confirmTransfer = async () => {
    setShowConfirm(false)
    setShowPin(true)
  }

  const handlePinConfirmed = async () => {
    setShowPin(false)
    setLoading(true)`
);
send = send.replace(
  `        {showConfirm && (
          <ConfirmModal`,
  `        {showPin && (
          <PinModal
            title='Verify Your Identity'
            userId={user?.id}
            mode='verify'
            onConfirm={handlePinConfirmed}
            onCancel={() => setShowPin(false)}
          />
        )}
        {showConfirm && (
          <ConfirmModal`
);
fs.writeFileSync('src/pages/SendPage.jsx', send);
console.log('done');
