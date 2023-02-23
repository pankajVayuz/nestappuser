import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { AllExceptionsFilter } from './user/exceptions/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ServerOptions } from 'http';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';



export class SocketAdapter extends IoAdapter {
  createIOServer(
    port: number,
    options?: ServerOptions & {
      namespace?: string;
      server?: any;
    },
  ) {
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
    });
    return server;
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  app.useWebSocketAdapter(new SocketAdapter(app));
  
  /**Add validation pipe for user validation  */
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));


  const config = new DocumentBuilder()
    .setTitle('User example')
    .setDescription('User NestApp Rest Api Docs')
    .setVersion('1.0')
    .addTag('Users api')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT Token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  /**Create a server  istener */
  await app.listen(process.env.PORT);
  Logger.log(`server running at port  ${process.env.PORT}`);
}
/**call main bootstrap function */
bootstrap();
