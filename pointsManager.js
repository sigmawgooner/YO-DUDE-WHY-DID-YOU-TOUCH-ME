const STORAGE_KEY = 'GambleHub.points.v2';
const BASE_CAP = 500; // first tier cap
const RESET_INTERVAL = 60*60*1000; // 1 hour in ms

const PointsManager = {
  data: { total:0, cap:BASE_CAP, resetStart:null },

  load() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if(stored) this.data = stored;
    } catch {}
  },

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  },

  getPoints() {
    this.checkReset();
    return this.data.total;
  },

  getCap() {
    this.checkReset();
    return this.data.cap;
  },

  addPoints(amount) {
    this.checkReset();
    this.data.total = Math.min(this.data.total + amount, this.data.cap);
    this.save();
  },

  checkReset() {
    if(this.data.total >= this.data.cap && this.data.resetStart===null) {
      this.data.resetStart = Date.now();
      this.save();
    }
    if(this.data.resetStart){
      const elapsed = Date.now() - this.data.resetStart;
      if(elapsed >= RESET_INTERVAL){
        this.data.cap += BASE_CAP; // increase cap by 500
        this.data.resetStart = null;
        this.save();
      }
    }
  },

  displayPoints(elId){
    const el = document.getElementById(elId);
    if(!el) return;
    el.innerText = this.getPoints();
    // Optional: show cap next to total
    const capEl = document.createElement('span');
    capEl.style.fontSize='14px';
    capEl.style.color='#ffd66b';
    capEl.innerText = ` / ${this.getCap()}`;
    if(!el.nextSibling) el.parentNode.appendChild(capEl);
  }
};

// Initialize on load
PointsManager.load();
setInterval(()=>PointsManager.save(), 1000);
