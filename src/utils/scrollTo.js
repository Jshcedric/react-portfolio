// Lightweight smooth-scroll helper.
// Native `scroll-behavior: smooth` has a duration that scales with distance,
// which is what made navigation feel slow on long pages. This keeps every
// jump to a short, fixed duration so navigation feels immediate.

const SCROLL_DURATION = 400; // ms

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function animateScrollTo(targetY) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 1) return;

  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / SCROLL_DURATION, 1);
    window.scrollTo(0, startY + distance * easeInOutQuad(progress));
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

export function scrollToHash(hash) {
  if (!hash || hash === "#") {
    animateScrollTo(0);
    return;
  }
  const target = document.querySelector(hash);
  if (!target) return;
  const targetY = target.getBoundingClientRect().top + window.scrollY;
  animateScrollTo(targetY);
}

export function scrollToTop() {
  animateScrollTo(0);
}
