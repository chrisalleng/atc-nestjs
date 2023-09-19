import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { XWSShipSchema } from '../../interfaces/xwsInterfaces'

import { XWSFactionService } from '../xwsFaction/xwsFaction.service';
import { XWSShip } from './xwsShip.entity';


@Injectable()
export class XWSShipService {
    constructor(
        @InjectRepository(XWSShip)
        private readonly xwsShipRepository: Repository<XWSShip>,
        private readonly xwsFactionService: XWSFactionService
    ) {
    }

    getAll(): Promise<XWSShip[]> {
        return this.xwsShipRepository.find()
    }

    async findOne(xwsSearch: string, xwsFaction: string): Promise<XWSShip|null>{
        let foundFaction = await this.xwsFactionService.findOne(xwsFaction) ?? this.xwsFactionService.unknownFaction;
        return this.xwsShipRepository.findOne({
            where: [
                {xws: xwsSearch, faction: foundFaction
                }
            ],
        });
    }

    async save(inputShip: XWSShipSchema, inputFaction: string) {
        let ship = new XWSShip();
        ship.xws = inputShip.xws + "-" + inputFaction;
        ship.name = inputShip.name;
        ship.size = inputShip.size;
        ship.icon = inputShip.icon ?? "";

        ship.faction = await this.xwsFactionService.findOne(inputFaction) ?? this.xwsFactionService.unknownFaction;
        console.log("Saving " + ship.xws);
        return this.xwsShipRepository.save(ship);
    }
}