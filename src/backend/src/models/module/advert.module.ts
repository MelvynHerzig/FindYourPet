import { Module } from '@nestjs/common';
import { AdvertService } from '../service/advert.service';
import { AdvertController } from '../controller/advert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertEntity } from '../entity/advert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdvertEntity])],
  providers: [AdvertService],
  controllers: [AdvertController],
})
export class AdvertModule {}
