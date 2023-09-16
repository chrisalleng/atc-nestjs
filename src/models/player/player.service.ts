import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { Between, Repository } from 'typeorm';
import { Tournament } from '../tournament/tournament.entity';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,
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

    async createNew(inputPlayer: Player, inputTournament: Tournament) {
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

        inputPlayer.percentile = (inputTournament.participants.length - inputPlayer.swiss_rank) / (inputTournament.participants.length - 1);

        this.playerRepository.insert(inputPlayer);
    }
}