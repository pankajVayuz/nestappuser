import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { AllExceptionsFilter } from './user/exceptions/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  
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
