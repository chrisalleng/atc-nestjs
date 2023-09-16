import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { Between, Repository } from 'typeorm';
import { Tournament } from '../tournament/tournament.entity';
import { PilotService } from '../pilot/pilot.service';
import { Pilot } from '../pilot/pilot.entity';
import { ListfortressPilot } from '../listfortress/listfortressPilot'

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,
        private readonly pilotService: PilotService
    ) {}

    getAll(): Promise<Player[]> {
        return this.playerRepository.find()
    }

    findOne(params: any): Promise<Player|null>{
        console.log("Received request for player id: " + params.id)
        return this.playerRepository.findOne( {
            where: [
                {id: params.id}
            ],
        })
    }

    createNew(inputPlayer: Player, inputTournament: Tournament) {
        console.log("Creating player: " + inputPlayer.id)

        //Cleanup bad/misisng values
        inputPlayer.top_cut_rank = Math.max(0, inputPlayer.top_cut_rank);
        if (inputPlayer.dropped == null) {
            inputPlayer.dropped = false;
        }
        if (inputPlayer.score == null) {
            inputPlayer.score = 0;
        }
        if (inputPlayer.sos == null) {
            inputPlayer.sos = 0;
        }
        if (inputPlayer.mov == null) {
            inputPlayer.mov = 0;
        }
        if (inputPlayer.name == null) {
            inputPlayer.name = "";
        }
        if (inputPlayer.swiss_rank == null) {
            inputPlayer.swiss_rank = inputTournament.participants.length;
        }
        if (inputPlayer.list_json == null) {
            inputPlayer.list_json = "";
        }

        // Calculated Fields
        //TODO list, player faction from list
        inputPlayer.percentile = (inputTournament.participants.length - inputPlayer.swiss_rank) / (inputTournament.participants.length - 1);
        if(inputPlayer.list_json) {
            const list = JSON.parse(inputPlayer.list_json);
            inputPlayer.faction = list.faction;
            inputPlayer.pilots = new Array();
            list.pilots.map(
                (pilot: ListfortressPilot) => inputPlayer.pilots.push(this.pilotService.createNew(pilot))
            );
        }

        if (inputPlayer.faction == null) {
            inputPlayer.faction = "unknown";
        }

        return inputPlayer;
    }
}