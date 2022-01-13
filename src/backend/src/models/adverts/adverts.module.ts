import { Module } from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import { AdvertsController } from './adverts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advert } from './entities/adverts.entity';
import { CaslAbilityFactory } from '../../security/casl/casl-ability.factory';
import { SpeciesModule } from '../species/species.module';
import { MembersModule } from '../members/members.module';

@Module({
  imports: [TypeOrmModule.forFeature([Advert]), SpeciesModule, MembersModule],
  providers: [AdvertsService, CaslAbilityFactory],
  controllers: [AdvertsController],
  exports: [AdvertsService],
})
export class AdvertsModule {}
