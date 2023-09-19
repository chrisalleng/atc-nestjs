import { Controller, Get , Req, Post, Param} from '@nestjs/common';
import { XWSShipService } from './xwsShip.service';

@Controller('xwsship')
export class XWSShipController {
    constructor(
        private readonly xwsShipService: XWSShipService
    ) {}

    @Get()
    getAll() {
        return this.xwsShipService.getAll()
    }

    @Get(':xws')
    findOne(@Param() xws: string, faction: string) {
        return this.xwsShipService.findOne(xws, faction)
    }
}