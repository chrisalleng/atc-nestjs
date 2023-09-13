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

    search(searchFormat: number, startDate: Date, endDate: Date) {
        return this.tournamentService.search(searchFormat, startDate, endDate)
    }

    async create(tournament: Tournament) {
        // return this.tournamentService.createNew(tournament)
    }
}