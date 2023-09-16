import { Controller, Get , Req, Post, Param} from '@nestjs/common';
import { UpgradeService } from './upgrade.service';

@Controller('upgrade')
export class UpgradeController {
    constructor(
        private readonly upgradeService: UpgradeService
    ) {}

    @Get()
    getAll() {
        return this.upgradeService.getAll()
    }

    @Get(':id')
    findOne(@Param() params: any) {
        return this.upgradeService.findOne(params)
    }
}