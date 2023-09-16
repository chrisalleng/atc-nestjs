import { Injectable } from '@nestjs/common';
import { UpdateService } from './models/update/update.service';

@Injectable()
export class AppService {
  constructor(
    private readonly updateService: UpdateService,
) {}

onApplicationBootstrap() {
  this.listfortressUpdate();
}

  getHello(): string {
    return 'Hello World!';
  }

  listfortressUpdate() {
    console.log("Updating from Listfortress")
    this.updateService.listfortressUpdate();
  }
  
}
