import { Module } from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import { AdvertsController } from './adverts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertsEntity } from './adverts.entity';
import { SpeciesModule } from '../species/species.module';
import { MembersModule } from '../members/members.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdvertsEntity]),
    SpeciesModule,
    MembersModule,
  ],
  providers: [AdvertsService],
  controllers: [AdvertsController],
})
export class AdvertsModule {}
