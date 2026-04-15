(function () {
  function initStarfield() {
    const canvas = document.getElementById('stars');
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    let stars = [];

    function buildStars() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      stars = Array.from({ length: 220 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random(),
        spd: Math.random() * 0.003 + 0.001,
        twk: Math.random() * Math.PI * 2,
      }));
    }

    function drawFrame() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.twk += star.spd;
        const alpha = star.a * (0.5 + 0.5 * Math.sin(star.twk));

        context.beginPath();
        context.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        context.fillStyle = 'rgba(200,220,255,' + alpha + ')';
        context.fill();
      });

      requestAnimationFrame(drawFrame);
    }

    buildStars();
    drawFrame();

    window.addEventListener('resize', buildStars);
  }

  window.ARLibro = window.ARLibro || {};
  window.ARLibro.initStarfield = initStarfield;
})();
