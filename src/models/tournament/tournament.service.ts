import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './tournament.entity';
import { Between, Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Observable, lastValueFrom, timeout } from 'rxjs';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { PlayerService } from '../player/player.service';

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

    async createNew(inputTournament: Tournament) {
        var retries = 0;
        var tournamentJson: Observable<AxiosResponse<Tournament, any>>;
        while(retries < 10) {
            try {
                this.logOperation("Requesting", inputTournament);
                const tournamentResponse =  (await lastValueFrom(this.httpService.get<Tournament>('https://listfortress.com/api/v1/tournaments/' + inputTournament.id))).data;
                this.logOperation("Creating", inputTournament);

                tournamentResponse.participants.map(
                    player => player = this.playerService.createNew(player, tournamentResponse)
                );

                this.tournamentRepository.save(tournamentResponse);
                break;
            }
                catch (error) {
                    console.log("Error during tournament " + inputTournament.id + " try attempt " + retries)
                    retries += 1;
                }
            }
    }

    async delete(inputTournaments: Tournament[]) { 
        inputTournaments.map(
            (tournament => { 
                this.logOperation("Deleting", tournament);
                this.tournamentRepository.delete(tournament.id);
            })
        );
    }

    logOperation(operation: string, tournament: Tournament) {
        console.log(operation + " tournament: " + tournament.id + " Name: " + tournament.name + " Date: " + tournament.date);
    }
}