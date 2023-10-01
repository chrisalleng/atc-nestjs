import { Controller, Get , Req, Post, Param} from '@nestjs/common';
import { XWSUpgradeService } from './xwsUpgrade.service';

@Controller('xwsupgrade')
export class XWSUpgradeController {
    constructor(
        private readonly xwsUpgradeService: XWSUpgradeService
    ) {}

    @Get()
    getAll() {
        return this.xwsUpgradeService.getAll()
    }

    @Get(':xws')
    findOne(@Param() params: any) {
        return this.xwsUpgradeService.findOne(params)
    }
}