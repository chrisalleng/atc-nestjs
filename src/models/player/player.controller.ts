import { Controller, Get , Req, Post, Param} from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from './player.entity';

@Controller('player')
export class PlayerController {
    constructor(
        private readonly playerService: PlayerService
    ) {}

    @Get()
    getAll() {
        return this.playerService.getAll()
    }

    @Get(':id')
    findOne(@Param() params: any) {
        return this.playerService.findOne(params)
    }
}