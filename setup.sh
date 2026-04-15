#!/bin/bash
# Script para configurar ARLibro de forma segura

echo "🔧 Configurando ARLibro..."

# Crear .env si no existe
if [ ! -f .env ]; then
    echo "📝 Creando archivo .env..."
    cp .env.example .env
    echo "✓ Archivo .env creado. Por favor edítalo con tus credenciales de Supabase."
    echo "  VITE_SUPABASE_URL=tu-url"
    echo "  VITE_SUPABASE_ANON_KEY=tu-clave"
else
    echo "✓ Archivo .env ya existe"
fi

# Instalar dependencias (si no están)
if [ ! -d node_modules ]; then
    echo "📦 Instalando dependencias..."
    npm install
else
    echo "✓ Dependencias ya instaladas"
fi

echo "✅ Setup completado"
echo ""
echo "Para iniciar el servidor, ejecuta:"
echo "  npm start"
echo ""
echo "Luego accede a http://localhost:3000"
