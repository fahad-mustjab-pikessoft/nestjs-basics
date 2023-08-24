import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/dtos/user.dto';
import { AuthService } from './auth.services';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)

export class UsersController {
    constructor(private userServices: UsersService,private authService: AuthService){

    }


  
    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User){
        return user;
    }

   
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto,@Session() session: any){
        // console.log(body);
        // this.userServices.create(body.email,body.password);
        const user = await this.authService.signup(body.email,body.password);
        session.userId = user.id;
        return user;
        
    }

    @Post('/signout')
    signOut(@Session() session: any){
        session.userId = null;
    }


    @Post('/signin')
    async signUser(@Body() body: CreateUserDto,@Session() session: any){
        // console.log(body);
        // this.userServices.create(body.email,body.password);

        const user = await this.authService.signin(body.email,body.password);
        session.userId = user.id;
        return user;
        
    }


    





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
