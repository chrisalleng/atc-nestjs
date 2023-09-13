import { Controller, Get, HttpException, HttpStatus} from '@nestjs/common';
import { UpdateService } from './update.service';
import { HttpService } from '@nestjs/axios';
import { filter, lastValueFrom } from 'rxjs';
import { Tournament } from '../tournament/tournament.entity';
import { TournamentService } from '../tournament/tournament.service';
import { AxiosResponse } from 'axios';
import { json } from 'stream/consumers';

@Controller('update')
export class UpdateController {
    constructor(
        private readonly updateService: UpdateService,
        private readonly httpService: HttpService,
        private readonly tournamentService: TournamentService
    ) {}

    @Get()
    getAll() {
        this.runRupdate()
        return this.updateService.getAll()
    }

    async create() {
        return this.updateService.createNew()
    }

    async runRupdate() {
        try {
            // download latest tournament list
            const tournamentJson = await lastValueFrom(this.httpService.get<Tournament[]>('https://listfortress.com/api/v1/tournaments/'));

            // find partial diff
            const latestUpdate = await this.updateService.getLatest();
            const currentTournaments = await this.tournamentService.getAll();
            const tournamentsNewOrUpdated = tournamentJson.data.filter(tournament => (
                (Date.parse(tournament.updated_at) > latestUpdate.created.getTime())
            ));

            const tournamentsToInsert = this.subtractTournaments(tournamentsNewOrUpdated, currentTournaments);
            const tournamentsToUpdate = this.subtractTournaments(tournamentsNewOrUpdated, tournamentsToInsert);
            const tournamentsToDelete = this.subtractTournaments(currentTournaments, tournamentJson.data);

            // delete all data from old version of tournament
            this.tournamentService.delete(tournamentsToDelete);
            this.tournamentService.delete(tournamentsToUpdate);

            // insert updated tournaments
            tournamentsToInsert.concat(tournamentsToUpdate).map(
                (tournament => this.tournamentService.createNew(tournament))
            );

            // save last update timestamp
            this.updateService.createNew();

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FAILED_DEPENDENCY,
                error: 'TODO insert reasonable exception here',
              }, HttpStatus.FAILED_DEPENDENCY, {
                cause: error
              });
        }
        
        
        
    }

    subtractTournaments(baseSet: Tournament[], removeSet: Tournament[]): Tournament[] {
        const baseIds: number[] = [];
        const removeIds: number[] = [];

        baseSet.map(
            (tournament => baseIds.push(tournament.id))
        )
        removeSet.map(
            (tournament => removeIds.push(tournament.id))
        )

        const idList = baseIds.filter(
            tournament => removeIds.indexOf(tournament) > -1
        );

        const returnVal = baseSet.filter(
            (tournament => idList.indexOf(tournament.id) < 0)
        );

        return returnVal;
    }
}