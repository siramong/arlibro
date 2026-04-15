/* ========================================
   ANALYTICS SECTION - Carga de estadísticas
   ======================================== */

class AnalyticsSection {
  constructor() {
    this.container = document.querySelector('#analyticsContent');
    this.navStatsCount = document.querySelector('#navStatsCount');
    
    if (!this.container) {
      console.warn('Analytics container no encontrado');
      return;
    }

    this.init();
  }

  init() {
    if (!window.supabase) {
      console.warn('Supabase no disponible');
      this.showError();
      return;
    }

    this.loadStats();
    
    // Actualizar cada 45 segundos
    setInterval(() => this.loadStats(), 45000);
  }

  async loadStats() {
    try {
      const total = await window.supabase.getTotalVisits();
      const pageStats = await window.supabase.getPageStats();
      
      this.renderStats(total, pageStats);
      this.updateNavStats(total);
      
    } catch (error) {
      console.error('Error cargando stats:', error);
      this.showError();
    }
  }

  renderStats(total, pageStats) {
    // Crear grid de métricas
    const metrics = [
      {
        value: total,
        label: 'Visitas Totales',
        desc: 'Usuarios descubriendo ARLibro',
      },
      {
        value: Object.keys(pageStats).length,
        label: 'Páginas',
        desc: 'Secciones visitadas',
      },
      {
        value: Math.floor(total / Math.max(1, Object.keys(pageStats).length)) || 0,
        label: 'Promedio',
        desc: 'Visitas por página',
      },
    ];

    let html = '<div class="analytics-content">';
    
    metrics.forEach((metric, idx) => {
      html += `
        <div class="stats-metric" style="animation-delay: ${idx * 0.1}s">
          <div class="stats-metric-value">${metric.value}</div>
          <div class="stats-metric-label">${metric.label}</div>
          <div class="stats-metric-desc">${metric.desc}</div>
        </div>
      `;
    });

    html += '</div>';

    // Agregar tabla de top páginas
    const topPages = Object.entries(pageStats)
      .map(([url, count]) => ({ url, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    html += '<div class="stats-table">';
    html += `
      <div class="stats-table-header">
        <div>Páginas más visitadas</div>
        <div>Visitas</div>
      </div>
    `;

    topPages.forEach((page) => {
      const shortUrl = this.getShortUrl(page.url);
      const icon = this.getPageIcon(shortUrl);
      
      html += `
        <div class="stats-table-row">
          <div class="stats-table-page">
            <span class="stats-table-page-icon">${icon}</span>
            <span class="stats-table-page-name" title="${page.url}">${shortUrl}</span>
          </div>
          <div class="stats-table-count">${page.count}</div>
        </div>
      `;
    });

    html += '</div>';

    this.container.innerHTML = html;

    // Animar números
    this.animateNumbers();
  }

  animateNumbers() {
    const numbers = document.querySelectorAll('.stats-metric-value');
    
    numbers.forEach((el) => {
      const target = parseInt(el.textContent);
      let current = 0;
      const increment = Math.ceil(target / 30);
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = current;
        }
      }, 30);
    });
  }

  getShortUrl(url) {
    try {
      const urlObj = new URL(url);
      let path = urlObj.pathname;
      
      if (path === '/' || path === '') return 'Inicio';
      if (path.includes('index.html')) return 'Inicio';
      
      path = path.replace(/^\//, '').replace(/\/$/, '').replace(/\.html$/, '');
      if (!path) return 'Inicio';
      
      return path.charAt(0).toUpperCase() + path.slice(1);
    } catch {
      return 'Página';
    }
  }

  getPageIcon(pageName) {
    const icons = {
      'inicio': '🏠',
      'tesis': '📚',
      'how': '🎯',
      'features': '⚡',
      'contact': '✉️',
    };
    return icons[pageName.toLowerCase()] || '📄';
  }

  updateNavStats(total) {
    if (this.navStatsCount) {
      this.navStatsCount.textContent = total;
    }
  }

  showError() {
    if (this.container) {
      this.container.innerHTML = `
        <div style="text-align: center; padding: 40px; color: rgba(232, 234, 246, 0.5);">
          <p>Configura Supabase en .env para ver las estadísticas en tiempo real</p>
        </div>
      `;
    }
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => new AnalyticsSection(), 100);
});
