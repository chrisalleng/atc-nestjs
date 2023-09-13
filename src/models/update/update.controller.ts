import { Controller, Get, HttpException, HttpStatus, Param} from '@nestjs/common';
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

    @Get(':id')
    findOne(@Param() params: any) {
        return this.updateService.findOne(params)
    }
}