import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { XWSFaction } from './xwsFaction.entity';
import { default as factions } from '../../submodules/xwing-data2/data/factions/factions.json'

@Injectable()
export class XWSFactionService {
    constructor(
        @InjectRepository(XWSFaction)
        private readonly xwsFactionRepository: Repository<XWSFaction>
    ) {
        this.unknownFaction = new XWSFaction();
        this.unknownFaction.name = "Unknown Faction";
        this.unknownFaction.xws = "unknown";
        this.unknownFaction.icon = "";
    }

    public unknownFaction: XWSFaction;

    getAll(): Promise<XWSFaction[]> {
        return this.xwsFactionRepository.find()
    }

    findOne(params: any): Promise<XWSFaction|null>{
        return this.xwsFactionRepository.findOne({
            where: [
                {xws: params}
            ],
        });
    }

    loadFactions() {
        for (const key in factions) {
            this.save(factions[key].xws, factions[key].name, factions[key].icon);
        }
        return this.save(this.unknownFaction.xws, this.unknownFaction.name, this.unknownFaction.icon).then(
            log => console.log("Done loading XWS Factions")
        );
    }

    save(xws: string, name: string, icon: string) {
        var faction = new XWSFaction();
        faction.xws = xws;
        faction.name = name;
        faction.icon = icon;
        return this.xwsFactionRepository.save(faction);
    }
}