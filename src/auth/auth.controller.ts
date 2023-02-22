import { AuthService } from './auth.service';
import { Controller, Request, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('Login')
@ApiSecurity('JWT-auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req, @Body() loginDto: LoginDto) {
    console.log('login called...');
    return this.authService.login(req.user);
  }
}
