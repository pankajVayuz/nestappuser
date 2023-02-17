import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MaxLength, IsNotEmpty } from 'class-validator';

/**create  create user dto class and validate for validator package */
export class CreateUserDto {
  @ApiProperty()
  @MaxLength(30)
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
