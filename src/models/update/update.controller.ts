import { Controller, Get, HttpException, HttpStatus} from '@nestjs/common';
import { UpdateService } from './update.service';

@Controller('update')
export class UpdateController {
    constructor(
        private readonly updateService: UpdateService
    ) {}

    @Get()
    getAll() {
        this.updateService.runRupdate();
        return this.updateService.getAll();
    }

    async create() {
        return this.updateService.createNew();
    }
}