const fs = require('fs');
const path = 'src/components/PinModal.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add handleKeyDown function right after handleInput/handleNewPinInput block
const keyDownFn = `
  const handleKeyDown = (e, index, prefix) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      document.getElementById(prefix + (index - 1))?.focus()
    }
  }
`;

content = content.replace(
  "const handleSubmit = async () => {",
  keyDownFn + "\n  const handleSubmit = async () => {"
);

// 2. Add onKeyDown to each pin input
content = content.replace(
  /onChange={e => handleInput\(i, e\.target\.value, false\)} style={pinBox}/,
  "onChange={e => handleInput(i, e.target.value, false)} onKeyDown={e => handleKeyDown(e, i, 'pin')} style={pinBox}"
);
content = content.replace(
  /onChange={e => handleInput\(i, e\.target\.value, true\)} style={pinBox}/,
  "onChange={e => handleInput(i, e.target.value, true)} onKeyDown={e => handleKeyDown(e, i, 'cpin')} style={pinBox}"
);
content = content.replace(
  /onChange={e => handleNewPinInput\(i, e\.target\.value, false\)} style={pinBox}/,
  "onChange={e => handleNewPinInput(i, e.target.value, false)} onKeyDown={e => handleKeyDown(e, i, 'npin')} style={pinBox}"
);
content = content.replace(
  /onChange={e => handleNewPinInput\(i, e\.target\.value, true\)} style={pinBox}/,
  "onChange={e => handleNewPinInput(i, e.target.value, true)} onKeyDown={e => handleKeyDown(e, i, 'cnpin')} style={pinBox}"
);

fs.writeFileSync(path, content);
console.log('Done: added handleKeyDown and wired onKeyDown to all 4 PIN box groups in PinModal.jsx');
