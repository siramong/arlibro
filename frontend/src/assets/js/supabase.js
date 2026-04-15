// ====== API CLIENT ======
// Todas las llamadas a Supabase van a través del backend

export const api = {
  async registerVisit(pageData = {}) {
    try {
      const response = await fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_url: window.location.href,
          page_data: pageData,
        }),
      });

      if (!response.ok) throw new Error('Error registrando visita');
      return await response.json();
    } catch (error) {
      console.error('Error en registerVisit:', error);
      return null;
    }
  },

  async getTotalVisits() {
    try {
      const response = await fetch('/api/stats/total');
      if (!response.ok) throw new Error('Error obteniendo stats');
      const data = await response.json();
      return data.total || 0;
    } catch (error) {
      console.error('Error en getTotalVisits:', error);
      return 0;
    }
  },

  async getPageStats() {
    try {
      const response = await fetch('/api/stats/by-page');
      if (!response.ok) throw new Error('Error obteniendo stats por página');
      return await response.json();
    } catch (error) {
      console.error('Error en getPageStats:', error);
      return {};
    }
  },

  async getAllVisits() {
    try {
      const response = await fetch('/api/visits');
      if (!response.ok) throw new Error('Error obteniendo visitas');
      return await response.json();
    } catch (error) {
      console.error('Error en getAllVisits:', error);
      return [];
    }
  },
};

// Registrar visita automáticamente cuando carga
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    api.registerVisit();
  });
} else {
  api.registerVisit();
}
