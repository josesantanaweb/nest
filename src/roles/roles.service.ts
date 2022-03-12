import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}
  create(createRoleDto: CreateRoleDto) {
    return this.prismaService.role.create({ data: createRoleDto });
  }

  findAll() {
    return this.prismaService.role.findMany();
  }

  findOne(id: number) {
    return this.prismaService.role.findUnique({ where: { id } });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prismaService.role.update({
      data: updateRoleDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prismaService.role.delete({ where: { id } });
  }
}
