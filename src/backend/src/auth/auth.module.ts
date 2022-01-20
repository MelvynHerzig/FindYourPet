import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MembersModule } from '../models/members/members.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MembersModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'member',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
