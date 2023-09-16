import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Player } from './player.entity';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PilotModule } from '../pilot/pilot.module';

@Module({
    exports: [PlayerService],
    imports: [TypeOrmModule.forFeature([Player]), PilotModule],
    providers: [PlayerService],
    controllers: [PlayerController]
})
export class PlayerModule {}