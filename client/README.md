# Client — Bases mínimas (React + TypeScript + Vite + Tailwind + Axios)

Objetivo

Dejarte sólo lo necesario para empezar a programar el frontend con las tecnologías indicadas. Este README explica la estructura mínima recomendada, qué va en cada carpeta/archivo y los pasos claros para crear el proyecto en tu máquina.

Requisitos (en la máquina donde desarrollarás)
- Node.js (recomendado >=16)
- npm (viene con Node) o yarn
- Conexión a la red local (LAN) para probar con el backend

Resumen de la estructura recomendada (qué crearás)

client/
├─ package.json            # scripts: dev, build, preview
├─ vite.config.(ts|js)     # Vite config (server.host true para LAN)
├─ tsconfig.json
├─ postcss.config.cjs
├─ tailwind.config.cjs
├─ .env.local              # opcional: VITE_API_HOST
└─ src/
   ├─ main.tsx            # entry (React + createRoot)
   ├─ App.tsx             # componente raíz
   ├─ index.css           # Tailwind directives + variables globales
   ├─ components/         # componentes presentacionales y contenedores
   │  ├─ ClientsList.tsx
   │  └─ CreateClientForm.tsx
   ├─ services/           # lógica para comunicar con la API (axios instance)
   │  └─ api.ts
   ├─ types/              # tipos TypeScript compartidos (Client, Payment, etc.)
   └─ utils/              # helpers (formatters, validators)

Por qué esta organización
- `components/` contiene piezas reutilizables (no mezcles lógica API aquí).
- `services/api.ts` centraliza la configuración de Axios y la URL base: así si cambia la API sólo tocas un archivo.
- `types/` mantiene los tipos para que todo el equipo use las mismas interfaces.

Pasos mínimos para crear el proyecto (PowerShell)

1) Crear la carpeta del client (si no existe) y ubicarse en ella:

```powershell
cd C:\Users\Usuario\ClientManagement\clientManagement
mkdir client
cd client
```

2) Inicializar un proyecto Vite con plantilla React + TypeScript:

```powershell
npm create vite@latest . -- --template react-ts
```

3) Instalar dependencias principales (desde `client/`):

```powershell
npm install
npm install axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4) Configurar Tailwind (archivo `tailwind.config.cjs`): incluir `./index.html` y `./src/**/*.{ts,tsx}` en `content`.

5) En `src/index.css` poner al inicio:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6) Añadir script de desarrollo en `package.json` si no existe:

```json
"scripts": {
  "dev": "vite --host",
  "build": "vite build",
  "preview": "vite preview"
}
```

Esto hace que el servidor de desarrollo escuche en la interfaz de red y sea accesible desde otras PCs (ej: `http://192.168.1.50:3000`).

Cómo configurar la URL del backend (dos opciones)

- Opción runtime (recomendada para desarrollo): guardar la IP del backend en `localStorage` o en una UI de configuración. Ejemplo de uso en `services/api.ts`:

  - `const baseURL = localStorage.getItem('apiHost') || 'http://localhost:4000';`

- Opción build-time (útil para producción): crear un archivo `.env.local` con la variable `VITE_API_HOST`:

```text
VITE_API_HOST="http://192.168.1.50:4000"
```

En el código se lee con `const base = import.meta.env.VITE_API_HOST`.

Ejemplo mínimo de `services/api.ts` (qué poner y por qué)

El archivo `src/services/api.ts` debe exportar una instancia de Axios ya configurada:

- centraliza la URL y timeouts
- añade interceptores para token (si luego implementás auth)

Ejemplo (corta explicación, pon el archivo en `src/services/api.ts`):

1. Crear `src/services/api.ts` y dentro configurar baseURL usando `import.meta.env.VITE_API_HOST` o `localStorage`.
2. Usar esa instancia en los componentes para llamar `/api/clients`.

Buenas prácticas para empezar a programar (para vos que estás aprendiendo)

