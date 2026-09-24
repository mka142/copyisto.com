/**
 * Plays a figure's entrance once, when half of it is on screen. Components
 * mark the figure with `data-reveal` and style `.is-armed` (waiting) and
 * `.is-playing`. Without JS, or with reduced motion, neither class is ever
 * set, so the figure shows its final state.
 */
const figures = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (figures.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.replace('is-armed', 'is-playing');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.5 },
  );
  for (const figure of figures) {
    figure.classList.add('is-armed');
    observer.observe(figure);
  }
}
