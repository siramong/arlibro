-- ============================================
-- TABLA: page_visits (Estadísticas de visitas)
-- CREADA PARA: ARLibro
-- ============================================
-- 
-- Instrucciones:
-- 1. Ve a https://app.supabase.com/
-- 2. Abre la consola SQL
-- 3. Copia y pega TODO este script
-- 4. Ejecuta
-- 5. Actualiza tu .env con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
--
-- ============================================

-- Crear tabla de visitas
CREATE TABLE page_visits (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  page_url TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas más rápidas
CREATE INDEX idx_page_visits_page_url ON page_visits(page_url);
CREATE INDEX idx_page_visits_timestamp ON page_visits(timestamp);

-- Habilitar RLS (Row Level Security) - Permite lectura pública, sin escritura directa
ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;

-- Política para SELECT (cualquiera puede leer)
CREATE POLICY "Enable read access for all users" ON page_visits
  FOR SELECT
  USING (true);

-- Política para INSERT (cualquiera puede insertar)
CREATE POLICY "Enable insert for all users" ON page_visits
  FOR INSERT
  WITH CHECK (true);

-- ============================================
-- QUERIES ÚTILES PARA TESTING:
-- ============================================
-- Ver todas las visitas:
-- SELECT * FROM page_visits ORDER BY timestamp DESC;
--
-- Contar visitas por página:
-- SELECT page_url, COUNT(*) as total FROM page_visits GROUP BY page_url;
--
-- Visitas del último día:
-- SELECT COUNT(*) FROM page_visits WHERE timestamp > NOW() - INTERVAL '1 day';
--
-- Contar visitas totales:
-- SELECT COUNT(*) FROM page_visits;
-- ============================================
