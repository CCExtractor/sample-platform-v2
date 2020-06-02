import { Injectable } from '@nestjs/common';
import { Message } from '@new-sample-platform/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
