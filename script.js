// Virtual Money System
const STARTING_BALANCE = 1000;

function getBalance() {
  return parseFloat(localStorage.getItem('demoBalance')) || STARTING_BALANCE;
}

function setBalance(amount) {
  localStorage.setItem('demoBalance', amount.toFixed(2));
  updateBalanceDisplay();
}

function updateBalanceDisplay() {
  const balance = getBalance();
  const balanceElement = document.getElementById('balance');
  if (balanceElement) {
    balanceElement.textContent = balance.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}

function resetBalance() {
  if (confirm('Reset your balance to 1,000 DEMO?')) {
    setBalance(STARTING_BALANCE);
  }
}

// Initialize when page loads
updateBalanceDisplay();
