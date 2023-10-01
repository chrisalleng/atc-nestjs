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
import { UpgradeModule } from './models/upgrade/upgrade.module';
import { UpgradeController } from './models/upgrade/upgrade.controller';
import { XWSFactionModule } from './models/xwsFaction/xwsFaction.module';
import { XWSFactionController } from './models/xwsFaction/xwsFaction.controller';
import { XWSPilotModule } from './models/xwsPilot/xwsPilot.module';
import { XWSPilotController } from './models/xwsPilot/xwsPilot.controller';
import { XWSShipModule } from './models/xwsShip/xwsShip.module';
import { XWSShipController } from './models/xwsShip/xwsShip.controller';
import { XWSUpgradeModule } from './models/xwsUpgrade/xwsUpgrade.module';
import { XWSUpgradeController } from './models/xwsUpgrade/xwsUpgrade.controller';
import { MatchModule } from './models/match/match.module';
import { MatchController } from './models/match/match.controller';

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
    PilotModule,
    UpgradeModule,
    XWSFactionModule,
    XWSPilotModule,
    XWSShipModule,
    XWSUpgradeModule,
    MatchModule
  ],
  controllers: [AppController, UpdateController, TournamentController, PlayerController, PilotController, UpgradeController, XWSFactionController, XWSPilotController, XWSShipController, XWSUpgradeController, MatchController],
  providers: [AppService],
})
export class AppModule {}
