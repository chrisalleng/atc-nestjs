import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { XWSPilot } from './xwsPilot.entity';
import { XWSPilotSchema, XWSShipSchema } from '../../interfaces/xwsInterfaces'

import { default as rebelB } from '../../submodules/xwing-data2/data/pilots/rebel-alliance/a-sf-01-b-wing.json'
import { default as rebelARC } from '../../submodules/xwing-data2/data/pilots/rebel-alliance/arc-170-starfighter.json'
import { default as rebelAttackShuttle } from '../../submodules/xwing-data2/data/pilots/rebel-alliance/attack-shuttle.json'
import { default as rebelAuzituck } from '../../submodules/xwing-data2/data/pilots/rebel-alliance/auzituck-gunship.json'
import { default as rebelY } from '../../submodules/xwing-data2/data/pilots/rebel-alliance/btl-a4-y-wing.json'
import { default as rebelK } from '../../submodules/xwing-data2/data/pilots/rebel-alliance/btl-s8-k-wing.json'
import { default as rebelE } from '../../submodules/xwing-data2/data/pilots/rebel-alliance/e-wing.json'
import { default as rebelFang } from '../../submodules/xwing-data2/data/pilots/rebel-alliance/fang-fighter.json'
import { default as rebelGauntlet } from '../../submodules/xwing-data2/data/pilots/rebel-alliance/gauntlet-fighter.json'
import { default as rebelHWK } from '../../submodules/xwing-data2/data/pilots/rebel-alliance/hwk-290-light-freighter.json'
import { default as rebelFalcon } from '../../submodules/xwing-data2/data/pilots/rebel-alliance/modified-yt-1300-light-freighter.json'
import { default as rebelA } from '../../submodules/xwing-data2/data/pilots/rebel-alliance/rz-1-a-wing.json'
import { default as rebelSheath } from '../../submodules/xwing-data2/data/pilots/rebel-alliance/sheathipede-class-shuttle.json'
import { default as rebelX } from '../../submodules/xwing-data2/data/pilots/rebel-alliance/t-65-x-wing.json'
import { default as rebelTIE } from '../../submodules/xwing-data2/data/pilots/rebel-alliance/tie-ln-fighter.json'
import { default as rebelU } from '../../submodules/xwing-data2/data/pilots/rebel-alliance/ut-60d-u-wing.json'
import { default as rebelGhost } from '../../submodules/xwing-data2/data/pilots/rebel-alliance/vcx-100-light-freighter.json'
import { default as rebelYT2400 } from '../../submodules/xwing-data2/data/pilots/rebel-alliance/yt-2400-light-freighter.json'
import { default as rebelZ } from '../../submodules/xwing-data2/data/pilots/rebel-alliance/z-95-af4-headhunter.json'

import { default as empireGunboat } from '../../submodules/xwing-data2/data/pilots/galactic-empire/alpha-class-star-wing.json'
import { default as empireGauntlet } from '../../submodules/xwing-data2/data/pilots/galactic-empire/gauntlet-fighter.json'
import { default as empireLambda } from '../../submodules/xwing-data2/data/pilots/galactic-empire/lambda-class-t-4a-shuttle.json'
import { default as empireTIEV1 } from '../../submodules/xwing-data2/data/pilots/galactic-empire/tie-advanced-v1.json'
import { default as empireTIEX1 } from '../../submodules/xwing-data2/data/pilots/galactic-empire/tie-advanced-x1.json'
import { default as empireInterceptor } from '../../submodules/xwing-data2/data/pilots/galactic-empire/tie-in-interceptor.json'
import { default as empireReaper } from '../../submodules/xwing-data2/data/pilots/galactic-empire/tie-reaper.json'
import { default as empireDefender } from '../../submodules/xwing-data2/data/pilots/galactic-empire/tie-d-defender.json'
import { default as empireAggressor } from '../../submodules/xwing-data2/data/pilots/galactic-empire/tie-ag-aggressor.json'
import { default as empirePunisher } from '../../submodules/xwing-data2/data/pilots/galactic-empire/tie-ca-punisher.json'
import { default as empireTIEFighter } from '../../submodules/xwing-data2/data/pilots/galactic-empire/tie-ln-fighter.json'
import { default as empirePhantom } from '../../submodules/xwing-data2/data/pilots/galactic-empire/tie-ph-phantom.json'
import { default as empireBomber } from '../../submodules/xwing-data2/data/pilots/galactic-empire/tie-sa-bomber.json'
import { default as empireStriker } from '../../submodules/xwing-data2/data/pilots/galactic-empire/tie-sk-striker.json'
import { default as empireDeci } from '../../submodules/xwing-data2/data/pilots/galactic-empire/vt-49-decimator.json'
import { default as empireTIEHeavy } from '../../submodules/xwing-data2/data/pilots/galactic-empire/tie-rb-heavy.json'

