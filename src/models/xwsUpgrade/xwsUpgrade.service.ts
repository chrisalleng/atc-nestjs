import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { XWSUpgrade } from './xwsUpgrade.entity';
import { XWSUpgradeSchema } from '../../interfaces/xwsInterfaces'

import {default as astromech } from '../../submodules/xwing-data2/data/upgrades/astromech.json'
import {default as cannon } from '../../submodules/xwing-data2/data/upgrades/cannon.json'
import {default as configuration } from '../../submodules/xwing-data2/data/upgrades/configuration.json'
import {default as crew } from '../../submodules/xwing-data2/data/upgrades/crew.json'
import {default as device } from '../../submodules/xwing-data2/data/upgrades/device.json'
import {default as forcepower } from '../../submodules/xwing-data2/data/upgrades/force-power.json'
import {default as gunner } from '../../submodules/xwing-data2/data/upgrades/gunner.json'
import {default as illicit } from '../../submodules/xwing-data2/data/upgrades/illicit.json'
import {default as missile } from '../../submodules/xwing-data2/data/upgrades/missile.json'
import {default as modification } from '../../submodules/xwing-data2/data/upgrades/modification.json'
import {default as sensor } from '../../submodules/xwing-data2/data/upgrades/sensor.json'
import {default as tacticalrelay } from '../../submodules/xwing-data2/data/upgrades/tactical-relay.json'
import {default as talent } from '../../submodules/xwing-data2/data/upgrades/talent.json'
import {default as tech } from '../../submodules/xwing-data2/data/upgrades/tech.json'
import {default as title } from '../../submodules/xwing-data2/data/upgrades/title.json'
import {default as torpedo } from '../../submodules/xwing-data2/data/upgrades/torpedo.json'
import {default as turret } from '../../submodules/xwing-data2/data/upgrades/turret.json'


@Injectable()
export class XWSUpgradeService {
    constructor(
        @InjectRepository(XWSUpgrade)
        private readonly xwsUpgradeRepository: Repository<XWSUpgrade>
    ) {
        this.unknownUpgrade = new XWSUpgrade();
        this.unknownUpgrade.xws = "unknown";
        this.unknownUpgrade.name = "Unknown Upgrade";
        this.unknownUpgrade.slots = ["unknowntype"];
        this.unknownUpgrade.cost = 0;
        this.unknownUpgrade.artwork = "";
        this.unknownUpgrade.image = "";
        this.unknownUpgrade.standard = false;
    }

    public unknownUpgrade: XWSUpgrade;

    getAll(): Promise<XWSUpgrade[]> {
        return this.xwsUpgradeRepository.find()
    }

    findOne(params: any): Promise<XWSUpgrade|null>{
        return this.xwsUpgradeRepository.findOne({
            where: [
                {xws: params}
            ],
        });
    }

    loadUpgrades() {
        let upgradeTypes = [astromech, cannon, configuration, crew, device, forcepower, gunner, illicit, missile,  modification,
        sensor, tacticalrelay, talent, tech, title, torpedo, turret] as unknown[];

        return Promise.all(upgradeTypes.map(
            type => {
                let parsedType = type as XWSUpgradeSchema[];
                parsedType.map(
                    upgrade => {
                        if (!("standardLoadoutOnly" in upgrade)) {
                            this.save(upgrade)
                        }
                        
                    }
                )
            }
        ));
    }

    async save(upgrade: XWSUpgradeSchema) {
        this.unknownUpgrade.artwork = "";
        this.unknownUpgrade.image = "";
        this.unknownUpgrade.standard = false;

        let saveUpgrade = new XWSUpgrade();
        saveUpgrade.xws = upgrade.xws;
        saveUpgrade.name = upgrade.name;
        if ("cost" in upgrade) {
            saveUpgrade.cost = upgrade.cost.value;
        } else {
            saveUpgrade.cost = 0;
        }
        saveUpgrade.slots = upgrade.sides[0].slots;
        saveUpgrade.artwork = upgrade.sides[0].artwork;
        saveUpgrade.image = upgrade.sides[0].image;
        saveUpgrade.standard = upgrade.standard;

        return this.xwsUpgradeRepository.save(saveUpgrade);
    }
}