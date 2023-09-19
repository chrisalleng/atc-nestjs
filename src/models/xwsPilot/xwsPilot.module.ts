import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XWSPilot } from './xwsPilot.entity';
import { XWSPilotController } from './xwsPilot.controller';
import { XWSPilotService } from './xwsPilot.service';
import { XWSFactionModule } from '../xwsFaction/xwsFaction.module';
import { XWSShipModule } from '../xwsShip/xwsShip.module';

@Module({
    exports: [XWSPilotService],
    imports: [TypeOrmModule.forFeature([XWSPilot]), XWSFactionModule, XWSShipModule],
    providers: [XWSPilotService],
    controllers: [XWSPilotController]
})
export class XWSPilotModule {}