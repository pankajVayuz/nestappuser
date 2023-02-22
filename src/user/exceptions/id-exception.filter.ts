import { ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Catch } from '@nestjs/common/decorators';
import { Response } from 'express';
import { IdException } from './id-exception';

@Catch(IdException)
export class IdExceptionFilter implements ExceptionFilter {
  catch(exception: IdException, host: ArgumentsHost) {
    const body = {
      message: exception.message,
      error: 'Id error',
    };
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(HttpStatus.BAD_REQUEST).json(body);
  }
}
