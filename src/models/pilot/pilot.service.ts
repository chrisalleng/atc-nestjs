import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pilot } from './pilot.entity';
import { Between, Repository } from 'typeorm';
import { Tournament } from '../tournament/tournament.entity';
import { Player } from '../player/player.entity';

@Injectable()
export class PilotService {
    constructor(
        @InjectRepository(Pilot)
        private readonly playerRepository: Repository<Pilot>,
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

    createNew(inputPilot: Pilot, inputPlayer: Player) {
        //TODO upgrades, XWS mapping
        if (!inputPilot.id) {
            inputPilot.id = "unknown";
        }
        return inputPilot;
    }
}