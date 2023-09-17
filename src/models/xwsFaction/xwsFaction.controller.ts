import { Controller, Get , Req, Post, Param} from '@nestjs/common';
import { XWSFactionService } from './xwsFaction.service';

@Controller('xwsfaction')
export class XWSFactionController {
    constructor(
        private readonly xwsFactionService: XWSFactionService
    ) {}

    @Get()
    getAll() {
        return this.xwsFactionService.getAll()
    }

    @Get(':xws')
    findOne(@Param() params: any) {
        return this.xwsFactionService.findOne(params)
    }
}