import { Injectable,NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { Iuser } from 'src/user/interface/user.interface';
import { User } from 'src/user/schemas/users.schema';
import { HashService } from './hash.service';
/**creates an instance */
@Injectable()
    /**create user servise  class and export */
export class UserService {
    /** inject user schema modele  and  maped interface to mongoose model */
    constructor(@InjectModel(User.name) private userModel: Model<Iuser>, private hashService: HashService) { }
    
    
  async getUserByUsername(username: string) {
    return this.userModel.findOne({
        username
      })
      .exec();
  }
    
    /**create async create user function */
    /**createuser paramiter is createUserDto  for validation  and createUser type is Iuser type  */
    async createUser(createUserDto: CreateUserDto): Promise<Iuser> {
        const newUser = await new this.userModel(createUserDto);

        const user = await this.getUserByUsername(newUser.username);
        if (user) {
            throw new BadRequestException();
        }
        // Hash Password  
        newUser.password = await this.hashService.hashPassword(newUser.password)
        return newUser.save();
    }

    /**create async update user function */
    /**updateuser  paramiter is updateUserDto  for validation  and updateUser type is Iuser type  */
    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<Iuser>{
        const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto);
        if (!existingUser) {
            throw new NotFoundException(`User #${userId} not found`);
        }
        return existingUser;
    }
 
    /**create async getAllUser function */
    /** getAllUser type is Iuser[] type  */
    async getAllUser(): Promise<Iuser[]> {
        const userData = await this.userModel.find();
        if (!userData || userData.length == 0) {
            throw new NotFoundException('user data not found!');
        }
        return userData;
    }
}
