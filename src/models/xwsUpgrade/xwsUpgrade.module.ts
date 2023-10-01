import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XWSUpgrade } from './xwsUpgrade.entity';
import { XWSUpgradeService } from './xwsUpgrade.service';
import { XWSUpgradeController } from './xwsUpgrade.controller';

@Module({
    exports: [XWSUpgradeService],
    imports: [TypeOrmModule.forFeature([XWSUpgrade])],
    providers: [XWSUpgradeService],
    controllers: [XWSUpgradeController]
})
export class XWSUpgradeModule {}