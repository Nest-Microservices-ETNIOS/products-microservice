# Temas puntuales de la sección

En esta sección crearemos nuestro primer microservicio para manejar productos, pero nacerá como un servicio REST que luego transformaremos en un microservicio para que mentalmente podamos hacer las conexiones de las similitudes.

Puntualmente veremos:

- CRUD
- MessagePattern
- SQLite
- Prisma con Nest
- Migraciones
- Transformar REST a Microservicio
- Aplicaciones Híbridas Rest + Microservicios (esto se verá a profundidad en la sección de Auth)
- GitHub - Organizaciones

Una vez creado nuestro microservicio de productos, empezaremos a construir las otras piezas de este rompecabezas poco a poco.

---

## Nota importante

Recuerden actualizar el Nest CLI a la última versión en caso de que ya lo tengan instalado para evitar inconvenientes a la hora de instalar dependencias en nuestro proyecto. Para actualizarlo a la última versión disponible simplemente ejecuten el siguiente comando con permisos de administrador en una terminal:

```bash
npm install -g @nestjs/cli
```

Es todo, sigamos con el curso.

# Product Microservice

## Dev

1. Clonar el repositorio
2. Instalar dependencias
3. Crear un archivo `.env` basado en el `env.template`
4. Ejecutar migración de prisma `npx prisma migrate dev`
5. Levantar el servidor de NATS

```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```

6. Ejecutar `npm run start:dev`
