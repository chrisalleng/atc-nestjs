import { Controller, Get , Req, Post, Param} from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
    constructor(
        private readonly matchService: MatchService
    ) {}

    @Get()
    getAll() {
        return this.matchService.getAll()
    }

    @Get(':id')
    findOne(@Param() params: any) {
        return this.matchService.findOne(params)
    }
}