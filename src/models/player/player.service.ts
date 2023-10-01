import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { Between, Repository } from 'typeorm';
import { Tournament } from '../tournament/tournament.entity';
import { PilotService } from '../pilot/pilot.service';
import { Pilot } from '../pilot/pilot.entity';
import { ListfortressPilot, ListfortressPlayer } from '../../interfaces/listfortressInterfaces';
import { XWSFactionService } from '../xwsFaction/xwsFaction.service';
import { XWSPilotService } from '../xwsPilot/xwsPilot.service';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,
        private readonly pilotService: PilotService,
        private readonly xwsFactionService: XWSFactionService,
        private readonly xwsPilotService: XWSPilotService
    ) {
        this.unknownPlayer = new Player();
        this.unknownPlayer.id = 0;
        this.unknownPlayer.dropped = false;
        this.unknownPlayer.faction = this.xwsFactionService.unknownFaction;
        this.unknownPlayer.mov = 0;
        this.unknownPlayer.name = "Unknwon Player";
        this.unknownPlayer.percentile = 0;
        this.unknownPlayer.score = 0;
        this.unknownPlayer.sos = 0;
        this.unknownPlayer.swiss_rank = 0;
        this.unknownPlayer.top_cut_rank = 0;
    }

    public unknownPlayer: Player;

    getAll(): Promise<Player[]> {
        return this.playerRepository.find()
    }

    findOne(params: any): Promise<Player|null>{
        // console.log("Received request for player id: " + params.id)
        return this.playerRepository.findOne( {
            where: [
                {id: params}
            ],
        })
    }

    async createNew(inputPlayer: ListfortressPlayer, tournament: Tournament): Promise<Player>{
        // console.log("Started saving player " + inputPlayer.id);
        var player = new Player();
        player.id = inputPlayer.id;
        player.name = inputPlayer.name ?? "";
        player.score = inputPlayer.score ?? 0;
        player.swiss_rank = inputPlayer.swiss_rank ?? tournament.size;
        player.top_cut_rank = inputPlayer.top_cut_rank ?? 0;
        player.mov = inputPlayer.mov ?? 0;
        player.sos = inputPlayer.sos ?? 0;
        player.dropped = inputPlayer.dropped ?? false;
        player.list_json = inputPlayer.list_json ?? "";

        // Calculated Fields
        player.percentile = (tournament.size - inputPlayer.swiss_rank) / (tournament.size - 1);
        player.faction = this.xwsFactionService.unknownFaction;
        if(inputPlayer.list_json) {
            let list = JSON.parse(inputPlayer.list_json);
            if(list.faction) {
                const faction = await this.xwsFactionService.findOne(list.faction);
                player.faction = faction ?? this.xwsFactionService.unknownFaction;
            }
        }

        if(inputPlayer.list_json) {
            const list = JSON.parse(inputPlayer.list_json);
            player.pilots = new Array();
            await Promise.all(list.pilots.map(
                async (pilot: ListfortressPilot) => {
                    let parsedXWS = await this.xwsPilotService.findOne(pilot.id ?? this.xwsPilotService.unknownPilot);
                    if (!parsedXWS){
                        console.error("Player: " + inputPlayer.id + " error parsing pilot xws: " + pilot.id);
                    } else {
                        player.pilots.push(await this.pilotService.createNew(pilot, parsedXWS, player));
                    }
                }
            ));
        }
        // console.log("Done saving player " + player.id);
        return player;
    }
}