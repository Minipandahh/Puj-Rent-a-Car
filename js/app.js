import { renderFleet } from './fleet.js';

// Page elements
const $ = (selector) => document.querySelector(selector);
const pickup = $('#pickup');
const start = $('#start');
const end = $('#end');
const type = $('#type');
const modal = $('#request-modal');
const fleet = $('#fleet-grid');
const menu = $('#menu');
const navLinks = $('#nav-links');

renderFleet(fleet);
$('#year').textContent = new Date().getFullYear();

// Date rules: never allow a return before pickup.
function localISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const today = new Date();
start.min = localISO(today);
end.min = localISO(today);
start.value = localISO(today);
const returnDate = new Date(today);
returnDate.setDate(returnDate.getDate() + 7);
end.value = localISO(returnDate);

start.addEventListener('change', () => {
  end.min = start.value;
  if (end.value < start.value) end.value = start.value;
});

// Toast messages
let toastTimeout;
function notify(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.style.display = 'block';
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => { toast.style.display = 'none'; }, 3500);
}

// Inquiries in this demo are copied, not sent to a server.
function openRequest(vehicleName) {
  if (vehicleName) type.value = vehicleName;
  $('#request-summary').textContent =
    `${type.value} • ${start.value} → ${end.value} • ${pickup.value}`;
  modal.showModal();
}

$('#booking-form').addEventListener('submit', (event) => {
  event.preventDefault();
  if (end.value < start.value) {
    notify('Return date cannot be before pickup date.');
    return;
  }
  openRequest();
});

fleet.addEventListener('click', (event) => {
  const button = event.target.closest('[data-vehicle]');
  if (button) openRequest(button.dataset.vehicle);
});

function scrollToBooking() {
  $('#booking-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
}
$('#header-book').addEventListener('click', scrollToBooking);
$('#cta-book').addEventListener('click', scrollToBooking);
$('#modal-close').addEventListener('click', () => modal.close());

$('#request-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const message = [
    'PUJ Rent a Car — Rental inquiry',
    `Name: ${$('#guest').value}`,
    `Contact: ${$('#contact-detail').value}`,
    `Pickup: ${pickup.value}`,
    `Pickup date: ${start.value}`,
    `Return date: ${end.value}`,
    `Car type: ${type.value}`,
    `Notes: ${$('#additional').value}`,
  ].join('\n');

  try {
    await navigator.clipboard.writeText(message);
    notify('Request copied! Paste it into email or WhatsApp.');
  } catch {
    window.prompt('Copy your booking request:', message);
  }
  modal.close();
});

// Mobile navigation
menu.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  });
});

$('#lang-toggle').addEventListener('click', () => {
  notify('Spanish version can be added when site copy is approved.');
});
