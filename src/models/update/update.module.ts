import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Update } from './update.entity';
import { UpdateService } from './update.service';
import { UpdateController } from './update.controller';

@Module({
    exports: [UpdateService],
    imports: [TypeOrmModule.forFeature([Update])],
    providers: [UpdateService],
    controllers: [UpdateController],
})
export class UpdateModule {}