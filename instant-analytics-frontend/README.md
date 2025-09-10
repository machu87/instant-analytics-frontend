# Instant Analytics Web (Frontend)

Vite + React + TypeScript + Recharts.

## Local
```powershell
copy .env.example .env
npm install
npm run dev
# Abre http://localhost:5173
```
Ajusta `VITE_API_URL` en `.env` para apuntar al backend.

## Build/Preview
```bash
npm run build
npm run preview
```

## Docker (producción)
```bash
docker build -t instant-analytics-web --build-arg VITE_API_URL=http://localhost:8000 .
docker run -p 8080:80 instant-analytics-web
# App en http://localhost:8080
```
