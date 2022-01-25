import { MembersController } from '../members/members.controller';
import { MembersService } from '../members/members.service';
import { Member } from '../members/entities/members.entity';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslAbilityFactory } from '../../security/casl/casl-ability.factory';
import { ToMemberDto } from '../members/dto/members.dto';
import { UpdateMemberDto } from '../members/dto/update.members.dto';
import {
  HttpResponse,
  RESPONSE_ADVERT_DELETED,
  RESPONSE_ADVERT_UPDATED,
  RESPONSE_MEMBER_DELETED,
  RESPONSE_MEMBER_UPDATED,
} from '../response';
import { AdvertsService } from './adverts.service';
import { AdvertsController } from './adverts.controller';
import { SpeciesModule } from '../species/species.module';
import { MembersModule } from '../members/members.module';
import { AuthModule } from '../../auth/auth.module';
import { Advert, PetGender } from './entities/adverts.entity';
import { CreateAdvertDto } from './dto/create.adverts.dto';
import { AdvertDto } from './dto/advert.dto';
import { SpeciesService } from '../species/species.service';
import { create } from 'domain';
import { ERROR_NOT_AUTHORIZED } from '../../error/error-message';

describe('MembersController', () => {
  let advertsController: AdvertsController;
  let advertsService: AdvertsService;
  let membersService: MembersService;
  let speciesService: SpeciesService;

  let randomMember: Member = {
    id: undefined,
    location: undefined,
    firstname: 'John',
    name: 'Doe',
    email: 'ad@doe.ch',
    street: 'Route de Cheseaux 1',
    NPA: 1400,
    city: 'Yverdon-les-Bains',
    phone: '+41 00 000 00 00',
    password: 'Super2012$',
    isAdmin: false,
  };

  let randomMember2: Member = {
    id: undefined,
    location: undefined,
    firstname: 'John',
    name: 'Doe',
    email: 'ad2@doe.ch',
    street: 'Route de Cheseaux 1',
    NPA: 1400,
    city: 'Yverdon-les-Bains',
    phone: '+41 00 000 00 00',
    password: 'Super2012$',
    isAdmin: false,
  };

  let adminMember: Member = {
    id: undefined,
    location: undefined,
    firstname: 'Admin',
    name: 'FindYourPet',
    email: 'ad@admin.ch',
    street: 'Route de Cheseaux 1',
    NPA: 1400,
    city: 'Yverdon-les-Bains',
    phone: '+41 00 000 00 00',
    password: 'Super2012$',
    isAdmin: true,
  };

  const createAdvert = {
    title: 'Baby cat of 3 months',
    description: 'The kitten is black with a white head',
    petAge: 3,
    petGender: PetGender.MALE,
    speciesId: 1,
    memberId: undefined,
    imageId: undefined,
  };

  let advert: AdvertDto;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: 'database/.env',
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
        TypeOrmModule.forFeature([Advert]),
        MembersModule,
        SpeciesModule,
        AuthModule,
      ],
      controllers: [AdvertsController],
      providers: [AdvertsService, CaslAbilityFactory],
    }).compile();

    advertsController = moduleRef.get<AdvertsController>(AdvertsController);
    advertsService = moduleRef.get<AdvertsService>(AdvertsService);
    membersService = moduleRef.get<MembersService>(MembersService);
    speciesService = moduleRef.get<SpeciesService>(SpeciesService);

    await membersService.setMemberLocation(randomMember);
    await membersService.setMemberLocation(randomMember2);
    randomMember = await membersService.create(randomMember);
    randomMember2 = await membersService.create(randomMember2);

    const species = await speciesService.createSpecies({
      id: 1,
      name: '{"fr":"fr", "en":"en", "de":"de", "it":"it"}',
    });

    createAdvert.speciesId = species.id;

    advert = await advertsController.create(createAdvert, {
      user: randomMember,
    });

    try {
      adminMember = await membersService.create(adminMember);
      await membersService.setMemberLocation(adminMember);
    } catch (e) {}
  });

  afterAll(async () => {
    try {
      for (const s of await speciesService.findAllSpecies()) {
        await speciesService.deleteSpecies(s.id);
      }

      await membersService.delete(adminMember.id);
      await membersService.delete(randomMember.id);
      await membersService.delete(randomMember2.id);
    } catch (e) {}
  });

  describe('create', () => {
    it('Should create a new advert', async () => {
      const result = await advertsController.create(createAdvert, {
        user: randomMember,
      });

      expect(result.title).toBe(createAdvert.title);
    });

    it('Should throw unauthorized', async () => {
      try {
        await advertsController.create(createAdvert, {});
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe(ERROR_NOT_AUTHORIZED);
      }
    });
  });

  describe('update', () => {
    it('Should update the advert', async () => {
      const updateAdvert = {
        ...createAdvert,
        id: advert.id,
      };

      updateAdvert.title = 'modified';
      const result = await advertsController.update(updateAdvert, {
        user: randomMember,
      });

      expect(result.message).toBe(RESPONSE_ADVERT_UPDATED);
    });

    it('Should throw unauthorized when not granted', async () => {
      try {
        await advertsController.update(
          { ...createAdvert, id: advert.id },
          { user: randomMember2 },
        );
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe(ERROR_NOT_AUTHORIZED);
      }
    });

    it('Should throw unauthorized when not logged', async () => {
      try {
        await advertsController.update({ ...createAdvert, id: advert.id }, {});
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe(ERROR_NOT_AUTHORIZED);
      }
    });
  });

  describe('delete', () => {
    it('Should throw unauthorized when not granted', async () => {
      try {
        await advertsController.deleteOne(advert.id, { user: randomMember2 });
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe(ERROR_NOT_AUTHORIZED);
      }
    });

    it('Should throw unauthorized when not logged', async () => {
      try {
        await advertsController.deleteOne(advert.id, {});
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe(ERROR_NOT_AUTHORIZED);
      }
    });

    it('Should delete the advert', async () => {
      const result = await advertsController.deleteOne(advert.id, {
        user: randomMember,
      });

      expect(result.message).toBe(RESPONSE_ADVERT_DELETED);
    });
  });
});
