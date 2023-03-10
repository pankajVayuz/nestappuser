import { Module } from '@nestjs/common';
import { User, UserSchema } from './schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { HashService } from './hash.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { LocalStrategy } from 'src/auth/strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';

@Module({
  imports: [
    /**additionally import  schemas  */
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '60d',
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    AuthService,
    UserService,
    HashService,
    JwtStrategy,
    LocalStrategy,
  ],
})
export class UserModule {}
