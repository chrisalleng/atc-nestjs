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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [Update],
      synchronize: true, //turn off in prod
      autoLoadEntities: true,
    }),
    UpdateModule,
    TournamentModule,
    HttpModule
  ],
  controllers: [AppController, UpdateController, TournamentController],
  providers: [AppService],
})
export class AppModule {}
