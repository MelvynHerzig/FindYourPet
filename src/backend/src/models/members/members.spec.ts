import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { Test } from '@nestjs/testing';
import { Member } from './entities/members.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdvertsModule } from '../adverts/adverts.module';
import { CaslAbilityFactory } from '../../security/casl/casl-ability.factory';
import { forwardRef } from '@nestjs/common';
import { ToMemberDto } from './dto/members.dto';
import { UpdateMemberDto } from './dto/update.members.dto';
import {
  HttpResponse,
  RESPONSE_MEMBER_DELETED,
  RESPONSE_MEMBER_UPDATED,
} from '../response';

describe('MembersController', () => {
  let membersController: MembersController;
  let membersService: MembersService;

  let randomMember: Member = {
    id: undefined,
    location: undefined,
    firstname: 'John',
    name: 'Doe',
    email: 'john@doe.ch',
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
    email: 'bip@doe.ch',
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
        TypeOrmModule.forFeature([Member]),
        forwardRef(() => AdvertsModule),
      ],
      controllers: [MembersController],
      providers: [MembersService, CaslAbilityFactory],
      exports: [MembersService],
    }).compile();

    membersController = moduleRef.get<MembersController>(MembersController);
    membersService = moduleRef.get<MembersService>(MembersService);

    await membersService.setMemberLocation(randomMember);
    await membersService.setMemberLocation(randomMember2);
    randomMember = await membersService.create(randomMember);
    randomMember2 = await membersService.create(randomMember2);

    try {
      adminMember = await membersService.create(adminMember);
      await membersService.setMemberLocation(adminMember);
    } catch (e) {}
  });

  describe('findOneByEmail', () => {
    it('Should return unauthorized exception when not granted', async () => {
      try {
        await membersController.findOneByEmail('john@doe.ch', {
          user: { email: 'contact@findyourpet.ch' },
        });
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('Unauthorized');
      }
    });

    it('Should return the member information when yourself', async () => {
      const user = await membersController.findOneByEmail('john@doe.ch', {
        user: { email: randomMember.email, id: randomMember.id },
      });

      expect(user).toStrictEqual(ToMemberDto(randomMember));
    });

    it('Should return the member information when admin', async () => {
      const user = await membersController.findOneByEmail('john@doe.ch', {
        user: { email: adminMember.email, id: adminMember.id, isAdmin: true },
      });

      expect(user).toStrictEqual(ToMemberDto(randomMember));
    });
  });

  describe('update', () => {
    it('Should return unauthorized exception when not granted', async () => {
      const update: UpdateMemberDto = {
        id: randomMember.id,
        firstname: 'Joe',
        name: 'Doe',
        email: 'joe@doe.ch',
        street: 'Route de Cheseaux 1',
        NPA: 1400,
        city: 'Yverdon-les-Bains',
        phone: '+41 00 000 00 00',
      };

      try {
        await membersController.update(update, {
          user: { email: 'contact@findyourpet.ch' },
        });
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('Unauthorized');
      }
    });

    it('Should return response that member successfully updated when yourself', async () => {
      const update: UpdateMemberDto = {
        id: randomMember.id,
        firstname: 'Joe',
        name: 'Doe',
        email: 'joe@doe.ch',
        street: 'Route de Cheseaux 1',
        NPA: 1400,
        city: 'Yverdon-les-Bains',
        phone: '+41 00 000 00 00',
      };
      const response = await membersController.update(update, {
        user: { email: randomMember.email, id: randomMember.id },
      });

      const wanted: HttpResponse = {
        success: true,
        message: RESPONSE_MEMBER_UPDATED,
      };

      expect(response).toStrictEqual(wanted);
    });

    it('Should return response that member successfully updated when admin', async () => {
      const update: UpdateMemberDto = {
        id: randomMember2.id,
        firstname: 'Joe',
        name: 'Doe',
        email: 'joe2@doe.ch',
        street: 'Route de Cheseaux 1',
        NPA: 1400,
        city: 'Yverdon-les-Bains',
        phone: '+41 00 000 00 00',
      };
      const response = await membersController.update(update, {
        user: { email: adminMember.email, id: adminMember.id, isAdmin: true },
      });

      const wanted: HttpResponse = {
        success: true,
        message: RESPONSE_MEMBER_UPDATED,
      };

      expect(response).toStrictEqual(wanted);
    });
  });

  describe('delete', () => {
    it('Should return unauthorized exception when not granted', async () => {
      try {
        await membersController.delete(randomMember.id, {
          user: { email: 'contact@findyourpet.ch' },
        });
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('Unauthorized');
      }
    });

    it('Should return response that member successfully deleted when yourself', async () => {
      const response = await membersController.delete(randomMember.id, {
        user: { email: randomMember, id: randomMember.id },
      });

      const wanted: HttpResponse = {
        success: true,
        message: RESPONSE_MEMBER_DELETED,
      };

      expect(response).toStrictEqual(wanted);
    });

    it('Should return response that member successfully deleted when admin', async () => {
      const response = await membersController.delete(randomMember2.id, {
        user: { email: adminMember.email, id: adminMember.id, isAdmin: true },
      });

      const wanted: HttpResponse = {
        success: true,
        message: RESPONSE_MEMBER_DELETED,
      };

      expect(response).toStrictEqual(wanted);
    });
  });
});
