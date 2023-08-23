import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/dtos/user.dto';

@Controller('auth')
export class UsersController {
    constructor(private userServices: UsersService){

    }
    @Post('/signup')
    CreateUser(@Body() body: CreateUserDto){
        // console.log(body);
        this.userServices.create(body.email,body.password);
        
    }


    @Serialize(UserDto)
    @Get('/:id')
    findUser(@Param('id') id: string){
        console.log('Handler is running');
        return this.userServices.findOne(parseInt(id));
    }

    @Get()
    findAll(@Query('email') email:string){
        return this.userServices.find(email);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string){
        return this.userServices.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string  ,@Body() body: UpdateUserDto){
        this.userServices.update(parseInt(id),body);
    }
}
