import { Controller, Get , Req, Post} from '@nestjs/common';
import { UpdateService } from './update.service';

@Controller('update')
export class UpdateController {
    constructor(
        private readonly updateService: UpdateService
    ) {}

    @Get()
    getAll() {
        return this.updateService.getAll()
    }

    async create() {
        return this.updateService.createNew()
    }
}