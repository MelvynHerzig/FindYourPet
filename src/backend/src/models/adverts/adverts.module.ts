import { Module } from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import { AdvertsController } from './adverts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertsEntity } from './adverts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdvertsEntity])],
  providers: [AdvertsService],
  controllers: [AdvertsController],
})
export class AdvertsModule {}
