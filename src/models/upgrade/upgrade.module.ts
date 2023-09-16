import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Upgrade } from './upgrade.entity';
import { UpgradeService } from './upgrade.service';
import { UpgradeController } from './upgrade.controller';

@Module({
    exports: [UpgradeService],
    imports: [TypeOrmModule.forFeature([Upgrade])],
    providers: [UpgradeService],
    controllers: [UpgradeController]
})
export class UpgradeModule {}