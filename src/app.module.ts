import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [
    /**forRoot() method accepts the same configuration object as mongoose.connect() from the Mongoose package */
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  
    UserModule,
    AuthModule,
    ChatModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    
  ],
  /**Import user controller */
})
export class AppModule {}
