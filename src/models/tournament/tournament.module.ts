import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tournament } from './tournament.entity';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { HttpModule } from '@nestjs/axios';
import { PlayerModule } from '../player/player.module';
import { MatchModule } from '../match/match.module';

@Module({
    exports: [TournamentService],
    imports: [TypeOrmModule.forFeature([Tournament]), HttpModule, PlayerModule, MatchModule],
    providers: [TournamentService],
    controllers: [TournamentController]
})
export class TournamentModule {}