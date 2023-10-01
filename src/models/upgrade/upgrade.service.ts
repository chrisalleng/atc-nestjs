import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Upgrade } from './upgrade.entity';
import { Between, Repository } from 'typeorm';
import { XWSUpgrade } from '../xwsUpgrade/xwsUpgrade.entity';
import { Pilot } from '../pilot/pilot.entity';

@Injectable()
export class UpgradeService {
    constructor(
        @InjectRepository(Upgrade)
        private readonly upgradeRepository: Repository<Upgrade>,
    ) {}

    getAll(): Promise<Upgrade[]> {
        return this.upgradeRepository.find()
    }

    findOne(params: any): Promise<Upgrade|null>{
        console.log("Received request for upgrade id: " + params.id)
        return this.upgradeRepository.findOne( {
            where: [
                {id: params.id}
            ],
        })
    }

    createNew(xwsUpgrade: XWSUpgrade): Upgrade {
        var upgrade = new Upgrade();
        upgrade.xws = xwsUpgrade;
        // upgrade.pilot = pilot;
        return upgrade;
        // this.upgradeRepository.save(upgrade);
    }
}