# Client Management - Backend (Node.js + Express + Prisma + MySQL)

Este repositorio contiene la base del backend para un sistema de gestión de clientes y honorarios.

Contenido y estructura principal

- `index.js` - punto de entrada del servidor (Express). Escucha en `HOST` y `PORT`.
- `package.json` - dependencias y scripts.
- `.env` - variables de entorno (ver sección más abajo).
- `start-server.bat` - script para arrancar el servidor en Windows.
- `prisma/schema.prisma` - esquema de la base de datos (MySQL).
- `src/prismaClient.js` - instancia y exportación de Prisma Client.
- `src/routes/` y `src/controllers/` - rutas y controladores (API REST).

Requisitos

- Node.js (recomendado >=16)
- npm
- MySQL disponible en la red (PC host o misma máquina)

Variables de entorno (`.env`)

Ejemplo mínima de `.env`:

```
PORT=4000
HOST=0.0.0.0
DATABASE_URL="mysql://miusuario:miclave@192.168.1.50:3306/client_management"
```

Cambia `192.168.1.50` por la IP de la PC que actúa como servidor de base de datos (o `127.0.0.1` si está en la misma máquina).

Instalación y primeros pasos

1. Instalar dependencias:

```powershell
npm install
```

2. Generar Prisma Client:

```powershell
npx prisma generate
```

3. Aplicar migraciones (crea tablas en la BD):

```powershell
npx prisma migrate dev --name init
```

Si prefieres no usar migraciones en desarrollo usa:

```powershell
npx prisma db push
```

4. Arrancar el servidor (desarrollo):

```powershell
npm run dev
```

O doble clic en `start-server.bat` si estás en Windows.

Conectar desde otras PCs en la LAN

1. Asegúrate que `HOST=0.0.0.0` y que el servidor escucha el puerto configurado.
2. Permite el puerto en el Firewall de Windows para la red privada.
3. En las otras PCs usa `http://<IP_HOST>:<PORT>/api/...` para consumir la API.

Buenas prácticas y notas de seguridad

- No expongas el servidor ni la base de datos a Internet sin HTTPS y autenticación.
- Mantén `.env` fuera del control de versiones (añadir a `.gitignore`).
- Usa cuentas MySQL con acceso limitado y contraseñas fuertes.
- Hacer backups periódicos de la BD.

Siguientes pasos recomendados

- Añadir validación de entrada (express-validator).
- Implementar autenticación (JWT) y roles de usuario.
- Crear una pequeña interfaz `client/` (React o simple HTML) que consuma la API.
- Implementar pruebas unitarias y de integración.

---

Si querés, continuo y creo los controladores básicos (`clientsController.js`), rutas y un par de endpoints de ejemplo (`GET/POST` para clientes).