import { Module } from '@nestjs/common';
import { RaceService } from '../service/race.service';
import { RaceController } from '../controller/race.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceEntity } from '../entity/race.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RaceEntity])],
  providers: [RaceService],
  controllers: [RaceController],
})
export class RaceModule {}
