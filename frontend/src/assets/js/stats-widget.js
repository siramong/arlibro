import { supabase } from './supabase.js';

export class StatsWidget {
  constructor() {
    this.widget = document.querySelector('#stats-widget');
    
    if (!this.widget) {
      return;
    }

    this.init();
  }

  async init() {
    if (!supabase) {
      console.warn('Supabase no disponible');
      return;
    }

    this.loadStats();
    
    // Actualizar cada 45 segundos
    setInterval(() => this.loadStats(), 45000);
  }

  async loadStats() {
    try {
      const total = await supabase.getTotalVisits();
      this.renderStats(total);
    } catch (error) {
      console.error('Error cargando stats:', error);
    }
  }

  renderStats(total) {
    const stats = this.widget.querySelectorAll('.stat');
    if (stats.length > 0) {
      stats[0].querySelector('.stat-number').textContent = total;
    }
    if (stats.length > 1) {
      // Podrías calcular usuarios únicos aquí
      stats[1].querySelector('.stat-number').textContent = Math.ceil(total * 0.7);
    }
  }
}
