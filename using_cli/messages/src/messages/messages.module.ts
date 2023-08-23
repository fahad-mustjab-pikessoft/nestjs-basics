import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessageService } from 'src/messages.services';
import { MessageRepository } from 'src/messages.repository';

@Module({
  controllers: [MessagesController],
  providers: [MessageService,MessageRepository]
})
export class MessagesModule {}
