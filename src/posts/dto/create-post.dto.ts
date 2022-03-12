import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  title: string;

  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  body: string;

  userId: number;
}
