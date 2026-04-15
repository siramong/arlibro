// Importar estilos
import './assets/css/base.css';
import './assets/css/hero.css';
import './assets/css/how.css';
import './assets/css/tesis.css';
import './assets/css/stats-widget.css';

// Importar módulos
import { initCursor } from './assets/js/modules/cursor.js';
import { initStarfield } from './assets/js/modules/starfield.js';
import { initNavScroll } from './assets/js/modules/nav-scroll.js';
import { initStepReveal } from './assets/js/modules/step-reveal.js';
import { StatsWidget } from './assets/js/stats-widget.js';
import { api } from './assets/js/supabase.js';

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar módulos
  initCursor();
  initStarfield();
  initNavScroll();
  initStepReveal();
  
  // Inicializar widget de estadísticas
  new StatsWidget();
});
