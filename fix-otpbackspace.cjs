const fs = require('fs');
const path = 'src/pages/Signup.jsx';
let content = fs.readFileSync(path, 'utf8');

const keyDownFn = `
  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      document.getElementById('otp' + (index - 1))?.focus()
    }
  }
`;

content = content.replace(
  /const handleVerifyAndSignup = /,
  keyDownFn + "\n  const handleVerifyAndSignup = "
);

content = content.replace(
  /onChange={e => handleOtpInput\(i, e\.target\.value\)} style={otpBox}/,
  "onChange={e => handleOtpInput(i, e.target.value)} onKeyDown={e => handleOtpKeyDown(e, i)} style={otpBox}"
);

fs.writeFileSync(path, content);
console.log('Done: Signup.jsx OTP backspace fix added');
