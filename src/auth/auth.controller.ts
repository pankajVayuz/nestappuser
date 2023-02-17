import { AuthService } from './auth.service';
import { Controller, Request, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Login')
@ApiSecurity('JWT-auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    console.log("login called...");
    return this.authService.login(req.user);
  }
}
