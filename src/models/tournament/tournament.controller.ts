import { Controller, Get , Req, Post} from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { Tournament } from './tournament.entity';

@Controller('tournament')
export class TournamentController {
    constructor(
        private readonly tournamentService: TournamentService
    ) {}

    @Get()
    getAll() {
        return this.tournamentService.getAll()
    }
}