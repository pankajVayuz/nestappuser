import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/user/hash.service';
import { Iuser } from 'src/user/interface/user.interface';
import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Iuser> {
    const user = await this.userService.getUserByUsername(email);
    if (user && (await this.hashService.comparePassword(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.email,
      id: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
