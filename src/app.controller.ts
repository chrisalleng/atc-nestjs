import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateService } from './models/update/update.service';
import { TournamentService } from './models/tournament/tournament.service';
import { PlayerService } from './models/player/player.service';
import { PilotService } from './models/pilot/pilot.service'

@Controller()
export class AppController {
  constructor(
    private readonly updateService: UpdateService,
    private readonly tournamentService: TournamentService,
    private readonly appService: AppService,
    private readonly playerService: PlayerService,
    private readonly pilotService: PilotService
    ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

}


