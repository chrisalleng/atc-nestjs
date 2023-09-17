import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { Between, Repository } from 'typeorm';
import { Tournament } from '../tournament/tournament.entity';
import { PilotService } from '../pilot/pilot.service';
import { Pilot } from '../pilot/pilot.entity';
import { ListfortressPilot, ListfortressPlayer } from '../listfortress/listfortressInterfaces';
import { XWSFactionService } from '../xwsFaction/xwsFaction.service';
import { XWSFaction } from '../xwsFaction/xwsFaction.entity';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,
        private readonly pilotService: PilotService,
        private readonly xwsFactionService: XWSFactionService
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

    async createNew(inputPlayer: ListfortressPlayer, tournamentSize: number): Promise<Player> {
        var player = new Player();
        player.id = inputPlayer.id;
        player.name = inputPlayer.name ?? "";
        player.score = inputPlayer.score ?? 0;
        player.swiss_rank = inputPlayer.swiss_rank ?? tournamentSize;
        player.top_cut_rank = inputPlayer.top_cut_rank ?? 0;
        player.mov = inputPlayer.mov ?? 0;
        player.sos = inputPlayer.sos ?? 0;
        player.dropped = inputPlayer.dropped ?? false;
        player.list_json = inputPlayer.list_json ?? "";

        // Calculated Fields
        player.percentile = (tournamentSize - inputPlayer.swiss_rank) / (tournamentSize - 1);
        player.faction = this.xwsFactionService.unknownFaction;
        if(inputPlayer.list_json) {
            const list = JSON.parse(inputPlayer.list_json);
            if(list.faction) {
                const faction = await this.xwsFactionService.findOne(list.faction);
                player.faction = faction ?? this.xwsFactionService.unknownFaction;
            }
            player.pilots = new Array();
            list.pilots.map(
                (pilot: ListfortressPilot) => player.pilots.push(this.pilotService.createNew(pilot))
            );
        }
        return player;
    }
}