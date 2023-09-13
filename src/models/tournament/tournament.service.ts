import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './tournament.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class TournamentService {
    constructor(
        @InjectRepository(Tournament)
        private readonly tournamentRepository: Repository<Tournament>,
    ) {}

    getAll(): Promise<Tournament[]> {
        return this.tournamentRepository.find()
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
        this.logOperation("Creating", inputTournament);
        this.tournamentRepository.insert(inputTournament);
        //TODO logic for lists/pilots/upgrades/matchups
    }

    async delete(inputTournaments: Tournament[]) {
        inputTournaments.map(
            (tournament => { 
                this.logOperation("Deleting", tournament);
                this.tournamentRepository.delete(tournament.id);
            })
        );
        //TODO logic for lists/pilots/upgrades/matchups
    }

    logOperation(operation: string, tournament: Tournament) {
        console.log(operation + " tournament: " + tournament.id + " Name: " + tournament.name + " Date: " + tournament.date);
    }
}