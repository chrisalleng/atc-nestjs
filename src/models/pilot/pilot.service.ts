import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pilot } from './pilot.entity';
import { Between, Repository } from 'typeorm';
import { UpgradeService } from '../upgrade/upgrade.service';
import { ListfortressPilot } from '../../interfaces/listfortressInterfaces';
import { XWSPilotService } from '../xwsPilot/xwsPilot.service';
import { Player } from '../player/player.entity';
import { XWSPilot } from '../xwsPilot/xwsPilot.entity';

@Injectable()
export class PilotService {
    constructor(
        @InjectRepository(Pilot)
        private readonly pilotRepository: Repository<Pilot>,
        private readonly upgradeService: UpgradeService,
        private readonly xwsPilotService: XWSPilotService
    ) {}

    getAll(): Promise<Pilot[]> {
        return this.pilotRepository.find()
    }

    findOne(params: any): Promise<Pilot|null>{
        console.log("Received request for pilot id: " + params.id)
        return this.pilotRepository.findOne( {
            where: [
                {id: params.id}
            ],
        })
    }

    createNew(inputPilot: ListfortressPilot, xws: XWSPilot): Pilot {
        var pilot = new Pilot();
        pilot.xwsPilot = xws;

        if(inputPilot.upgrades) {
            pilot.upgrades = new Array();
            for(const upgradeType in inputPilot.upgrades) {
                let upgrades = inputPilot.upgrades[upgradeType];
                upgrades.map(
                    upgrade => pilot.upgrades.push(this.upgradeService.createNew(upgrade))
                )
            }
        }

        return pilot;
    }

}