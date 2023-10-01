import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Tournament } from '../tournament/tournament.entity';
import { ListfortressMatch, ListfortressPilot, ListfortressPlayer, ListfortressRound } from '../../interfaces/listfortressInterfaces';
import { Match } from './match.entity';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/player.entity';

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match)
        private readonly matchRepository: Repository<Match>,
        private readonly playerService: PlayerService
    ) {}

    getAll(): Promise<Match[]> {
        return this.matchRepository.find()
    }

    findOne(params: any): Promise<Match|null>{
        console.log("Received request for match id: " + params.id)
        return this.matchRepository.findOne( {
            where: [
                {id: params.id}
            ],
        })
    }

    async createNew(match: ListfortressMatch, round: ListfortressRound, tournament: Tournament): Promise<Match>{
        let saveMatch = new Match();
        saveMatch.firstPlayer = this.findPlayerFromTournament(match.player1_id, tournament);
        tournament.players[match.player1_id];
        saveMatch.firstPlayerScore = match.player1_points;
        saveMatch.secondPlayer = this.findPlayerFromTournament(match.player2_id, tournament);
        saveMatch.secondPlayerScore = match.player2_points;

        if (match.result === "win") {
            if (saveMatch.firstPlayer.id == match.winner_id) {
                saveMatch.result = "win";
            } else {
                saveMatch.result = "loss";
            }
        } else {
            saveMatch.result = "draw";
        }

        saveMatch.scenario = round.scenario ?? "unknown";
        saveMatch.type = round.roundtype_id === 1 ? "swiss" : "cut";

        return saveMatch;
    }

    async createNewInverted(match: ListfortressMatch, round: ListfortressRound, tournament: Tournament): Promise<Match>{
        let player1 = match.player1_id;
        let player1Points = match.player1_points;
        let player2 = match.player2_id;
        let player2Points = match.player2_points;

        match.player1_id = player2;
        match.player1_points = player2Points;
        match.player2_id = player1;
        match.player2_points = player1Points;
        return this.createNew(match, round, tournament);
    }

    findPlayerFromTournament(player: number, tournament: Tournament) {
        return tournament.players.filter(
            tournamentPlayer => tournamentPlayer.id === player
        )[0];
    }
}