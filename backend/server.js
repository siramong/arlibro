import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Inicializar Supabase (solo si hay credenciales)
let supabase = null;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (SUPABASE_URL && SUPABASE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log('✅ Supabase conectado');
} else {
  console.warn('⚠️  Supabase no configurado - Endpoints de API deshabilitados');
  console.warn('   Configura VITE_SUPABASE_URL en .env para habilitarlos');
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../frontend/dist')));

const spaIndexPath = path.resolve(__dirname, '../frontend/dist/index.html');

// ====== API ROUTES ======

// Middleware para verificar Supabase
const requireSupabase = (req, res, next) => {
  if (!supabase) {
    return res.status(503).json({ 
      error: 'Supabase no configurado',
      message: 'Configura VITE_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env'
    });
  }
  next();
};

// Registrar una visita
app.post('/api/visits', requireSupabase, async (req, res) => {
  try {
    const { page_url, page_data } = req.body;
    
    const { data, error } = await supabase
      .from('page_visits')
      .insert([{
        page_url: page_url || '/',
        timestamp: new Date().toISOString(),
        user_agent: req.headers['user-agent'],
        referrer: req.headers['referer'] || '',
        ...page_data,
      }]);

    if (error) {
      console.error('Error registrando visita:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error en POST /api/visits:', error);
    res.status(500).json({ error: error.message });
  }
});

// Obtener estadísticas totales
app.get('/api/stats/total', requireSupabase, async (req, res) => {
  try {
    const { count, error } = await supabase
      .from('page_visits')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error obteniendo stats:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json({ total: count || 0 });
  } catch (error) {
    console.error('Error en GET /api/stats/total:', error);
    res.status(500).json({ error: error.message });
  }
});

// Obtener estadísticas por página
app.get('/api/stats/by-page', requireSupabase, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('page_visits')
      .select('page_url');

    if (error) {
      console.error('Error obteniendo stats:', error);
      return res.status(400).json({ error: error.message });
    }

    // Agrupar por página
    const pageStats = {};
    data.forEach(visit => {
      const page = visit.page_url || '/';
      pageStats[page] = (pageStats[page] || 0) + 1;
    });

    res.json(pageStats);
  } catch (error) {
    console.error('Error en GET /api/stats/by-page:', error);
    res.status(500).json({ error: error.message });
  }
});

// Obtener todas las visitas
app.get('/api/visits', requireSupabase, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('page_visits')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error obteniendo visitas:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Error en GET /api/visits:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check - disponible siempre
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    supabase: supabase ? 'connected' : 'not configured'
  });
});

// Servir SPA (Single Page App)
app.get('*', (req, res) => {
  if (fs.existsSync(spaIndexPath)) {
    return res.sendFile(spaIndexPath);
  }

  return res.status(503).send(
    'Frontend no compilado. Ejecuta "npm run build" en la raiz del proyecto antes de iniciar el servidor.'
  );
});

// ====== START SERVER ======
const PORT = process.env.PORT || 3000;

// In Vercel Web Services, Express must listen on PORT.
// In Vercel Serverless Functions, AWS_LAMBDA_FUNCTION_NAME is defined and listen should be skipped.
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
  app.listen(PORT, () => {
    console.log(`✅ Servidor en http://localhost:${PORT}`);
  });
}

export default app;
