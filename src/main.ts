import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger, ValidationPipe} from "@nestjs/common"

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  /**Add validation pipe for user validation  */
  app.useGlobalPipes(new ValidationPipe());
  /**Create a server  istener */
  await app.listen(process.env.PORT);
  Logger.log(`server running at port  ${process.env.PORT}`);
}
/**call main bootstrap function */
bootstrap();
