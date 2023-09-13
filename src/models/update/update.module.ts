import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Update } from './update.entity';
import { UpdateService } from './update.service';
import { UpdateController } from './update.controller';
import { HttpModule } from '@nestjs/axios';
import { TournamentModule } from '../tournament/tournament.module';

@Module({
    exports: [UpdateService],
    imports: [TypeOrmModule.forFeature([Update]), HttpModule, TournamentModule],
    providers: [UpdateService],
    controllers: [UpdateController],
})
export class UpdateModule {}