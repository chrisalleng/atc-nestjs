import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Update } from './update.entity';
import { Repository } from 'typeorm';
import { filter, lastValueFrom } from 'rxjs';
import { Tournament } from '../tournament/tournament.entity';
import { TournamentService } from '../tournament/tournament.service';
import { HttpService } from '@nestjs/axios';
import { ListfortressTournament } from '../../interfaces/listfortressInterfaces';

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

    findOne(params: any): Promise<Update|null>{
        console.log("Received request for update id: " + params.id)
        return this.updateRepository.findOne( {
            where: [
                {id: params.id}
            ],
        })
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

    async listfortressUpdate() {
        try {
            // download latest tournament list
            const tournamentJson = await lastValueFrom(this.httpService.get<ListfortressTournament[]>('https://listfortress.com/api/v1/tournaments/'));

            // new or updated tournaments
            var latestUpdate = await this.getLatest();
            if (latestUpdate == null) {
                console.log("No Updates found, defaulting to first run update creation");
                latestUpdate = new Update();
                latestUpdate.created = new Date(0);
            }

            const currentTournaments = await this.tournamentService.getAll();
            const tournamentsNewOrUpdated = tournamentJson.data.filter(tournament => (
                (Date.parse(tournament.updated_at) > latestUpdate.created.getTime())
            ));

            // Find deleted tournaments
            const currentTournamentIDs: number[] = new Array();
            const listfortressTournamentIDs: number[] = new Array();
            currentTournaments.map(tournament => currentTournamentIDs.push(tournament.id));
            tournamentJson.data.map(tournament => listfortressTournamentIDs.push(tournament.id));
            const deletedTournamentIDs = currentTournamentIDs.filter(
                id => !listfortressTournamentIDs.includes(id)
            )
            const deletedTournaments = currentTournaments.filter(
                tournament => deletedTournamentIDs.includes(tournament.id)
            )
            
            console.log("Running Update at " + new Date());
            console.log("Found " + tournamentsNewOrUpdated.length + " new or updated Tournaments");
            console.log("Found " + deletedTournaments.length + " deleted Tournaments");

            // delete all data from old version of tournament
            this.tournamentService.delete(deletedTournaments).then();

            // insert updated tournaments
            Promise.all(tournamentsNewOrUpdated.map(
                (tournament => this.tournamentService.createNew(tournament))
            )).then(
                data => console.log("Done updating from Listfortress")
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

    subtractLists(baseSet: number[], removeSet: number[]): number[] {
        const idList = baseSet.filter(
            id => removeSet.indexOf(id) > -1
        );

        return baseSet.filter(
            (id => idList.indexOf(id) < 0)
        );
    }
}