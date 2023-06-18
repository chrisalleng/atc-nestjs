import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Update } from './models/update/update.entity';
import { UpdateController } from './models/update/update.controller';
import { UpdateService } from './models/update/update.service';
import { UpdateModule } from './models/update/update.module';

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
    UpdateModule
  ],
  controllers: [AppController, UpdateController],
  providers: [AppService],
})
export class AppModule {}
