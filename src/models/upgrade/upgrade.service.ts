import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Upgrade } from './upgrade.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class UpgradeService {
    constructor(
        @InjectRepository(Upgrade)
        private readonly playerRepository: Repository<Upgrade>,
    ) {}

    getAll(): Promise<Upgrade[]> {
        return this.playerRepository.find()
    }

    findOne(params: any): Promise<Upgrade|null>{
        console.log("Received request for upgrade id: " + params.id)
        return this.playerRepository.findOne( {
            where: [
                {id: params.id}
            ],
        })
    }

    createNew(xws: string) {
        var upgrade = new Upgrade();
        upgrade.xws = xws;
        return upgrade;
    }
}