import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Update } from './update.entity';
import { Repository } from 'typeorm';
import { filter, lastValueFrom } from 'rxjs';
import { Tournament } from '../tournament/tournament.entity';
import { TournamentService } from '../tournament/tournament.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UpdateService {
    constructor(
        @InjectRepository(Update)
        private readonly updateRepository: Repository<Update>,
        private readonly tournamentService: TournamentService,
        private readonly httpService: HttpService
    ) {}

    getAll(): Promise<Update[]> {
        return this.updateRepository.find();
    }

    async getLatest(): Promise<Update> {
        var test = (await this.updateRepository.find()).filter(
            (function (update) {
                return update.isActive === true;
            })
        )
        return test[0];
    }

    async createNew() {
        //TODO move to  custom repository (https://orkhan.gitbook.io/typeorm/docs/custom-repository) so can filter to single pull from database vs in memory
        const currentActive = await this.updateRepository.findOne({where: {isActive: true}});
        if (currentActive != null) {
            this.updateRepository.save(
                {
                    id: currentActive.id,
                    isActive: false,
                }
            )
        }
        const update = new Update();
        return this.updateRepository.save(update);
    }

    async runRupdate() {
        try {
            // download latest tournament list
            const tournamentJson = await lastValueFrom(this.httpService.get<Tournament[]>('https://listfortress.com/api/v1/tournaments/'));

            // find partial diff
            const latestUpdate = await this.getLatest();
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
            this.createNew();

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