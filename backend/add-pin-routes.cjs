const fs = require('fs');
let server = fs.readFileSync('server.js', 'utf8');
server = server.replace(
  `app.listen(PORT, () => console.log('Server running on port ' + PORT));`,
  `app.post('/api/user/set-pin', async (req, res) => {
  try {
    const { userId, pin } = req.body;
    const hashedPin = await bcrypt.hash(pin, 10);
    await User.findByIdAndUpdate(userId, { pin: hashedPin });
    res.json({ message: 'PIN set successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/user/verify-pin', async (req, res) => {
  try {
    const { userId, pin } = req.body;
    const user = await User.findById(userId);
    if (!user.pin) return res.status(400).json({ message: 'PIN not set' });
    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect PIN' });
    res.json({ message: 'PIN verified' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log('Server running on port ' + PORT));`
);
fs.writeFileSync('server.js', server);
console.log('done');
