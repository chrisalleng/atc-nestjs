import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Update } from './models/update/update.entity';
import { UpdateController } from './models/update/update.controller';
import { UpdateModule } from './models/update/update.module';
import { TournamentModule } from './models/tournament/tournament.module';
import { TournamentController } from './models/tournament/tournament.controller';
import { HttpModule } from '@nestjs/axios';
import { PlayerModule } from './models/player/player.module';
import { PlayerController } from './models/player/player.controller';
import { PilotModule } from './models/pilot/pilot.module';
import { PilotController } from './models/pilot/pilot.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      entities: [Update],
      synchronize: true, //turn off in prod
      autoLoadEntities: true,
    }),
    UpdateModule,
    TournamentModule,
    HttpModule,
    PlayerModule,
    PilotModule
  ],
  controllers: [AppController, UpdateController, TournamentController, PlayerController, PilotController],
  providers: [AppService],
})
export class AppModule {}
