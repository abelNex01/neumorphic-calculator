const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let current = '';
let resetNext = false;

function updateDisplay() {
  display.textContent = current || '0';
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.getAttribute('data-value');
    const action = btn.getAttribute('data-action');

    if (action === 'clear') {
      current = '';
      updateDisplay();
      return;
    }

    if (action === 'delete') {
      current = current.slice(0, -1);
      updateDisplay();
      return;
    }

    if (action === 'calculate') {
      try {
        // Replace % with /100 for percentage calculation
        let expression = current.replace(/%/g, '/100');
        let result = eval(expression);
        current = result.toString();
        resetNext = true;
        updateDisplay();
      } catch {
        current = 'Error';
        resetNext = true;
        updateDisplay();
      }
      return;
    }

    if (resetNext) {
      if (/[0-9.]/.test(value)) {
        current = '';
      }
      resetNext = false;
    }

    // Prevent multiple decimals in a number
    if (value === '.') {
      const parts = current.split(/[\+\-\*\/]/);
      if (parts[parts.length - 1].includes('.')) return;
    }

    current += value;
    updateDisplay();
  });
});

updateDisplay();