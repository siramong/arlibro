# Script para configurar ARLibro de forma segura (Windows)

Write-Host "🔧 Configurando ARLibro..." -ForegroundColor Cyan

# Crear .env si no existe
if (-not (Test-Path .env)) {
    Write-Host "📝 Creando archivo .env..." -ForegroundColor Yellow
    Copy-Item .env.example -Destination .env
    Write-Host "✓ Archivo .env creado. Por favor edítalo con tus credenciales de Supabase." -ForegroundColor Green
    Write-Host "  VITE_SUPABASE_URL=tu-url"
    Write-Host "  VITE_SUPABASE_ANON_KEY=tu-clave"
} else {
    Write-Host "✓ Archivo .env ya existe" -ForegroundColor Green
}

# Instalar dependencias (si no están)
if (-not (Test-Path node_modules)) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✓ Dependencias ya instaladas" -ForegroundColor Green
}

Write-Host "✅ Setup completado" -ForegroundColor Green
Write-Host ""
Write-Host "Para iniciar el servidor, ejecuta:" -ForegroundColor Cyan
Write-Host "  npm start"
Write-Host ""
Write-Host "Luego accede a http://localhost:3000" -ForegroundColor Cyan
