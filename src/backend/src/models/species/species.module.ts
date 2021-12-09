import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesEntity } from './species.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpeciesEntity])],
  providers: [SpeciesService],
  controllers: [SpeciesController],
})
export class SpeciesModule {}
