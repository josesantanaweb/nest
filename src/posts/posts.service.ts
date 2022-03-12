import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    return this.prismaService.post.create({ data: createPostDto });
  }

  findAll(query?: Prisma.PostInclude) {
    return this.prismaService.post.findMany({ include: query });
  }

  findOne(id: number) {
    return this.prismaService.post.findUnique({ where: { id } });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prismaService.post.update({
      data: updatePostDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prismaService.post.delete({ where: { id } });
  }
}
