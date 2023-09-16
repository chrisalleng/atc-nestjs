import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pilot } from './pilot.entity';
import { PilotService } from './pilot.service';
import { PilotController } from './pilot.controller';
import { UpgradeModule } from '../upgrade/upgrade.module';

@Module({
    exports: [PilotService],
    imports: [TypeOrmModule.forFeature([Pilot]), UpgradeModule],
    providers: [PilotService],
    controllers: [PilotController]
})
export class PilotModule {}