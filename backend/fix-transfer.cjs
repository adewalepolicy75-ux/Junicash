const fs = require('fs');
let server = fs.readFileSync('server.js', 'utf8');
server = server.replace(
  `app.post('/api/transfer', async (req, res) => {
  try {
    const { senderAccountNumber, receiverAccountNumber, amount, description } = req.body;
    if (senderAccountNumber === receiverAccountNumber) return res.status(400).json({ message: 'Cannot transfer to yourself' });
    const sender = await User.findOne({ accountNumber: senderAccountNumber });
    const receiver = await User.findOne({ accountNumber: receiverAccountNumber });
    if (!sender) return res.status(404).json({ message: 'Sender not found' });
    if (!receiver) return res.status(404).json({ message: 'Receiver not found' });
    if (sender.balance < amount) return res.status(400).json({ message: 'Insufficient balance' });`,
  `app.post('/api/transfer', async (req, res) => {
  try {
    const { senderAccountNumber, receiverAccountNumber, amount, description } = req.body;
    if (senderAccountNumber === receiverAccountNumber) return res.status(400).json({ message: 'Cannot transfer to yourself' });
    const sender = await User.findOne({ accountNumber: senderAccountNumber });
    const receiver = await User.findOne({ accountNumber: receiverAccountNumber });
    if (!sender) return res.status(404).json({ message: 'Sender not found' });
    if (!receiver) return res.status(404).json({ message: 'Receiver not found' });
    const senderTxs = await Transaction.find({ userId: sender._id });
    const calculatedBalance = senderTxs.reduce((sum, tx) => tx.type === 'income' ? sum + tx.amount : sum - tx.amount, 0);
    if (calculatedBalance < amount) return res.status(400).json({ message: 'Insufficient balance' });`
);
fs.writeFileSync('server.js', server);
console.log('done');
