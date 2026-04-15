// ====== CONFIGURACIÓN SUPABASE ======
let SUPABASE_URL = '';
let SUPABASE_ANON_KEY = '';

// Tabla donde se guardan las visitas
const TABLE_NAME = 'page_visits';

// ====== INICIALIZAR SUPABASE ======
window.supabase = {
  url: SUPABASE_URL,
  key: SUPABASE_ANON_KEY,

  // Cargar configuración desde el servidor
  async loadConfig() {
    try {
      const response = await fetch('/api/config');
      if (!response.ok) throw new Error('Error cargando config');
      const data = await response.json();
      SUPABASE_URL = data.supabase.url;
      SUPABASE_ANON_KEY = data.supabase.key;
      this.url = SUPABASE_URL;
      this.key = SUPABASE_ANON_KEY;
      return true;
    } catch (error) {
      console.error('Error cargando configuración Supabase:', error);
      return false;
    }
  },

  // registrar una visita
  async registerVisit(pageData = {}) {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      await this.loadConfig();
    }

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.warn('Supabase no configurado. Verifica que el servidor esté ejecutándose.');
      return null;
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          page_url: window.location.href,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          referrer: document.referrer,
          ...pageData,
        }),
      });

      if (!response.ok) {
        console.error('Error registrando visita:', response.statusText);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Error en registerVisit:', error);
      return null;
    }
  },

  // obtener estadísticas
  async getStats(filters = {}) {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      await this.loadConfig();
    }
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return [];

    try {
      let query = `${SUPABASE_URL}/rest/v1/${TABLE_NAME}?select=*`;

      if (filters.page_url) {
        query += `&page_url=eq.${encodeURIComponent(filters.page_url)}`;
      }

      const response = await fetch(query, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });

      if (!response.ok) {
        console.error('Error obteniendo stats:', response.statusText);
        return [];
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getStats:', error);
      return [];
    }
  },

  // contar visitas totales
  async getTotalVisits() {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      await this.loadConfig();
    }
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return 0;

    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/${TABLE_NAME}?select=count=eq.true`,
        {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Prefer': 'count=exact',
          },
        }
      );

      if (!response.ok) return 0;
      return parseInt(response.headers.get('content-range')?.split('/')[1] || '0');
    } catch (error) {
      console.error('Error en getTotalVisits:', error);
      return 0;
    }
  },

  // stats por página
  async getPageStats() {
    const stats = await this.getStats();
    const grouped = {};

    stats.forEach((visit) => {
      const page = visit.page_url;
      if (!grouped[page]) {
        grouped[page] = 0;
      }
      grouped[page]++;
    });

    return grouped;
  },
};

// Registrar visita automáticamente cuando carga
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.supabase.registerVisit();
  });
} else {
  window.supabase.registerVisit();
}
