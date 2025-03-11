import { NestFactory } from '@nestjs/core'; 
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  
    whitelist: true,  
    forbidNonWhitelisted: true,  
    validationError: {
      target: false, 
      value: false,  
    },
  }));
  
  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization' 
  });

  const options = new DocumentBuilder()
    .setTitle('Todolist API')
    .setDescription('A simple Nest.js API with Fastify')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