import { default as scumAggressor } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/aggressor-assault-fighter.json'
import { default as scumY } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/btl-a4-y-wing.json'
import { default as scumFalcon } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/customized-yt-1300-light-freighter.json'
import { default as scumEscape } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/escape-craft.json'
import { default as scumFang } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/fang-fighter.json'
import { default as scumFirespray } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/firespray-class-patrol-craft.json'
import { default as scumG1A } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/g-1a-starfighter.json'
import { default as scumGauntlet } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/gauntlet-fighter.json'
import { default as scumHWK } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/hwk-290-light-freighter.json'
import { default as scumJM5K } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/jumpmaster-5000.json'
import { default as scumKFighter } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/kihraxz-fighter.json'
import { default as scumLancer } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/lancer-class-pursuit-craft.json'
import { default as scumKimo } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/m12-l-kimogila-fighter.json'
import { default as scumM3A } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/m3-a-interceptor.json'
import { default as scumTIE } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/modified-tie-ln-fighter.json'
import { default as scumQuad } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/quadrijet-transfer-spacetug.json'
import { default as scumRogue } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/rogue-class-starfighter.json'
import { default as scumScurrg } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/scurrg-h-6-bomber.json'
import { default as scumRazorCrest } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/st-70-assault-ship.json'
import { default as scumStarviper } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/starviper-class-attack-platform.json'
import { default as scumYV } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/yv-666-light-freighter.json'
import { default as scumZ } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/z-95-af4-headhunter.json'
import { default as scumYT2400 } from '../../submodules/xwing-data2/data/pilots/scum-and-villainy/yt-2400-light-freighter.json'

import { default as resStarfortress } from '../../submodules/xwing-data2/data/pilots/resistance/mg-100-starfortress-sf-17.json'
import { default as resFalcon } from '../../submodules/xwing-data2/data/pilots/resistance/scavenged-yt-1300.json'
import { default as resA } from '../../submodules/xwing-data2/data/pilots/resistance/rz-2-a-wing.json'
import { default as resX } from '../../submodules/xwing-data2/data/pilots/resistance/t-70-x-wing.json'
import { default as resTransport } from '../../submodules/xwing-data2/data/pilots/resistance/resistance-transport.json'
import { default as resPod } from '../../submodules/xwing-data2/data/pilots/resistance/resistance-transport-pod.json'
import { default as resFireball } from '../../submodules/xwing-data2/data/pilots/resistance/fireball.json'
import { default as resY } from '../../submodules/xwing-data2/data/pilots/resistance/bta-nr2-y-wing.json'

import { default as foBA } from '../../submodules/xwing-data2/data/pilots/first-order/tie-ba-interceptor.json'
import { default as foFO } from '../../submodules/xwing-data2/data/pilots/first-order/tie-fo-fighter.json'
import { default as foSF } from '../../submodules/xwing-data2/data/pilots/first-order/tie-sf-fighter.json'
import { default as foVN } from '../../submodules/xwing-data2/data/pilots/first-order/tie-vn-silencer.json'
import { default as foUpsilon } from '../../submodules/xwing-data2/data/pilots/first-order/upsilon-class-command-shuttle.json'
import { default as foXi } from '../../submodules/xwing-data2/data/pilots/first-order/xi-class-light-shuttle.json'
import { default as foSE } from '../../submodules/xwing-data2/data/pilots/first-order/tie-se-bomber.json'
import { default as foWI } from '../../submodules/xwing-data2/data/pilots/first-order/tie-wi-whisper-modified-interceptor.json'

import { default as repARC } from '../../submodules/xwing-data2/data/pilots/galactic-republic/arc-170-starfighter.json'
import { default as repD7 } from '../../submodules/xwing-data2/data/pilots/galactic-republic/delta-7-aethersprite.json'
import { default as repD7B } from '../../submodules/xwing-data2/data/pilots/galactic-republic/delta-7b-aethersprite.json'
import { default as repTorrent } from '../../submodules/xwing-data2/data/pilots/galactic-republic/v-19-torrent-starfighter.json'
import { default as repN1 } from '../../submodules/xwing-data2/data/pilots/galactic-republic/naboo-royal-n-1-starfighter.json'
import { default as repY } from '../../submodules/xwing-data2/data/pilots/galactic-republic/btl-b-y-wing.json'
import { default as repETA } from '../../submodules/xwing-data2/data/pilots/galactic-republic/eta-2-actis.json'
import { default as repGauntlet } from '../../submodules/xwing-data2/data/pilots/galactic-republic/gauntlet-fighter.json'
import { default as repLAAT } from '../../submodules/xwing-data2/data/pilots/galactic-republic/laat-i-gunship.json'
import { default as repV } from '../../submodules/xwing-data2/data/pilots/galactic-republic/nimbus-class-v-wing.json'
import { default as repZ } from '../../submodules/xwing-data2/data/pilots/galactic-republic/clone-z-95-headhunter.json'

