import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserQueryDto } from './dto/query.dto';
import { isEmpty } from '../utils';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesAllowed } from '../auth/decorators/roles.decorator';
import { Roles } from '../auth/constants';
import { RoleBasedGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Me } from 'src/auth/guards/current-user.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveImageToStorage } from '../helpers/image-storage';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  upload(@UploadedFile() file: Express.Multer.File, @Request() req) {
    if (!file) {
      throw new BadRequestException('File is not an image');
    }

    const user = req.user;

    return this.usersService.update(user.id, { image: file.filename });
  }

  @Get()
  @RolesAllowed(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RoleBasedGuard)
  findAll(@Query() query: UserQueryDto) {
    return this.usersService.findAll(isEmpty(query) ? null : query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
