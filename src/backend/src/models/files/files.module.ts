import { Module } from '@nestjs/common';
import { AdvertsModule } from '../adverts/adverts.module';
import { FilesService } from './files.service';
import { CaslAbilityFactory } from '../../security/casl/casl-ability.factory';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/files.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File]), AdvertsModule],
  providers: [FilesService, CaslAbilityFactory],
  controllers: [FilesController],
})
export class FilesModule {}