- Mantén la separación: components (UI) ↔ services (API) ↔ types (formas de datos).
- No hagas fetch/axios directamente en muchos componentes; llama a funciones de `services/` (p. ej. `clientsService.getAll()`), así si cambias la API sólo modificás `services`.
- Usa TypeScript para definir la forma de los datos: `types/Client.ts` con `interface Client { id: number; name: string; email?: string; phone?: string }`.
- Naming: `PascalCase` para componentes (ClientsList.tsx), `camelCase` para funciones.
- Evita lógica pesada en los componentes; usa `hooks/` o `services/` para lógica reutilizable.

Checklist mínimo para cada nueva pantalla

- Crear componente en `src/components/`.
- Añadir tipos en `src/types/` si son nuevos modelos.
- Crear llamadas a la API en `src/services/clients.ts` (por ejemplo `getAll`, `create`, `update`, `remove`).
- Añadir estilos puntuales en `src/index.css` o usar utilidades Tailwind directamente en el JSX.

Problemas comunes y soluciones rápidas

- CORS: si el navegador bloquea peticiones, en el backend (Express) asegurate de usar `cors()` y permitir la IP/Origen del frontend.
- No accesible desde otra PC: revisá la IP de la máquina que sirve, ejecutá `npm run dev` y permití el puerto (3000) en el Firewall de Windows.
- Variables que no aparecen: recuerda que `import.meta.env.VITE_*` sólo está disponible en tiempo de build/dev con Vite.

¿Qué dejo por ahora (y qué no hago)?

- Dejo la estructura y las instrucciones para que puedas crear el proyecto con Vite + React + TypeScript + Tailwind + Axios.
- No agrego código extra (componentes avanzados, auth, rutas) para no complicar: vos tendrás la guía para crear `components/`, `services/` y `types/` y seguir buenas prácticas.

Si querés, el próximo paso que puedo aplicar por vos es uno de estos (decime la letra):
- A) Crear los archivos mínimos `src/services/api.ts`, `src/types/Client.ts`, `src/components/ClientsList.tsx` y `src/components/CreateClientForm.tsx` ya listos para usar. (te dejo los ejemplos listos para que `npm install` y `npm run dev` funcionen)
- B) Sólo dejarte el README (esto ya está hecho).

Elige A o B. Si elegís A, lo creo en tu workspace; si elegís B, ya terminamos y podés seguir con la guía del README.
# Client (frontend) - Client Management

Frontend mínimo estático para consumir la API del backend.

Estructura

- `index.html` - página principal (simple UI para listar y crear clientes).
- `src/app.js` - lógica JS para comunicarse con la API.
- `src/styles.css` - estilos simples.
- `package.json` - script opcional para levantar un servidor estático con `live-server`.

Cómo usar

1. Configura la IP del servidor backend en la UI (campo "API Host") con la IP donde corre tu backend (por ejemplo `192.168.1.50`). Presiona "Guardar".
2. Si no querés instalar nada, podés simplemente abrir `index.html` en el navegador (File > Open). Algunas características como fetch funcionan mejor si servís los archivos desde un servidor estático.

Para servir localmente (opcional):

```powershell
cd client
npm install
npm run dev
```

Esto levantará `live-server` en el puerto `3000` por defecto y será accesible desde la LAN si la máquina tiene IP `192.168.1.XX`: `http://192.168.1.XX:3000`.

Notas

- El frontend guarda la IP del backend en `localStorage` bajo la clave `apiHost`.
- La app asume que la API está en el puerto `4000` y que los endpoints están en `/api/clients`.

Servir la versión construida en la PC-host

He incluido un script para servir la versión estática generada por `npm run build`:

- `serve-dist.bat` en la carpeta `client/` — sirve `dist/` en el puerto `5000` usando `npx serve`.

Pasos rápidos:

1. Desde `client/` ejecutar:

```powershell
npm run build
```

2. Ejecutar `serve-dist.bat` (doble clic o desde PowerShell):

```powershell
.\serve-dist.bat
```

3. Abrir en otra PC: `http://<IP_HOST>:5000` (asegurate que el puerto 5000 está permitido en el firewall).

