# NodeJS - API Rest - JWT Authentication

Esta es una aplicación back-end que permite registrarse como usuario, iniciar sesión, consultar un recurso protegido y cerrar sesión. Las tecnologías principales son Node.js con Express, MySQL para la persistencia y la especificación JWT para el manejo de autenticación.

## Requisitos

Es necesario tener instalado los siguientes programas en nuestro equipo:

- Node.js **v20.16.0**
- MySQL **v8.0.33**
- Git

## Tecnologías o dependencias principales

- Node.js **v20.16.0** Entorno de ejecución de JavaScript.
- Express **v4.21.0** Usado para levantar el servidor.
- MySQL **v8.0.33** Motor de base de datos utilizado para persistir la información del usuario.

## Dependencias

- bcrypt **v5.1.1** Esta biblioteca permite encriptar las contraseñas.
- cookie-parser **v1.4.6** Facilita el manejo de las cookies
- jsonwebtoken **v9.0.2** Implementación de JWT.
- mysql2 **v3.11.0** Permite la conexión con la base de datos MySQL.
- sequelize **v6.37.3** ORM que ofrece una capa de abstracción para gestionar la base de datos.
- zod **v3.23.8** Biblioteca que facilita el manejo y validación de la estructura de objetos.

## Instrucciones

### Clonar repositorio con git

1. Abrir una terminal como CMD, PowerShell o similar.

2. Ejecute los siguiente comandos para clonar el repositorio:

```cmd
mkdir nodejs_au

cd nodejs_au

git clone https://github.com/narto12345/NodeJS-API_Rest-JWT_Authenticationion.git
```

### Importar base de datos MySQL

Una vez halla clonado el repositorio, en el directorio raíz encontrará un archivo llamado **"node_api_au.sql"** que es una copia de seguridad de la base de datos que necesitamos para ejecutar esta aplicación.
En este instructivo no se explicará tal proceso, sin embargo, en el siguiente enlace encontrará los pasos para importarlo, utilizando MySQL Workbench [Tutorial de documentación oficial de MySQL](https://dev.mysql.com/doc/workbench/en/wb-admin-export-import-management.html).

### Levantar aplicativo

1. Establecer las credenciales de la base de datos MySQL:

Diríjase al fichero **\repositories\user-repository.js** en el cual encontrará el siguiente código en la parte inicial:

```javascript
import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

class UserRepository {
  constructor() {
    /*Remplazar los valores de root (solo si aplica) y "12345" por
    las credenciales de su instancia de MySQL donde importó la base de datos
    "node_api_au.sql"*/
    this.connection = new Sequelize("node_api_au", "root", "12345", {
      host: "localhost",
      dialect: "mysql",
    });
```

2. Instalar las depencias con **npm**

Ejecute los siguiente comandos en su CLI, (asegurece de encontrase en el directorio raíz del proyecto)

```cmd
npm install
```

3. Iniciar aplicación:

```cmd
npm run dev
```

Una vez haya ejecuta el comando deberá ver el siguiente mensaje:

![server started](/resources/start_server.png)

Al ver este mensaje puede iniciar a probar cada uno de los endpoints del sercivio:

### Endpoints

1. **Registrarse**

- URL: http://localhost:3000/register
- Method: POST
- Body (example):

```json
{
  "username": "Pepito",
  "password": "san"
}
```

**Respuesta:**

- Estado: 200

```json
{
  "id": null,
  "username": "Pepito",
  "password": "$2b$10$Z3QKlEGVyIaweixrghKcIulgdiCPa/f.D81B85nxVw8NOaeVaOuAK"
}
```

2. **Iniciar sesión**

- URL: http://localhost:3000/login
- Method: POST
- Body (example):

```json
{
  "username": "Pepito",
  "password": "san"
}
```

**Respuesta:**

- Estado: 200

```json
{
  "message": "Te has logeado :D"
}
```

3. **Obtener recursos protegidos**

- URL: http://localhost:3000/protected
- Method: GET
- Body: No aplica

**Respuesta:**

En este caso devuelve un arreglo de los usuarios en la base de datos:

- Estado: 200

```json
[
  {
    "id": 1,
    "username": "Pepito",
    "password": "$2b$10$Z3QKlEGVyIaweixrghKcIulgdiCPa/f.D81B85nxVw8NOaeVaOuAK"
  }
]
```

4. **Cerrar sesión**

- URL: http://localhost:3000/logout
- Method: POST
- Body: No aplica

**Respuesta:**

- Estado: 200

```json
{
  "message": "Sesión cerrada"
}
```
