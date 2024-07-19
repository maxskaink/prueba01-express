# Aplicación de Backend con Express y Docker

Este es un proyecto de ejemplo que muestra cómo crear una aplicación de backend utilizando Express y Docker.

## Requisitos

- Node.js
- Docker

## Instalación

1. Clona este repositorio en tu máquina local.
2. Navega hasta el directorio del proyecto: `cd proyecto-express-01/back-express`.
3. Ejecuta `npm install` para instalar las dependencias.

## Uso

1. Ejecuta `npm start` para iniciar el servidor.
2. Abre tu navegador y visita `http://localhost:3000` para ver la aplicación en funcionamiento.

## Docker

Si prefieres ejecutar la aplicación utilizando Docker, sigue estos pasos:

1. Asegúrate de tener Docker instalado en tu máquina.
2. Ejecuta `docker build -t backend-express .` para construir la imagen de Docker.
3. Ejecuta `docker run -p 3000:3000 backend-express` para iniciar el contenedor.

## Contribuciones

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork de este repositorio.
2. Crea una rama con tu nueva funcionalidad: `git checkout -b nueva-funcionalidad`.
3. Realiza tus cambios y haz commit: `git commit -m "Agrega nueva funcionalidad"`.
4. Haz push a tu rama: `git push origin nueva-funcionalidad`.
5. Abre un pull request en este repositorio.

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, por favor consulta el archivo [LICENSE](./LICENSE).
