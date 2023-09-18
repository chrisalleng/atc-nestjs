import { Controller, Get , Req, Post, Param} from '@nestjs/common';
import { XWSPilotService } from './xwsPilot.service';

@Controller('xwspilot')
export class XWSPilotController {
    constructor(
        private readonly xwsPilotService: XWSPilotService
    ) {}

    @Get()
    getAll() {
        return this.xwsPilotService.getAll()
    }

    @Get(':xws')
    findOne(@Param() params: any) {
        return this.xwsPilotService.findOne(params)
    }
}