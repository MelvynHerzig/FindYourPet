import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create.species.dto';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from './entities/species.entity';
import { MembersModule } from '../members/members.module';
import { CaslAbilityFactory } from '../../security/casl/casl-ability.factory';
import { MembersService } from '../members/members.service';
import { Member } from '../members/entities/members.entity';
import { SpeciesDto } from './dto/species.dto';
import { ERROR_INVALID_SPECIES } from '../../error/error-message';
import { getSolutionErrors } from 'ts-loader/dist/servicesHost';
import { UpdateSpeciesDto } from './dto/update.species.dto';
import {
  RESPONSE_SPECIES_DELETED,
  RESPONSE_SPECIES_UPDATED,
} from '../response';

describe('SpeciesController', () => {
  let speciesController: SpeciesController;
  let speciesService: SpeciesService;
  let membersService: MembersService;

  let species: SpeciesDto = {
    id: undefined,
    fr: 'testFR',
    en: 'testEN',
    de: 'testDE',
    it: 'testIT',
  };

  let species2: SpeciesDto = {
    id: undefined,
    fr: 'testFR2',
    en: 'testEN2',
    de: 'testDE2',
    it: 'testIT2',
  };

  let adminMember: Member = {
    id: undefined,
    location: undefined,
    firstname: 'Admin',
    name: 'FindYourPet',
    email: 'admin@admin.ch',
    street: 'Route de Cheseaux 1',
    NPA: 1400,
    city: 'Yverdon-les-Bains',
    phone: '+41 00 000 00 00',
    password: 'Super2012$',
    isAdmin: true,
  };

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
        TypeOrmModule.forFeature([Species]),
        MembersModule,
      ],
      controllers: [SpeciesController],
      providers: [SpeciesService, CaslAbilityFactory],
      exports: [SpeciesService],
    }).compile();

    speciesService = moduleRef.get<SpeciesService>(SpeciesService);
    speciesController = moduleRef.get<SpeciesController>(SpeciesController);
    membersService = moduleRef.get<MembersService>(MembersService);

    species = speciesService.ToSpeciesDto(
      await speciesService.createSpecies(speciesService.ToSpecies(species)),
    );

    try {
      adminMember = await membersService.create(adminMember);
      await membersService.setMemberLocation(adminMember);
    } catch (e) {}
  });

  afterAll(async () => {
    try {
      const speciesDel: Species[] = await speciesService.findAllSpecies();
      for (const s of speciesDel) {
        await speciesService.deleteSpecies(s.id);
      }
      await membersService.delete(adminMember.id);
    } catch (e) {}
  });

  describe('findAll', () => {
    it('Should return all species with only one species', async () => {
      const result = await speciesController.findAll();

      expect(result.length).toBe(1);
    });

    it('Should return all species with 2 species', async () => {
      species2 = speciesService.ToSpeciesDto(
        await speciesService.createSpecies(speciesService.ToSpecies(species2)),
      );

      const result = await speciesController.findAll();
      await speciesService.deleteSpecies(species2.id);
      expect(result.length).toBe(2);
    });

    it('Should return empty array', async () => {
      await speciesService.deleteSpecies(species.id);
      const result = await speciesController.findAll();
      species = speciesService.ToSpeciesDto(
        await speciesService.createSpecies(speciesService.ToSpecies(species)),
      );
      expect(result.length).toBe(0);
    });
  });

  describe('findAllTranslated', () => {
    it('Should return all species with only one species', async () => {
      const result = await speciesController.findAllTranslated('fr');

      expect(result.length).toBe(1);
      expect(result[0].name).toBe(species.fr);
    });

    it('Should return all species with 2 species', async () => {
      species2 = speciesService.ToSpeciesDto(
        await speciesService.createSpecies(speciesService.ToSpecies(species2)),
      );

      const result = await speciesController.findAllTranslated('en');
      await speciesService.deleteSpecies(species2.id);
      expect(result.length).toBe(2);
      expect(result[0].name).toBe(species.en);
    });

    it('Should return empty array', async () => {
      await speciesService.deleteSpecies(species.id);
      const result = await speciesController.findAllTranslated('it');
      species = speciesService.ToSpeciesDto(
        await speciesService.createSpecies(speciesService.ToSpecies(species)),
      );
      expect(result.length).toBe(0);
    });
  });

  describe('findOne', () => {
    it('Should return one species', async () => {
      const result = await speciesController.findOne(species.id.toString());

      expect(result).toStrictEqual(species);
    });

    it('Should throw a bad request', async () => {
      try {
        await speciesController.findOne('-1');
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe(ERROR_INVALID_SPECIES);
      }
    });
  });

  describe('findOneTranslated', () => {
    it('Should return one species', async () => {
      const result = await speciesController.findOneTranslated(
        'fr',
        species.id.toString(),
      );

      expect(result.name).toStrictEqual(species.fr);
    });

    it('Should throw a bad request', async () => {
      try {
        await speciesController.findOneTranslated('fr', '-1');
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe(ERROR_INVALID_SPECIES);
      }
    });
  });

  describe('create', () => {
    it('Should create the species', async () => {
      const createSpecies: CreateSpeciesDto = {
        fr: 'fr',
        en: 'en',
        de: 'de',
        it: 'it',
      };

      const newSpecies = await speciesController.create(createSpecies, {
        user: adminMember,
      });

      expect(newSpecies.de).toBe(createSpecies.de);
      expect(newSpecies.fr).toBe(createSpecies.fr);
      expect(newSpecies.en).toBe(createSpecies.en);
      expect(newSpecies.it).toBe(createSpecies.it);
    });

    it('Should throw an unauthorize exception', async () => {
      const createSpecies: CreateSpeciesDto = {
        fr: 'fr',
        en: 'en',
        de: 'de',
        it: 'it',
      };
      try {
        await speciesController.create(createSpecies, {
          user: {},
        });

        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('Unauthorized');
      }
    });
  });

  describe('update', () => {
    it('Should update the species', async () => {
      const updateSpecies: UpdateSpeciesDto = {
        id: species.id,
        fr: 'updatedfr',
        en: 'updateden',
        de: 'updatedde',
        it: 'updatedit',
      };

      const response = await speciesController.update(updateSpecies, {
        user: adminMember,
      });

      expect(response.message).toBe(RESPONSE_SPECIES_UPDATED);
    });

    it('Should throw an unauthorize exception', async () => {
      const updateSpecies = {
        id: species.id,
        fr: 'updatedfr',
        en: 'updateden',
        de: 'updatedde',
        it: 'updatedit',
      };
      try {
        await speciesController.update(updateSpecies, {
          user: {},
        });

        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('Unauthorized');
      }
    });
  });

  describe('deleteOne', () => {
    it('Should delete the species', async () => {
      const del = await speciesService.findAllSpecies();

      const response = await speciesController.deleteOne(del[0].id.toString(), {
        user: adminMember,
      });

      expect(response.message).toBe(RESPONSE_SPECIES_DELETED);
    });

    it('Should throw an unauthorize exception', async () => {
      const del = await speciesService.findAllSpecies();
      try {
        await speciesController.deleteOne(del[0].id.toString(), {
          user: {},
        });

        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('Unauthorized');
      }
    });
  });
});
