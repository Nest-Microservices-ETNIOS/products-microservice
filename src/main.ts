import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Main-Products-MS'); // le damos un nombre descriptivo a lo que este ejecutandose

  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: envs.port,
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // await app.listen(envs.port);
  await app.listen();

  // no haremos esto porque no queremos un hibrido (REST + TCP por ejemplo), solo microservicios
  // await app.startAllMicroservices();

  // logger.log(`Server is running on port ${envs.port}`);
  logger.log(`Products Microservice is running on port ${envs.port}`);
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
