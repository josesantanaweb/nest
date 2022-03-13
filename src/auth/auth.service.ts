import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  private usersService: UsersService;
  constructor(private moduleRef: ModuleRef, private jwtService: JwtService) {}
  onModuleInit() {
    this.usersService = this.moduleRef.get(UsersService, { strict: false });
  }
  async validateUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);

    if (!user || user.password != password) {
      return false;
    }
    return user;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      roleId: user.roleId,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    const newUser = await this.usersService.create(user);
    return this.login(newUser);
  }
}
