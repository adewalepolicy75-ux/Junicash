const fs = require('fs');
let form = fs.readFileSync('src/components/TransactionForm.jsx', 'utf8');
form = form.replace(
  `import { useState } from 'react'`,
  `import { useState } from 'react'
import ConfirmModal from './ConfirmModal'`
);
form = form.replace(
  `  const [error, setError] = useState('')`,
  `  const [error, setError] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [pendingForm, setPendingForm] = useState(null)`
);
form = form.replace(
  `  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.amount || !form.description || !form.category) {
      setError('Please fill in all fields including category')
      return
    }
    setError('')
    onAdd(form)
    setForm({ type: form.type, amount: '', category: '', description: '', date: new Date().toISOString().split('T')[0] })
  }`,
  `  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.amount || !form.description || !form.category) {
      setError('Please fill in all fields including category')
      return
    }
    setError('')
    setPendingForm(form)
    setShowConfirm(true)
  }

  const handleConfirm = () => {
    onAdd(pendingForm)
    setForm({ type: pendingForm.type, amount: '', category: '', description: '', date: new Date().toISOString().split('T')[0] })
    setShowConfirm(false)
    setPendingForm(null)
  }`
);
form = form.replace(
  `  return (
    <div style={{ background: '#ede9fe'`,
  `  return (
    <>
    {showConfirm && (
      <ConfirmModal
        title='Confirm Transaction'
        message={'Add ' + (pendingForm?.type === 'income' ? 'income' : 'expense') + ' of ₦' + Number(pendingForm?.amount).toLocaleString() + ' for ' + pendingForm?.category + '?'}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
        confirmText='Add Transaction'
        confirmColor={pendingForm?.type === 'income' ? '#059669' : '#6d28d9'}
      />
    )}
    <div style={{ background: '#ede9fe'`
);
form = form.replace(
  `}

export default TransactionForm`,
  `}
    </>
  )
}

export default TransactionForm`
);
form = form.replace(
  `    </div>
  )
}

export default TransactionForm`,
  `    </div>
    </>
  )
}

export default TransactionForm`
);
fs.writeFileSync('src/components/TransactionForm.jsx', form);
console.log('done');
