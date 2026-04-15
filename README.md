# ARLibro

Landing y backend de analitica para ARLibro (Libro Digital con Realidad Aumentada para Matematica).

## Stack

- Frontend: Vite (SPA)
- Backend: Node.js + Express
- Base de datos: Supabase
- Deploy: Vercel

## Estructura del proyecto

```text
arlibro/
|- frontend/              # App Vite (codigo fuente en frontend/src)
|- backend/               # API Express y servidor de produccion
|- api/[...all].js        # Entrada serverless para Vercel
|- legacy_landing/        # Version antigua de la landing (referencia)
|- supabase-setup.sql     # Script SQL para crear tablas/indices en Supabase
|- vercel.json
|- README.md
|- SECURITY_SETUP.md
```

## Requisitos

- Node.js 16+
- npm 8+

## Configuracion

1. Instala dependencias en la raiz:

```bash
npm install
```

2. Configura variables de entorno del backend:

```bash
cd backend
cp .env.example .env
```

En Windows PowerShell puedes usar:

```powershell
Copy-Item .env.example .env
```

Variables soportadas:

- `VITE_SUPABASE_URL` (requerida para habilitar endpoints)
- `SUPABASE_SERVICE_ROLE_KEY` (recomendada para backend)
- `VITE_SUPABASE_ANON_KEY` (fallback si no hay service role)
- `PORT` (opcional, por defecto `3000`)

## Desarrollo

Ejecuta en terminales separadas:

```bash
npm run dev:backend
npm run dev:frontend
```

- Frontend local: `http://localhost:5173`
- Backend/API local: `http://localhost:3000`
- Health check: `GET /api/health`

`frontend/vite.config.js` tiene proxy de `/api` hacia `http://localhost:3000`.

## Build y ejecucion

Compilar frontend:

```bash
npm run build
```

Iniciar modo produccion (compila y luego levanta backend):

```bash
npm start
```

## Endpoints principales

- `POST /api/visits` registra visitas
- `GET /api/stats/total` total de visitas
- `GET /api/stats/by-page` visitas agrupadas por pagina
- `GET /api/visits` listado de visitas
- `GET /api/health` estado del servicio

Si Supabase no esta configurado, los endpoints de datos responden `503`.

## Seguridad

La guia detallada de setup seguro esta en `SECURITY_SETUP.md`.

## Licencia

Este proyecto esta licenciado bajo MIT. Ver `LICENSE`.
