export function initStepReveal() {
  const stepEls = document.querySelectorAll('.step');
  if (!stepEls.length) {
    return;
  }

  const stepObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.2 }
  );

  stepEls.forEach((step, index) => {
    step.style.transitionDelay = index * 0.12 + 's';
    stepObserver.observe(step);
  });
}
