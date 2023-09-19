import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Player } from './player.entity';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PilotModule } from '../pilot/pilot.module';
import { XWSFactionModule } from '../xwsFaction/xwsFaction.module';
import { XWSPilotModule } from '../xwsPilot/xwsPilot.module';

@Module({
    exports: [PlayerService],
    imports: [TypeOrmModule.forFeature([Player]), PilotModule, XWSFactionModule, XWSPilotModule],
    providers: [PlayerService],
    controllers: [PlayerController]
})
export class PlayerModule {}