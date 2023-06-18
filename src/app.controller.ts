import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateService } from './models/update/update.service';

@Controller()
export class AppController {
  constructor(
    private readonly updateService: UpdateService,
    private readonly appService: AppService
    ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

}


