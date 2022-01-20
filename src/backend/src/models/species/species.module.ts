import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from './entities/species.entity';
import { CaslAbilityFactory } from '../../security/casl/casl-ability.factory';

@Module({
  imports: [TypeOrmModule.forFeature([Species])],
  providers: [SpeciesService, CaslAbilityFactory],
  controllers: [SpeciesController],
  exports: [SpeciesService],
})
export class SpeciesModule {}
