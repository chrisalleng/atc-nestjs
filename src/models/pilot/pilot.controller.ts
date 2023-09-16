import { Controller, Get , Req, Post, Param} from '@nestjs/common';
import { PilotService } from './pilot.service';

@Controller('pilot')
export class PilotController {
    constructor(
        private readonly pilotService: PilotService
    ) {}

    @Get()
    getAll() {
        return this.pilotService.getAll()
    }

    @Get(':pilot_id')
    findOne(@Param() params: any) {
        return this.pilotService.findOne(params)
    }
}