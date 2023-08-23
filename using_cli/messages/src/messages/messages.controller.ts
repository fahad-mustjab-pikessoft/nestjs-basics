import { Body, Controller, Get,Param,Post,NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessageService } from 'src/messages.services';

@Controller('messages')
export class MessagesController {
    

    constructor(public messageService: MessageService){
        
    }

    @Get()
    listMessages(){
        return this.messageService.findAll();
    }
    @Post()
    createMessage(@Body() body:CreateMessageDto){
        return this.messageService.create(body.content);
    }
    @Get('/:id')
    async getMessage(@Param('id') id: string){
        const message =  await this.messageService.findOne(id);
        if(!message){
            throw new NotFoundException("Message Not Found");
        }
        return message;
    }

}
