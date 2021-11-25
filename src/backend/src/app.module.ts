import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from './models/module/member.module';
import { AdvertModule } from './models/module/advert.module';
import { RaceModule } from './models/module/race.module';

@Module({
  imports: [
    MemberModule,
    AdvertModule,
    RaceModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'database/.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.APP_DB_USER,
      password: process.env.APP_DB_PASS,
      database: process.env.APP_DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
