import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pilot } from './pilot.entity';
import { PilotService } from './pilot.service';
import { PilotController } from './pilot.controller';

@Module({
    exports: [PilotService],
    imports: [TypeOrmModule.forFeature([Pilot])],
    providers: [PilotService],
    controllers: [PilotController]
})
export class PilotModule {}