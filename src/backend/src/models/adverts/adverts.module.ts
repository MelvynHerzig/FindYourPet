import { Module } from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import { AdvertsController } from './adverts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertsEntity } from './adverts.entity';
import { CaslAbilityFactory } from '../../security/casl/casl-ability.factory';

@Module({
  imports: [TypeOrmModule.forFeature([AdvertsEntity])],
  providers: [AdvertsService, CaslAbilityFactory],
  controllers: [AdvertsController],
})
export class AdvertsModule {}
