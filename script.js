// Shared balance system using localStorage
let balance = parseFloat(localStorage.getItem('demoBalance')) || 1000.00;

function updateBalanceDisplay() {
  const balanceEl = document.getElementById('balance');
  if (balanceEl) {
    balanceEl.innerText = balance.toFixed(2);
  }
}

function saveBalance() {
  localStorage.setItem('demoBalance', balance.toFixed(2));
  updateBalanceDisplay();
}

function resetBalance() {
  balance = 1000.00;
  saveBalance();
  alert('Balance reset to 1,000 DEMO!');
}

// Update balance on page load
updateBalanceDisplay();
