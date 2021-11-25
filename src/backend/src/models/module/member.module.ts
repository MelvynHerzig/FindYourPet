import { Module } from '@nestjs/common';
import { MemberService } from '../service/member.service';
import { MemberController } from '../controller/member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from '../entity/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity])],
  providers: [MemberService],
  controllers: [MemberController],
})
export class MemberModule {}
