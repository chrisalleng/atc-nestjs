import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './tournament.entity';
import { Between, Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Observable, lastValueFrom, timeout } from 'rxjs';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { PlayerService } from '../player/player.service';
import { ListfortressTournament } from '../../interfaces/listfortressInterfaces';

@Injectable()
export class TournamentService {
    constructor(
        @InjectRepository(Tournament)
        private readonly tournamentRepository: Repository<Tournament>,
        private readonly httpService: HttpService,
        private readonly playerService: PlayerService
    ) {}

    getAll(): Promise<Tournament[]> {
        return this.tournamentRepository.find()
    }

    findOne(params: any): Promise<Tournament|null>{
        console.log("Received request for tournament id: " + params.id)
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

                await Promise.all(tournamentResponse.participants.map(
                    async player => tournament.players.push(await this.playerService.createNew(player, tournament))
                ))
                this.tournamentRepository.save(tournament);
                this.logOperation("Finished", inputTournament);
                break;
            }
            catch (error) {
                console.log("Error during tournament " + inputTournament.id + " try attempt " + retries);
                console.log(error);
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