import { Controller, Get , Req, Post, Param} from '@nestjs/common';
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

    @Get(':id')
    findOne(@Param() params: any) {
        return this.tournamentService.findOne(params)
    }
}