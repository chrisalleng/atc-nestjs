import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { PlayerModule } from '../player/player.module';

@Module({
    exports: [MatchService],
    imports: [TypeOrmModule.forFeature([Match]), PlayerModule],
    providers: [MatchService],
    controllers: [MatchController]
})
export class MatchModule {}