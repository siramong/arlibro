import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../frontend/dist')));

// ====== API ROUTES ======

// Endpoint para obtener config de Supabase (URL y ANON KEY que son públicas)
app.get('/api/config', (req, res) => {
  res.json({
    supabase: {
      url: process.env.VITE_SUPABASE_URL || '',
      key: process.env.VITE_SUPABASE_ANON_KEY || '',
    }
  });
});

// Servir SPA (Single Page App) - Esto permite routing en el frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});

// ====== START SERVER ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📦 Backend en puerto ${PORT}`);
  console.log(`🎨 Frontend sirviendo desde /`);
});
