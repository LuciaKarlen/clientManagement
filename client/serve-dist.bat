@echo off
REM Servir los archivos construidos (dist) en la máquina host usando 'serve'
REM Asegurate de haber corrido 'npm run build' primero en la carpeta client/

cd /d "%~dp0"
echo Building and serving the dist folder
REM Si ya construiste, comenta la siguiente línea
REM npm run build

REM Usar npx serve para servir la carpeta dist en el puerto 5000
npx serve -s dist -l 5000

pause
