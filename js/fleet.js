import { vehicles } from './vehicles.js';

/** Draw the vehicle cards using the demo inventory. */
export function renderFleet(container) {
  container.innerHTML = vehicles.map((vehicle) => `
    <article class="car-card">
      <div class="car-photo">
        <img src="${vehicle.image}" alt="Illustrative ${vehicle.name} rental car" loading="lazy">
      </div>
      <div class="car-details">
        <h3>${vehicle.name}</h3>
        <div class="spec">
          <span>♟ ${vehicle.seats} seats</span>
          <span>⚙ Automatic*</span>
          <span>❄ A/C*</span>
        </div>
        <div class="price-row">
          <div>
            <small>Example from</small>
            <strong>US$ ${vehicle.price}</strong><em>/day*</em>
          </div>
          <button class="round-btn" type="button" data-vehicle="${vehicle.name}"
                  aria-label="Request ${vehicle.name}">→</button>
        </div>
      </div>
    </article>
  `).join('');
}
