![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

# **DOGS** | Proyecto Individual
Descripción del Proyecto
Este proyecto consiste en una aplicación web que utiliza la API TheDogApi para buscar, visualizar y crear información sobre perros. La aplicación cuenta con varias funcionalidades, entre las cuales se encuentran:

Buscar perros: los usuarios pueden buscar perros utilizando la barra de búsqueda que se encuentra en la página principal.

Visualizar la información de los perros: los usuarios pueden ver la información relevante de los perros, como su nombre, imagen, raza, temperamento, altura, peso, etc.

Filtrar perros: los usuarios pueden filtrar la lista de perros según su raza, temperamento, altura, peso, etc.

Ordenar perros: los usuarios pueden ordenar la lista de perros según su nombre, altura, peso, etc.

Crear nuevos perros: los usuarios pueden crear nuevos perros y agregarlos a la base de datos.

El proyecto también cuenta con una base de datos que tiene dos modelos: uno para las razas de perros y otro para los temperamentos, con una relación muchos a muchos. La base de datos está conectada al backend mediante Sequelize, que es un ORM para NodeJS. El backend está construido con NodeJS y Express.

El frontend de la aplicación está desarrollado con React y Redux. Cuenta con una página de inicio que muestra una breve descripción de la aplicación y una página principal con un SearchBar y un listado de perros con información relevante. La página principal también incluye la opción de filtrar y ordenar la lista de perros.

Instalación
Para instalar el proyecto en tu máquina local, sigue estos pasos:

Clona el repositorio en tu máquina local.

Navega a la carpeta raíz del proyecto y ejecuta npm install para instalar todas las dependencias.

Crea un archivo .env en la carpeta raíz del proyecto y define las variables de entorno necesarias, como la URL de la base de datos, la clave API de TheDogApi, etc.

Ejecuta npm run start para iniciar el servidor de desarrollo.
