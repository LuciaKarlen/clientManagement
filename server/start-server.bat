@echo off
REM Ajusta estas variables si necesitas
set PORT=4000
set HOST=0.0.0.0

REM Opcional: establecer ip pública del host para referencias (no obligatorio)
REM set HOST_IP=192.168.1.50

echo Starting server on %HOST%:%PORT%
REM Si usas nodemon en desarrollo:
call npm run dev

REM O para arrancar directamente:
REM call node index.js
pause