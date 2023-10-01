import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pilot } from './pilot.entity';
import { PilotService } from './pilot.service';
import { PilotController } from './pilot.controller';
import { UpgradeModule } from '../upgrade/upgrade.module';
import { XWSPilotModule } from '../xwsPilot/xwsPilot.module';
import { XWSUpgradeModule } from '../xwsUpgrade/xwsUpgrade.module';

@Module({
    exports: [PilotService],
    imports: [TypeOrmModule.forFeature([Pilot]), UpgradeModule, XWSPilotModule, XWSUpgradeModule],
    providers: [PilotService],
    controllers: [PilotController]
})
export class PilotModule {}