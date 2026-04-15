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
Copia `.env.example` a `.env` y llena tus credenciales:
```bash
cp .env.example .env
```

Edita `.env` con tus credenciales de Supabase:
```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiI...
```

### 3. Ejecutar el servidor
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## 🔒 Seguridad
- ✅ Las credenciales se mantienen en `.env` (no versionado)
- ✅ El endpoint `/api/config` sirve las credenciales de forma segura
- ✅ El HTML no expone credenciales hardcodeadas
- ✅ En producción, el servidor debe usar HTTPS

## 📝 Notas
- El archivo `.env` debe estar en `.gitignore`
- La clave ANON es pública por naturaleza, pero así se centraliza su gestión
- Las reglas RLS en Supabase protegen los datos real mente
