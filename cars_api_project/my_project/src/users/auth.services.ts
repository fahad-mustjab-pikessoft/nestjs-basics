import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes } from "crypto";
import { scrypt  as _scrypt} from "crypto";
import { promisify } from "util";

const scrypt  = promisify(_scrypt);

@Injectable() 
export class AuthService{
    constructor(private userService: UsersService){

    }

    async signup(email: string,password:string){
        const users = await this.userService.find(email);
        if(users.length){
            throw new BadRequestException("Email already in use");
        }
        //Salting 
        const salt = randomBytes(8).toString('hex');
        
        // hash 
        const hash = (await scrypt(password,salt,32)) as Buffer;

        //saltify the hash and store it in result
        const result = salt + '.' + hash.toString('hex');

        console.log(result.toString());

        const user = await this.userService.create(email,result);

        return user;


    }

    async signin(email: string,password: string){
        
        //find the user and remove it from the list
        const [user] = await this.userService.find(email);

        if(!user){
            throw new BadRequestException("The user doesn't exist");
        }

        const [salt,storedHash ] = user.password.split('.');

        const hash = (await scrypt(password,salt,32)) as Buffer;

        if(hash.toString('hex') != storedHash){
            throw new BadRequestException("Password doesn't match");
        }
        return user;


    }
}