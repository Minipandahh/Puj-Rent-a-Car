import { vehicles } from './vehicles.js';

const grid = document.querySelector('#vehicle-grid');
const count = document.querySelector('#fleet-count');
const filters = document.querySelectorAll('[data-filter]');
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

function render(filter = 'all') {
  const shown = filter === 'all' ? vehicles : vehicles.filter(vehicle => vehicle.name === filter);
  count.textContent = `${shown.length} vehicle option${shown.length === 1 ? '' : 's'}`;
  grid.innerHTML = shown.map(vehicle => `
    <article class="vehicle-card">
      <img class="vehicle-photo" src="${escapeHTML(vehicle.image)}" alt="Illustrative image: ${escapeHTML(vehicle.name)}" loading="lazy">
      <div class="vehicle-info">
        <div class="vehicle-top"><h3>${escapeHTML(vehicle.name)}</h3><span class="vehicle-category">Rental category</span></div>
        <p>Discover Punta Cana with a comfortable vehicle that fits your travel plans.</p>
        <div class="vehicle-specs"><span>♟ ${Number(vehicle.seats)} passengers*</span><span>⚙ Automatic*</span><span>❄ A/C*</span></div>
        <div class="vehicle-bottom"><div><small>Example price from</small><strong>US$ ${Number(vehicle.price)}</strong> / day*</div><a class="button" href="index.html#booking-form">Request This Vehicle →</a></div>
      </div>
    </article>`).join('');
}

filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => {item.classList.remove('active');item.setAttribute('aria-pressed','false')});
  button.classList.add('active');
  button.setAttribute('aria-pressed','true');
  render(button.dataset.filter);
}));

const menu = document.querySelector('#fleet-menu');
const links = document.querySelector('#fleet-links');
menu.addEventListener('click', () => {
  const expanded = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(expanded));
});
document.querySelector('#fleet-year').textContent = new Date().getFullYear();
render();
