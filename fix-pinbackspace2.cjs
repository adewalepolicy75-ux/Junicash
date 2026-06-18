const fs = require('fs');
const path = 'src/pages/AccountPage.jsx';
let content = fs.readFileSync(path, 'utf8');

const keyDownFn = `
  const handleKeyDown = (e, index, prefix) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      document.getElementById(prefix + (index - 1))?.focus()
    }
  }
`;

// Insert function before handlePinInput's containing scope - safest anchor: before first usage
if (!content.includes('const handleKeyDown')) {
  content = content.replace(
    /const handlePinInput = /,
    keyDownFn + "\n  const handlePinInput = "
  );
}

content = content.replace(
  /onChange={e => handlePinInput\(i, e\.target\.value, 'current'\)} style={pinBox}/,
  "onChange={e => handlePinInput(i, e.target.value, 'current')} onKeyDown={e => handleKeyDown(e, i, 'cp')} style={pinBox}"
);
content = content.replace(
  /onChange={e => handlePinInput\(i, e\.target\.value, 'new'\)} style={pinBox}/,
  "onChange={e => handlePinInput(i, e.target.value, 'new')} onKeyDown={e => handleKeyDown(e, i, 'np')} style={pinBox}"
);
content = content.replace(
  /onChange={e => handlePinInput\(i, e\.target\.value, 'confirm'\)} style={pinBox}/,
  "onChange={e => handlePinInput(i, e.target.value, 'confirm')} onKeyDown={e => handleKeyDown(e, i, 'cnp')} style={pinBox}"
);

fs.writeFileSync(path, content);
console.log('Done: AccountPage.jsx updated');
