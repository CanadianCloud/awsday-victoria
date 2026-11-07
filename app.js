'use strict';
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const closeMenu = () => { mobileNav.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); };
menuButton.addEventListener('click', () => {
  closeCityPicker();
  const opening = mobileNav.hidden;
  mobileNav.hidden = !opening;
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.querySelectorAll('[data-panel]').forEach(trigger => trigger.addEventListener('click', () => {
  closeCityPicker();
  const dialog = document.getElementById(`panel-${trigger.dataset.panel}`);
  if (!dialog) return;
  const returnFocus = mobileNav.contains(trigger) ? menuButton : trigger;
  closeMenu();
  dialog.addEventListener('close', () => returnFocus.focus(), { once: true });
  dialog.showModal();
  document.body.classList.add('dialog-open');
}));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  dialog.addEventListener('click', e => {
    const box = dialog.getBoundingClientRect();
    if (e.target === dialog && (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom)) dialog.close();
  });
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width:1051px)').addEventListener('change', e => { if (e.matches) closeMenu(); });

// City selection is a disclosure dropdown of ordinary navigation links.
const citySelector = document.querySelector('.city-selector');
const cityButton = citySelector.querySelector('.city-switch');
const cityOptions = document.getElementById('city-options');
const cityLinks = [...cityOptions.querySelectorAll('a')];
const cityTriggers = [...document.querySelectorAll('[data-city-picker]')];
let cityOpener = cityButton;
const closeCityPicker = (restoreFocus = false) => {
  cityOptions.hidden = true;
  cityTriggers.forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
  if (restoreFocus) cityOpener.focus();
};
const openCityPicker = (trigger = cityButton, focusIndex = null) => {
  closeMenu();
  cityOpener = trigger;
  cityOptions.hidden = false;
  cityTriggers.forEach(item => item.setAttribute('aria-expanded', 'true'));
  if (focusIndex !== null) cityLinks[focusIndex].focus();
};
cityTriggers.forEach(trigger => trigger.addEventListener('click', () => {
  if (cityOptions.hidden) openCityPicker(trigger, trigger === cityButton ? null : 0);
  else closeCityPicker();
}));
cityButton.addEventListener('keydown', event => {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    openCityPicker(cityButton, event.key === 'ArrowDown' ? 0 : cityLinks.length - 1);
  }
});
cityOptions.addEventListener('keydown', event => {
  const index = cityLinks.indexOf(document.activeElement);
  let nextIndex;
  if (event.key === 'ArrowDown') nextIndex = (index + 1) % cityLinks.length;
  if (event.key === 'ArrowUp') nextIndex = (index - 1 + cityLinks.length) % cityLinks.length;
  if (event.key === 'Home') nextIndex = 0;
  if (event.key === 'End') nextIndex = cityLinks.length - 1;
  if (nextIndex !== undefined) { event.preventDefault(); cityLinks[nextIndex].focus(); }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !cityOptions.hidden) {
    event.preventDefault();
    closeCityPicker(true);
  }
});
document.addEventListener('click', event => {
  if (!citySelector.contains(event.target) && !event.target.closest('[data-city-picker]')) closeCityPicker();
});
citySelector.addEventListener('focusout', event => {
  if (!citySelector.contains(event.relatedTarget)) closeCityPicker();
});
cityLinks.forEach(link => link.addEventListener('click', () => closeCityPicker()));
