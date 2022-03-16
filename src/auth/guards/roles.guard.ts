import {
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../constants';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
  ) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const checkUserRole = this.userService
      .findOne(user.id)
      .then(function (user) {
        return requiredRoles.some((role) => user.role.title.includes(role));
      });
    return checkUserRole;
  }
}
