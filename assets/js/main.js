/* -- Cursor -------------------------------------- */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0;
let my = 0;
let rx = 0;
let ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
});

(function loop() {
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(loop);
})();

document.querySelectorAll('a, button').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '56px';
    ring.style.height = '56px';
    ring.style.opacity = '.4';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.opacity = '1';
  });
});

/* -- Starfield ------------------------------------ */
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function initStars() {
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

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((s) => {
    s.twk += s.spd;
    const alpha = s.a * (0.5 + 0.5 * Math.sin(s.twk));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,220,255,${alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

initStars();
drawStars();
window.addEventListener('resize', initStars);

/* -- Nav scroll ----------------------------------- */
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 60);
});

/* -- QR grid -------------------------------------- */
const qr = document.getElementById('qrGrid');
const pattern = [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1];

if (qr) {
  pattern.forEach((on, i) => {
    const cell = document.createElement('div');
    cell.className = 'qr-cell';
    cell.style.animationDelay = i * 40 + 'ms';
    if (!on) {
      cell.style.opacity = '0';
    }
    qr.appendChild(cell);
  });
}

/* -- Counter animation ----------------------------- */
const counters = document.querySelectorAll('[data-target]');
let counted = false;

function runCounters() {
  if (counted) {
    return;
  }

  counted = true;
  counters.forEach((el) => {
    const target = Number(el.dataset.target);
    const suffix = target >= 40 ? '+' : '';
    let cur = 0;
    const step = target / 50;

    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.textContent = Math.floor(cur) + suffix;
      if (cur >= target) {
        clearInterval(t);
      }
    }, 30);
  });
}

const heroObs = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      runCounters();
    }
  },
  { threshold: 0.3 }
);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  heroObs.observe(heroStats);
}

/* -- Steps scroll reveal --------------------------- */
const stepEls = document.querySelectorAll('.step');
const stepObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

stepEls.forEach((s, i) => {
  s.style.transitionDelay = i * 0.12 + 's';
  stepObs.observe(s);
});

/* -- AR object cycling ----------------------------- */
const arItems = [
  { emoji: '🧬', label: 'Célula vegetal · Biología' },
  { emoji: '🌋', label: 'Volcán activo · Geografía' },
  { emoji: '⚛️', label: 'Átomo de hidrógeno · Química' },
  { emoji: '🦕', label: 'Dinosaurio Jurásico · Historia' },
  { emoji: '🪐', label: 'Sistema Solar · Astronomía' },
  { emoji: '🧪', label: 'Molécula de ADN · Biología' },
];

let arIdx = 0;
const arObjEl = document.getElementById('arObj');
const arLabelEl = document.getElementById('arLabel');

if (arObjEl && arLabelEl) {
  setInterval(() => {
    arIdx = (arIdx + 1) % arItems.length;
    arObjEl.style.opacity = '0';
    arObjEl.style.transform = 'scale(.5) translateY(0)';

    setTimeout(() => {
      arObjEl.textContent = arItems[arIdx].emoji;
      arLabelEl.textContent = arItems[arIdx].label;
      arObjEl.style.transition = 'opacity .5s, transform .5s';
      arObjEl.style.opacity = '1';
      arObjEl.style.transform = '';
    }, 300);
  }, 2500);
}

/* -- Testimonials ---------------------------------- */
const testData = [
  {
    name: 'Sofía Guerrero',
    role: 'Docente de Ciencias, Quito',
    text: 'Mis estudiantes piden clases todos los días desde que usamos ARLibro. El nivel de atención subió increíblemente.',
    stars: 5,
    initials: 'SG',
  },
  {
    name: 'Rodrigo Paredes',
    role: 'Padre de familia, Guayaquil',
    text: 'Mi hijo entendió el sistema solar en 10 minutos con la actividad 3D. Nunca lo vi tan emocionado estudiando.',
    stars: 5,
    initials: 'RP',
  },
  {
    name: 'Lucía Méndez',
    role: 'Directora Académica',
    text: 'Implementamos ARLibro en toda la secundaria. Los resultados en evaluaciones mejoraron un 34% en un semestre.',
    stars: 5,
    initials: 'LM',
  },
  {
    name: 'Carlos Vivanco',
    role: 'Estudiante, 14 años',
    text: 'Es como jugar pero aprendiendo. La parte de química con moléculas en 3D es lo mejor.',
    stars: 5,
    initials: 'CV',
  },
  {
    name: 'Andrea Torres',
    role: 'Coordinadora TIC, Cuenca',
    text: 'Facilísimo de desplegar en toda la institución. Soporte técnico excelente y actualizaciones constantes.',
    stars: 5,
    initials: 'AT',
  },
  {
    name: 'Manuel Soto',
    role: 'Docente de Historia',
    text: 'Ver a los estudiantes interactuar con civilizaciones antiguas en AR es simplemente mágico y transformador.',
    stars: 5,
    initials: 'MS',
  },
];

const track = document.getElementById('testTrack');
if (track) {
  [...testData, ...testData].forEach((t) => {
    const card = document.createElement('div');
    card.className = 'test-card';
    card.innerHTML = `
      <div class="test-stars">${'★'.repeat(t.stars)}</div>
      <p class="test-text">"${t.text}"</p>
      <div class="test-author">
        <div class="test-avatar">${t.initials}</div>
        <div>
          <div class="test-name">${t.name}</div>
          <div class="test-role">${t.role}</div>
        </div>
      </div>`;
    track.appendChild(card);
  });
}
