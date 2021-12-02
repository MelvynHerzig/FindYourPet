import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersEntity } from './members.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MembersEntity])],
  providers: [MembersService],
  controllers: [MembersController],
})
export class MembersModule {}
