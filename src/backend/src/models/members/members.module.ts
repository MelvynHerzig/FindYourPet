import { forwardRef, Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/members.entity';
import { CaslAbilityFactory } from '../../security/casl/casl-ability.factory';
import { AdvertsModule } from '../adverts/adverts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    forwardRef(() => AdvertsModule),
  ],
  providers: [MembersService, CaslAbilityFactory],
  controllers: [MembersController],
  exports: [MembersService],
})
export class MembersModule {}
