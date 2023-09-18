import { Injectable } from '@nestjs/common';
import { UpdateService } from './models/update/update.service';
import { XWSFactionService } from './models/xwsFaction/xwsFaction.service';
import { XWSPilotService } from './models/xwsPilot/xwsPilot.service';

@Injectable()
export class AppService {
  constructor(
    private readonly updateService: UpdateService,
    private readonly xwsFactionService: XWSFactionService,
    private readonly xwsPilotService: XWSPilotService
) {}

onApplicationBootstrap() {
  this.loadXWS();
  // this.listfortressUpdate();
}

  getHello(): string {
    return 'Hello World!';
  }

  loadXWS() {
    console.log("Updating XWS database entries");
    this.xwsFactionService.loadFactions();
    this.xwsPilotService.loadPilots();
    console.log("Done updating XWS")
  }

  async listfortressUpdate() {
    console.log("Updating from Listfortress");
    await this.updateService.listfortressUpdate();
  }
  
}
