'use strict';
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const closeMenu = () => { mobileNav.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); };
menuButton.addEventListener('click', () => {
  const opening = mobileNav.hidden;
  mobileNav.hidden = !opening;
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.querySelectorAll('[data-panel]').forEach(trigger => trigger.addEventListener('click', () => {
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
