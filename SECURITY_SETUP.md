# 🔐 Configuración Segura de Supabase

## Problema Original
Las credenciales de Supabase **no deben exponerse directamente en el HTML**, incluso aunque la clave ANON sea pública, es mejor protegerlas del lado del servidor.

## Solución Implementada
Se creó un servidor Node.js que:
1. Lee las credenciales desde un archivo `.env` (no versionado)
2. Expone un endpoint `/api/config` que sirve solo lo necesario
3. El frontend carga la config de forma segura sin hardcodearla

## 📋 Setup

### 1. Instalar dependencias
```bash
npm install
```

### 2. Crear archivo `.env`
El archivo de entorno se configura dentro de `backend/`.

En Linux/macOS:

```bash
cd backend
cp .env.example .env
```

En Windows PowerShell:

```powershell
cd backend
Copy-Item .env.example .env
```

Edita `.env` con tus credenciales de Supabase:
```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiI...
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiI...   # fallback opcional
```

### 3. Ejecutar el servidor
```bash
npm run dev:backend
```

El servidor se ejecutará en `http://localhost:3000`

## 🔒 Seguridad
- ✅ Las credenciales se mantienen en `.env` (no versionado)
- ✅ El backend usa `SUPABASE_SERVICE_ROLE_KEY` cuando está disponible
- ✅ El frontend no expone claves privadas hardcodeadas
- ✅ En producción, el servidor/plataforma debe usar HTTPS

## 📝 Notas
- El archivo `.env` debe estar en `.gitignore`
- Si falta `VITE_SUPABASE_URL`, los endpoints de datos quedan deshabilitados y responden `503`
- La clave ANON es pública por naturaleza, pero se recomienda usar `SUPABASE_SERVICE_ROLE_KEY` en backend
- Las reglas RLS y politicas de Supabase siguen siendo fundamentales para proteger datos
