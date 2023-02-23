import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger, UseFilters } from '@nestjs/common';
import { WebsocketsExceptionFilter } from './exceptionfilter/chat-exception.filter';

@WebSocketGateway({
  namespace: '/chat',
})
   /** for Exception hendaling */
@UseFilters(new WebsocketsExceptionFilter())
export class ChatGateway implements OnGatewayInit {
  /**create server */
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('chatToServer')
  handleMessage(
    client: Socket,
    message: { sender: string; room: string; message: string },
  ) {
    this.server.to(message.room).emit('chatToClient', message);
  }
}