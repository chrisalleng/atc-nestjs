import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XWSPilot } from './xwsPilot.entity';
import { XWSPilotController } from './xwsPilot.controller';
import { XWSPilotService } from './xwsPilot.service';

@Module({
    exports: [XWSPilotService],
    imports: [TypeOrmModule.forFeature([XWSPilot])],
    providers: [XWSPilotService],
    controllers: [XWSPilotController]
})
export class XWSPilotModule {}