import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XWSShip } from './xwsShip.entity';
import { XWSFactionModule } from '../xwsFaction/xwsFaction.module';
import { XWSShipService } from './xwsShip.service';
import { XWSShipController } from './xwsShip.controller';

@Module({
    exports: [XWSShipService],
    imports: [TypeOrmModule.forFeature([XWSShip]), XWSFactionModule],
    providers: [XWSShipService],
    controllers: [XWSShipController]
})
export class XWSShipModule {}