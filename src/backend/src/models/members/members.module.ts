import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Members } from './entities/members.entity';
import { CaslAbilityFactory } from '../../security/casl/casl-ability.factory';

@Module({
  imports: [TypeOrmModule.forFeature([Members])],
  providers: [MembersService, CaslAbilityFactory],
  controllers: [MembersController],
  exports: [MembersService],
})
export class MembersModule {}
