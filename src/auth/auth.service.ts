import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/user/hash.service';
import { UserService } from 'src/user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const loginUser = await this.userService.getUserByUsername(email);
    console.log("Log in user ...",loginUser)
    if (loginUser && (await this.hashService.comparePassword(pass, loginUser.password))) {
      return loginUser;
    }
   
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.email,
      sub: user.id,
    };
    return {
      access_token:this.jwtService.sign(payload),
    };
  }
}