import { default as sepVulture } from '../../submodules/xwing-data2/data/pilots/separatist-alliance/vulture-class-droid-fighter.json'
import { default as sepBelbullab } from '../../submodules/xwing-data2/data/pilots/separatist-alliance/belbullab-22-starfighter.json'
import { default as sepInfil } from '../../submodules/xwing-data2/data/pilots/separatist-alliance/sith-infiltrator.json'
import { default as sepHyena } from '../../submodules/xwing-data2/data/pilots/separatist-alliance/hyena-class-droid-bomber.json'
import { default as sepNantex } from '../../submodules/xwing-data2/data/pilots/separatist-alliance/nantex-class-starfighter.json'
import { default as sepTri } from '../../submodules/xwing-data2/data/pilots/separatist-alliance/droid-tri-fighter.json'
import { default as sepHMP } from '../../submodules/xwing-data2/data/pilots/separatist-alliance/hmp-droid-gunship.json'
import { default as sepFirespray } from '../../submodules/xwing-data2/data/pilots/separatist-alliance/firespray-class-patrol-craft.json'
import { default as sepRogue } from '../../submodules/xwing-data2/data/pilots/separatist-alliance/rogue-class-starfighter.json'
import { default as sepGauntlet } from '../../submodules/xwing-data2/data/pilots/separatist-alliance/gauntlet-fighter.json'
import { XWSFactionService } from '../xwsFaction/xwsFaction.service';
import { XWSShipService } from '../xwsShip/xwsShip.service';


@Injectable()
export class XWSPilotService {
    constructor(
        @InjectRepository(XWSPilot)
        private readonly xwsPilotRepository: Repository<XWSPilot>,
        private readonly xwsFactionService: XWSFactionService,
        private readonly xwsShipService: XWSShipService
    ) {
        this.unknownPilot = new XWSPilot();
        this.unknownPilot.xws = "unknown";
        this.unknownPilot.name = "Unknown Pilot";
        this.unknownPilot.subtitle = "Unknown Pilot";
        this.unknownPilot.limited = false;
        this.unknownPilot.initiative = 0;
        this.unknownPilot.cost = 0;
        this.unknownPilot.loadout = 0;
        this.unknownPilot.artwork = "";
        this.unknownPilot.image = "";
        this.unknownPilot.standard = false;
        this.unknownPilot.standardLoadout = false;
        this.unknownPilot.ship = "unknown";
    }

    public unknownPilot: XWSPilot;

    getAll(): Promise<XWSPilot[]> {
        return this.xwsPilotRepository.find()
    }

    findOne(params: any): Promise<XWSPilot|null>{
        return this.xwsPilotRepository.findOne({
            where: [
                {xws: params}
            ],
        });
    }

    loadPilots() {
        let ships = [rebelB, rebelARC, rebelAttackShuttle, rebelAuzituck, rebelY, rebelK, rebelE, rebelFang, rebelGauntlet,
            rebelHWK, rebelFalcon, rebelA, rebelSheath, rebelX, rebelTIE, rebelU, rebelGhost, rebelYT2400, rebelZ,
            empireGunboat, empireGauntlet, empireLambda, empireTIEV1, empireTIEX1, empireInterceptor, empireReaper, empireTIEHeavy,
            empireDefender, empireAggressor, empirePunisher, empireTIEFighter, empirePhantom, empireBomber, empireStriker, empireDeci,
            scumAggressor, scumY, scumFalcon, scumEscape, scumFang, scumFirespray, scumG1A, scumGauntlet, scumHWK, scumJM5K, scumKFighter,
            scumLancer, scumKimo, scumM3A, scumTIE, scumQuad, scumRogue, scumScurrg, scumRazorCrest, scumStarviper, scumYV, scumZ, scumYT2400, 
            resStarfortress, resFalcon, resA, resX, resTransport, resPod, resFireball, resY,
            foBA, foFO, foSF, foVN, foUpsilon, foXi, foSE, foWI,
            repARC, repD7, repD7B, repTorrent, repN1, repY, repETA, repGauntlet, repLAAT, repV, repZ,
            sepVulture, sepBelbullab, sepInfil, sepHyena, sepNantex, sepTri, sepHMP, sepFirespray, sepRogue, sepGauntlet] as unknown as XWSShipSchema[];
            
        return Promise.all(ships.map(
            ship => {
                this.xwsShipService.save(ship).then(
                    () =>
                    ship.pilots.map(
                        pilot => {
                            this.save(pilot, ship);
                    })
                );
            }
        ));
    }

    async save(pilot: XWSPilotSchema, ship: XWSShipSchema) {
        let savePilot = new XWSPilot();
        savePilot.xws = pilot.xws;
        savePilot.name = pilot.name;
        savePilot.subtitle = pilot.caption ?? "";
        savePilot.limited = pilot.limited;
        savePilot.initiative = pilot.initiative;
        savePilot.cost = pilot.cost;
        savePilot.loadout = pilot.loadout ?? 0;
        savePilot.artwork = pilot.artwork ?? "";
        savePilot.image = pilot.image ?? "";
        savePilot.standard = pilot.standard;

        let faction = await this.xwsFactionService.findOne(ship.faction);
        faction ??= this.xwsFactionService.unknownFaction;

        savePilot.faction = faction;
        savePilot.ship = ship.xws;
        savePilot.standardLoadout = pilot.standardLoadout ? true : false;
        console.log("Saving " + savePilot.xws);
        return this.xwsPilotRepository.save(savePilot);
    }
}