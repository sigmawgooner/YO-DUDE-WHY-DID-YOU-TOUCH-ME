// pointsManager.js
const PointsManager = (() => {
  const KEY = 'totalPoints';

  function getPoints() {
    return parseInt(localStorage.getItem(KEY) || '0');
  }

  function addPoints(amount) {
    let total = getPoints();
    total += amount;
    localStorage.setItem(KEY, total);
    return total;
  }

  function spendPoints(amount) {
    let total = getPoints();
    if (total >= amount) {
      total -= amount;
      localStorage.setItem(KEY, total);
      return true;
    }
    return false;
  }

  function resetPoints() {
    localStorage.setItem(KEY, 0);
  }

  function displayPoints(elId) {
    const el = document.getElementById(elId);
    if (el) el.innerText = getPoints();
  }

  return {
    getPoints,
    addPoints,
    spendPoints,
    resetPoints,
    displayPoints
  };
})();
