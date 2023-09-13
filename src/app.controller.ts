import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateService } from './models/update/update.service';
import { TournamentService } from './models/tournament/tournament.service';

@Controller()
export class AppController {
  constructor(
    private readonly updateService: UpdateService,
    private readonly tournamentService: TournamentService,
    private readonly appService: AppService
    ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

}


