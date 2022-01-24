import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { Test } from '@nestjs/testing';
import { Member } from './entities/members.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdvertsModule } from '../adverts/adverts.module';
import { CaslAbilityFactory } from '../../security/casl/casl-ability.factory';
import { forwardRef } from '@nestjs/common';

describe('CatsController', () => {
  let membersController: MembersController;
  let membersService: MembersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '../../../../database/.env',
        }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: parseInt(<string>process.env.POSTGRES_PORT),
          username: process.env.APP_DB_USER,
          password: process.env.APP_DB_PASS,
          database: process.env.APP_DB_NAME_TEST,
          autoLoadEntities: true,
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Member]),
        forwardRef(() => AdvertsModule),
      ],
      controllers: [MembersController],
      providers: [MembersService, CaslAbilityFactory],
      exports: [MembersService],
    }).compile();

    membersController = moduleRef.get<MembersController>(MembersController);
    membersService = moduleRef.get<MembersService>(MembersService);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      let result: Promise<Member>;
      jest
        .spyOn(membersService, 'findOne')
        .mockImplementation((email) => result);

      expect(await membersController.findOneByEmail('test', undefined)).toBe(
        result,
      );
    });
  });
});
