import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Update } from './update.entity';
import { Repository } from 'typeorm';
import { filter } from 'rxjs';

@Injectable()
export class UpdateService {
    constructor(
        @InjectRepository(Update)
        private readonly updateRepository: Repository<Update>,
    ) {}

    getAll(): Promise<Update[]> {
        return this.updateRepository.find();
    }

    async getLatest(): Promise<Update> {
        var test = (await this.updateRepository.find()).filter(
            (function (update) {
                return update.isActive === true;
            })
        )
        return test[0];
    }

    async createNew() {
        //TODO move to  custom repository (https://orkhan.gitbook.io/typeorm/docs/custom-repository) so can filter to single pull from database vs in memory
        const currentActive = await this.updateRepository.findOne({where: {isActive: true}});
        if (currentActive != null) {
            this.updateRepository.save(
                {
                    id: currentActive.id,
                    isActive: false,
                }
            )
        }
        const update = new Update();
        return this.updateRepository.save(update);
    }


}