const fs = require('fs');
const path = 'src/pages/Signup.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add react-icons import (after first existing import line)
if (!content.includes("react-icons/fi")) {
  content = content.replace(
    /import { useState } from 'react'/,
    "import { useState } from 'react'\nimport { FiEye, FiEyeOff } from 'react-icons/fi'"
  );
}

// 2. Add state toggles near other useState declarations
content = content.replace(
  "const [otp, setOtp] = useState(['', '', '', '', '', ''])",
  "const [otp, setOtp] = useState(['', '', '', '', '', ''])\n  const [showPassword, setShowPassword] = useState(false)\n  const [showConfirm, setShowConfirm] = useState(false)"
);

// 3. Wrap password input with relative div + eye toggle
content = content.replace(
  `<input type='password' name='password' placeholder='........' value={form.password} onChange={handleChange} style={input} />`,
  `<div style={{ position: 'relative' }}>
                  <input type={showPassword ? 'text' : 'password'} name='password' placeholder='........' value={form.password} onChange={handleChange} style={{ ...input, paddingRight: '2.5rem' }} />
                  <span onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#9ca3af', display: 'flex' }}>
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </span>
                </div>`
);

// 4. Wrap confirm password input with relative div + eye toggle
content = content.replace(
  `<input type='password' name='confirm' placeholder='........' value={form.confirm} onChange={handleChange} style={input} />`,
  `<div style={{ position: 'relative' }}>
                  <input type={showConfirm ? 'text' : 'password'} name='confirm' placeholder='........' value={form.confirm} onChange={handleChange} style={{ ...input, paddingRight: '2.5rem' }} />
                  <span onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#9ca3af', display: 'flex' }}>
                    {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </span>
                </div>`
);

fs.writeFileSync(path, content);
console.log('Done: password eye-icon toggle added to Signup.jsx');
