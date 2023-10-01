import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './tournament.entity';
import { Between, Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Observable, lastValueFrom, timeout } from 'rxjs';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { PlayerService } from '../player/player.service';
import { ListfortressTournament } from '../../interfaces/listfortressInterfaces';
import { MatchService } from '../match/match.service';

@Injectable()
export class TournamentService {
    constructor(
        @InjectRepository(Tournament)
        private readonly tournamentRepository: Repository<Tournament>,
        private readonly httpService: HttpService,
        private readonly playerService: PlayerService,
        private readonly matchService: MatchService
    ) {}

    getAll(): Promise<Tournament[]> {
        return this.tournamentRepository.find()
    }

    findOne(params: any): Promise<Tournament|null>{
        // console.log("Received request for tournament id: " + params.id)
        return this.tournamentRepository.findOne( {
            where: [
                {id: params.id}
            ],
        })
    }

    search(searchFormat: number, startDate: Date, endDate: Date): Promise<Tournament[]> {
        return this.tournamentRepository.find(
            {
                where: [
                    {format: searchFormat},
                    {date: Between(startDate, endDate)}
                ], 
            })
    }

    async createNew(inputTournament: ListfortressTournament) {
        var retries = 0;
        var tournamentJson: Observable<AxiosResponse<Tournament, any>>;
        while(retries < 10) {
            try {
                this.logOperation("Requesting", inputTournament);
                const tournamentResponse =  (await lastValueFrom(this.httpService.get<ListfortressTournament>('https://listfortress.com/api/v1/tournaments/' + inputTournament.id))).data;
                this.logOperation("Creating", inputTournament);

                var tournament = new Tournament();
                tournament.id = tournamentResponse.id;
                tournament.name = tournamentResponse.name;
                tournament.date = tournamentResponse.date;
                tournament.format = tournamentResponse.format;
                tournament.type = tournamentResponse.type;
                tournament.created_at = tournamentResponse.created_at;
                tournament.updated_at = tournamentResponse.updated_at;
                tournament.size = tournamentResponse.participants.length;
                tournament.players = new Array();
                tournament.matches = new Array();

                await Promise.all(tournamentResponse.participants.map(
                    async player => tournament.players.push(await this.playerService.createNew(player, tournament))
                ))

                const validResults = ["win", "draw", "tie"];

                await Promise.all(tournamentResponse.rounds.map(
                    async round => await Promise.all(round.matches.map(
                        async match => {
                            //TODO sometimes valid matches have "" as the result, ~5k of them
                            if(validResults.includes(match.result) && match.player1_id !== null && match.player2_id !== null){
                                tournament.matches.push(await this.matchService.createNew(match, round, tournament));
                                tournament.matches.push(await this.matchService.createNewInverted(match, round, tournament));
                            } else if (match.result !== "bye") {
                                console.error("Skipped match " + match.id + " result: " + match.result);
                            }
                        }
                    ))
                ))

                this.tournamentRepository.save(tournament);
                this.logOperation("Finished", inputTournament);
                break;
            }
            catch (error) {
                console.error("Error during tournament " + inputTournament.id + " try attempt " + retries);
                console.error(error);
                retries += 1;
            }
            }
    }

    async delete(inputTournaments: Tournament[]) { 
        inputTournaments.map(
            (tournament => { 
                this.logOperation("Deleting", tournament);
                this.tournamentRepository.remove(tournament);
            })
        );
    }

    logOperation(operation: string, tournament: ListfortressTournament | Tournament) {
        console.log(operation + " tournament: " + tournament.id + " Name: " + tournament.name + " Date: " + tournament.date);
    }
}