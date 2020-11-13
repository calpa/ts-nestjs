import { Injectable, NestMiddleware } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';

let app;
const bootstrap = async (express: Express.Application) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(express));
  await app.init();
  return app;
}

@Injectable()
export class AppMiddleware implements NestMiddleware {

  constructor(private expressInstance: Express.Application) {}

  use(req: any, res: any, next: () => void) {
    console.log('In Nest middleware');
    if (!app) {
      console.log('app not found in AppMiddleware, so create a new app');
      app = bootstrap(this.expressInstance);
    }
    return app;
  }
}