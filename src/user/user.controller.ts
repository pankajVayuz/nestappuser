import {
  Controller,
  HttpStatus,
  Body,
  Post,
  Res,
  Param,
  Put,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

/** create defaule route path */
@Controller('user')
@ApiTags('User')
export class UserController {
  /**UserController cunstructor paramiter is user service */
  constructor(private userService: UserService) {}
  /** define add user path */
  @Post('/add')

  /**handle create user request  and response   */
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    /**call createUser and and store response in newUser variable */
    const newUser = await this.userService.createUser(createUserDto);
    /**return response and status message  */
    return response
      .status(HttpStatus.CREATED)
      .json({ message: 'user has been created sucessfully', newUser });
  }
  /** define update user path and id is daynemic*/
  @Put('/update/:id')
  async updateUser(
    @Res()
    /** @Param use for get daynamic id in url */
    response,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    /**call update user and store response in existingUser variable */
    const existingUser = await this.userService.updateUser(
      userId,
      updateUserDto,
    );
    /**return success response with status and message */
    return response
      .status(HttpStatus.OK)
      .json({ message: 'User has been successfully updated', existingUser });
  }

  @Get()
  async getUser(@Res() response) {
    /** call getAllUser functon and store data in userData and return */
    const userData = await this.userService.getAllUser();
    return response.status(HttpStatus.OK).json({
      message: 'All user data found successfully',
      userData,
    });
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('username')
  getUserByUsername(@Param() param) {
    return this.userService.getUserByUsername(param.username);
  }
}
