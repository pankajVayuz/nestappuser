import { Controller, HttpStatus, Body, Post, Res, Param ,Put,Get, UseGuards} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserService } from './user.service';
import {AuthGuard} from '@nestjs/passport';

/** create defaule route path */
@Controller('user')
export class UserController {
    /**UserController cunstructor paramiter is user service */
    constructor(private userService: UserService) { }
    /** define add user path */
    @Post('/add')
        /**handle create user request  and response   */
    async createUser( @Res() response, @Body() createUserDto: CreateUserDto) {
        try {
            /**call createUser and and store response in newUser variable */
            const newUser = await this.userService.createUser(createUserDto);
            /**return response and status message  */
           return response.status(HttpStatus.CREATED).json({ message: 'user has been created sucessfully', newUser, });
        } catch (error) {
            /**return error response  and status */
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: "Error: Student not Created!",
                error: "Bad Request"
            })
        }
    }  
    /** define update user path and id is daynemic*/
    @Put('/update/:id')
    async updateUser(@Res()
        /** @Param use for get daynamic id in url */
    response, @Param('id') userId: string,
        @Body() updateUserDto: UpdateUserDto) {
        try {
            /**call update user and store response in existingUser variable */
            const existingUser = await this.userService.updateUser(userId, updateUserDto);
            /**return success response with status and message */
            return response.status(HttpStatus.OK).json({ message: 'User has been successfully updated', existingUser });
        } catch (error) {
            /**return error response and status message */
            return response.status(error.status).json(error.response);
        }
    }

    @Get()
async getUser(@Res() response) {
        try {
    /** call getAllUser functon and store data in userData and return */
  const userData = await this.userService.getAllUser();
  return response.status(HttpStatus.OK).json({
  message: 'All user data found successfully',userData,});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('username')
    getUserByUsername(@Param() param) {
      return this.userService.getUserByUsername(param.username);
    }

    
}
