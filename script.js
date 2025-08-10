// Modern digital clock with 12/24 toggle (persists in localStorage)
(function () {
  const timeEl = document.getElementById('time');
  const ampmEl = document.getElementById('ampm');
  const dateEl = document.getElementById('date');
  const themeBtn = document.getElementById('themeBtn');

  // load user preference: 24-hour or 12-hour
  let use24 = JSON.parse(localStorage.getItem('clock24')) ?? false;

  function pad(n){ return n < 10 ? '0' + n : n; }

  function update() {
    const now = new Date();
    const h24 = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    let displayHour = h24;
    let ampm = '';

    if (!use24) {
      ampm = h24 >= 12 ? 'PM' : 'AM';
      displayHour = h24 % 12;
      if (displayHour === 0) displayHour = 12;
      ampmEl.style.display = 'inline-block';
    } else {
      // hide AM/PM in 24-hr mode
      ampmEl.style.display = 'none';
    }

    timeEl.textContent = `${pad(displayHour)}:${pad(m)}:${pad(s)}`;
    ampmEl.textContent = ampm;

    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    dateEl.textContent = now.toLocaleDateString(undefined, options);
  }

  // toggle theme (light/dark) — simple: swap css variables (optional)
  let dark = true;
  themeBtn.addEventListener('click', () => {
    use24 = !use24;
    localStorage.setItem('clock24', JSON.stringify(use24));
    themeBtn.textContent = use24 ? '24-hour: ON' : '12-hour: ON';
    update();
  });

  // initial button label
  themeBtn.textContent = use24 ? '24-hour: ON' : '12-hour: ON';

  // update every 250ms for smooth look (and accurate second change)
  update();
  setInterval(update, 250);
})();
