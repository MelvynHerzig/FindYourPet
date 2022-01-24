import { Member } from '../models/members/entities/members.entity';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { CreateMemberDto } from '../models/members/dto/create.members.dto';
import { RegistrationsStatus } from './dto/registration.status.dto';
import { forwardRef } from '@nestjs/common';
import { MembersModule } from '../models/members/members.module';
import exp from 'constants';
import { MembersService } from '../models/members/members.service';
import { LoginStatus } from './dto/login.status.dto';
import { ERROR_USER_NOT_FOUND } from '../error/error-message';

describe('AuthController', () => {
  let authController: AuthController;
  let memberService: MembersService;

  const member: CreateMemberDto = {
    firstname: 'John',
    name: 'Doe',
    email: 'auth@test.ch',
    street: 'Route de Cheseaux 1',
    NPA: 1400,
    city: 'Yverdon-les-Bains',
    phone: '+41 00 000 00 00',
    password: 'My1stSuperP@assword',
    confirmPassword: 'My1stSuperP@assword',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        forwardRef(() => MembersModule),
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
      exports: [JwtModule],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    memberService = moduleRef.get<MembersService>(MembersService);
  });

  afterAll(async () => {
    try {
      const m = await memberService.findOne({ email: member.email });
      await memberService.delete(m.id);
    } catch (e) {}
  });

  describe('register', () => {
    it('Should return the response that member is created', async () => {
      const result = await authController.register(member);

      const wanted: RegistrationsStatus = {
        success: true,
        message: 'member registered',
      };

      expect(result).toStrictEqual(wanted);
    });

    it('Should return the error that member already exist', async () => {
      try {
        await authController.register(member);
        expect(true).toStrictEqual(false);
      } catch (e) {
        expect(e.message).toBe('Http Exception');
      }
    });
  });

  describe('login', () => {
    it('Should return response result with jwt token', async () => {
      const result = await authController.login({
        email: member.email,
        password: member.password,
      });
      expect(result.email).toBe(member.email);
    });

    it('Should return response that member successfully updated when yourself', async () => {
      try {
        await authController.login({
          email: 'bad@email.com',
          password: member.password,
        });
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe(ERROR_USER_NOT_FOUND);
      }
    });
  });
});
