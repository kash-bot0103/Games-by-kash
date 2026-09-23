// --- SOUND EFFECTS SYSTEM ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  if (type === 'click') {
    // Button click sound
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
    
  } else if (type === 'win') {
    // Winning sound (happy chime)
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.4);
    
  } else if (type === 'lose') {
    // Losing sound (low buzz)
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.3);
    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.3);
    
  } else if (type === 'coin') {
    // Coin/collect sound
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime);
    oscillator.frequency.setValueAtTime(1600, audioCtx.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2);
  }
}

// --- BALANCE SYSTEM ---
let balance = parseFloat(localStorage.getItem('princessBalance')) || 1000.00;

function updateBalanceDisplay() {
  const balanceEl = document.getElementById('balance');
  if (balanceEl) {
    balanceEl.innerText = balance.toFixed(2);
    balanceEl.parentElement.classList.remove('pulse');
    void balanceEl.parentElement.offsetWidth;
    balanceEl.parentElement.classList.add('pulse');
  }
}

function saveBalance() {
  localStorage.setItem('princessBalance', balance.toFixed(2));
  updateBalanceDisplay();
}

function resetBalance() {
  playSound('click');
  balance = 1000.00;
  saveBalance();
  alert('Balance reset to 1,000 GEMS!');
}

// Add click sounds to all buttons automatically
document.addEventListener('DOMContentLoaded', () => {
  updateBalanceDisplay();
  const buttons = document.querySelectorAll('button, .game-card, .btn-back, .btn-reset');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => playSound('click'));
  });
});
