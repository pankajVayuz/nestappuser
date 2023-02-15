import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from 'src/auth/strategy/local.strategy';
import { HashService } from 'src/user/hash.service';
import { jwtConstants } from 'src/auth/strategy/constants';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
      
        ConfigModule.forRoot(),
    PassportModule.register({ session:true}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret:`lucky`,
      signOptions: {
        expiresIn: '60d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, HashService],
})
export class AuthModule {}
