import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XWSFactionService } from './xwsFaction.service';
import { XWSFaction } from './xwsFaction.entity';
import { XWSFactionController } from './xwsFaction.controller';

@Module({
    exports: [XWSFactionService],
    imports: [TypeOrmModule.forFeature([XWSFaction])],
    providers: [XWSFactionService],
    controllers: [XWSFactionController]
})
export class XWSFactionModule {}