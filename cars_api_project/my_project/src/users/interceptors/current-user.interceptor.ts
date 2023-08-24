import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Session } from '@nestjs/common';
import { UsersService } from "../users.service";
import { Observable } from "rxjs";
import * as request from 'supertest';
import { CurrentUser } from '../../decorators/current-user.decorator';


@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{
    constructor(private userService: UsersService){

    }
    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const request = context.switchToHttp().getRequest();
        const {userId} = request.session || {};

        if(userId){
            const user = await this.userService.findOne(userId);
            request.currentUser = user;
        }
        return next.handle();
    }
}