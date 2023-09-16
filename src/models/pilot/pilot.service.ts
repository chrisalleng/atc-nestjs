import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pilot } from './pilot.entity';
import { Between, Repository } from 'typeorm';
import { Tournament } from '../tournament/tournament.entity';
import { Player } from '../player/player.entity';
import { Upgrade } from '../upgrade/upgrade.entity';
import { ListfortressPilot } from '../listfortress/listfortressPilot';
import { UpgradeService } from '../upgrade/upgrade.service';

@Injectable()
export class PilotService {
    constructor(
        @InjectRepository(Pilot)
        private readonly playerRepository: Repository<Pilot>,
        private readonly upgradeService: UpgradeService
    ) {}

    getAll(): Promise<Pilot[]> {
        return this.playerRepository.find()
    }

    findOne(params: any): Promise<Pilot|null>{
        console.log("Received request for pilot id: " + params.id)
        return this.playerRepository.findOne( {
            where: [
                {id: params.id}
            ],
        })
    }

    // var item: {[key: string]: number} 
    // {[key: string]: string}[]

    createNew(inputPilot: ListfortressPilot): Pilot {
        var pilot = new Pilot();
        
        pilot.xws = inputPilot.id;
        pilot.xws ??= "unknown";
        pilot.ship = inputPilot.ship;

        if(inputPilot.upgrades) {
            pilot.upgrades = new Array();
            for(const upgradeType in inputPilot.upgrades) {
                let upgrades = inputPilot.upgrades[upgradeType];
                upgrades.map(
                    upgrade => pilot.upgrades.push(this.upgradeService.createNew(upgrade))
                )
            }
        }

        //TODO upgrades

        return pilot;
    }

}