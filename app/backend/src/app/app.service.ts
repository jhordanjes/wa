import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Go to http://localhost:3001/graphql';
  }
}
