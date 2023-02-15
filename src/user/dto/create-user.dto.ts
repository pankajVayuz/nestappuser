import { IsString ,IsEmail,MaxLength,IsNotEmpty,} from "class-validator";

 /**create  create user dto class and validate for validator package */
export class CreateUserDto{
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    username: string;


    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}