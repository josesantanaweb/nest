import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRoleDto {
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  title: string;

  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  description: string;
}
