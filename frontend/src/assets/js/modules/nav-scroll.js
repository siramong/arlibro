export function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) {
    return;
  }

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }

  onScroll();
  window.addEventListener('scroll', onScroll);
}
