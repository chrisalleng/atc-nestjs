import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pilot } from './pilot.entity';
import { Between, Repository } from 'typeorm';
import { UpgradeService } from '../upgrade/upgrade.service';
import { ListfortressPilot } from '../../interfaces/listfortressInterfaces';
import { XWSPilotService } from '../xwsPilot/xwsPilot.service';
import { XWSPilot } from '../xwsPilot/xwsPilot.entity';
import { XWSUpgradeService } from '../xwsUpgrade/xwsUpgrade.service';
import { parse } from 'path';
import { Player } from '../player/player.entity';

@Injectable()
export class PilotService {
    constructor(
        @InjectRepository(Pilot)
        private readonly pilotRepository: Repository<Pilot>,
        private readonly upgradeService: UpgradeService,
        private readonly xwsPilotService: XWSPilotService,
        private readonly xwsUpgradeService: XWSUpgradeService
    ) {}

    getAll(): Promise<Pilot[]> {
        return this.pilotRepository.find()
    }

    findOne(params: any): Promise<Pilot|null>{
        // console.log("Received request for pilot id: " + params.id)
        return this.pilotRepository.findOne( {
            where: [
                {id: params.id}
            ],
        })
    }

    async createNew(inputPilot: ListfortressPilot, xws: XWSPilot, player: Player): Promise<Pilot> {
        // console.log("Started saving pilot " + xws.xws + "for player " + player.id);
        var pilot = new Pilot();
        pilot.xwsPilot = xws;
        pilot.player = player;

        if(inputPilot.upgrades && xws.standardLoadout == false) {
            let pilotUpgrades = new Array();
            pilot.upgrades = new Array();
            for(const upgradeType in inputPilot.upgrades) {
                if(!upgradeType.startsWith('hardpoint')){
                    pilotUpgrades.push(upgradeType);
                }
            }
            await Promise.all(pilotUpgrades.map(
                async upgradeType => {
                    let upgrades = inputPilot.upgrades[upgradeType];
                    await Promise.all(upgrades.map(
                        async upgrade => {
                            let parsedXWS = await this.xwsUpgradeService.findOne(upgrade) ?? this.xwsUpgradeService.unknownUpgrade;
                            if (parsedXWS.xws != this.xwsUpgradeService.unknownUpgrade.xws) {
                                pilot.upgrades.push(this.upgradeService.createNew(parsedXWS));
                                // console.info("Saving upgrade xws: " + upgrade + " for player " + player.id + " for pilot " + xws.xws);
                            } else {
                                console.error("Error parsing upgrade xws: " + upgrade);
                            }
                        }
                    ))
                }
            ))
        }
        // console.log("Done saving pilot " + xws.xws + " for player " + player.id);
        return pilot;
    }

}