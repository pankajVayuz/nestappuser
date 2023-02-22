import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException({
        message: 'You have entered a worng username or passwordz',
      });
    }
    return user;
  }
}
