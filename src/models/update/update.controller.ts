import { Controller, Get, HttpException, HttpStatus} from '@nestjs/common';
import { UpdateService } from './update.service';
import { HttpService } from '@nestjs/axios';
import { filter, lastValueFrom } from 'rxjs';
import { Tournament } from '../tournament/tournament.entity';
import { TournamentService } from '../tournament/tournament.service';
import { AxiosResponse } from 'axios';

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
        // download latest tournament list

        try {
            const test = await lastValueFrom(this.httpService.get<Tournament[]>('https://listfortress.com/api/v1/tournaments/'));

            // const test = this.httpService.get('https://listfortress.com/api/v1/tournaments/').pipe(map(
            //     tourny => this.tournamentService.createNew(tourny)
            // ));

            
            // console.log(test.data);
            test.data.map(
                (tourny => this.tournamentService.createNew(tourny)
            ));

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FAILED_DEPENDENCY,
                error: 'TODO insert reasonable exception here',
              }, HttpStatus.FAILED_DEPENDENCY, {
                cause: error
              });
        }
        // find partial diff
        // delete all data from old version of tournament
        // re add all updated tournaments
    }
}