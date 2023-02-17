import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

 /** Create update user dto using partialType  
  * copy of  create user dto file
  */


export class UpdateUserDto extends PartialType(CreateUserDto){}