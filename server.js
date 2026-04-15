import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Servir archivos estáticos
app.use(express.static(__dirname));

// Endpoint para obtener config de Supabase (solo URL y ANON KEY que son públicas)
app.get('/api/config', (req, res) => {
  res.json({
    supabase: {
      url: process.env.VITE_SUPABASE_URL,
      key: process.env.VITE_SUPABASE_ANON_KEY,
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✓ Servidor ejecutándose en http://localhost:${PORT}`);
});
