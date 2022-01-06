import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import {
  CreateAdvertsPolicyhandler,
  DeleteAdvertsPolicyhandler,
  ManageAdvertsPolicyhandler,
  UpdateAdvertsPolicyhandler,
} from '../../security/policy/handler/adverts.policyhandler';
import {
  CheckPolicies,
  PoliciesGuard,
} from '../../security/policy/policy.guard';
import { AuthGuard } from '@nestjs/passport';
import { FilterDto } from './dto/filters.dto';
import { CreateAdvertDto } from './dto/create.adverts.dto';
import { UpdateAdvertDto } from './dto/update.adverts.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AdvertDto } from './dto/advert.dto';
import { ExtractJwt } from 'passport-jwt';
import { isJWT } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../../auth/jwt.strategy';

/**
 * Advert controller
 */
@Controller('adverts')
export class AdvertsController {
  constructor(private advertService: AdvertsService) {}

  /*******************  GET   ************************/

  @Get(':lang/page/:pageNum')
  async findPage(
    @Param('pageNum') pageNum: string,
    @Param('lang') lang: string,
    @Request() req,
  ): Promise<AdvertDto[]> {
    try {
      const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      return this.advertService.ToAdvertsDto(
        await this.advertService.findPageAdvert(parseInt(pageNum, 10)),
        lang,
        isJWT(jwt),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':lang/id/:id')
  async findOneById(
    @Param('id') id: string,
    @Param('lang') lang: string,
    @Request() req,
  ): Promise<AdvertDto> {
    const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    isJWT(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF1ZW50aW5AZ21haWwuY29tIiwiaWF0IjoxNjQxNDcxMDg5LCJleHAiOjE2NDE0NzE5ODl9.8lqHYFD8mbbD2vrYfpPq5zP21e3TSGaHEzzr9AueKLE',
    );
    return this.advertService.ToAdvertDto(
      await this.advertService.findOneAdvertById(parseInt(id)),
      lang,
      isJWT(jwt),
    );
  }

  @Get(':lang/members/:uuid')
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new ManageAdvertsPolicyhandler())
  async findAllByUuid(
    @Param('uuid') uuid: string,
    @Param('lang') lang: string,
  ): Promise<AdvertDto[]> {
    return this.advertService.ToAdvertsDto(
      await this.advertService.findAllAdvertByUuid(uuid),
      lang,
      true,
    );
  }

  @Get(':lang/recent')
  async findTopRecent(
    @Param('lang') lang: string,
    @Request() req,
  ): Promise<AdvertDto[]> {
    const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    return this.advertService.ToAdvertsDto(
      await this.advertService.findTop10RecentAdvert(),
      lang,
      isJWT(jwt),
    );
  }

  @Get(':lang/filters/page/:pageNum')
  async findAllByFilter(
    @Body() filterDto: FilterDto,
    @Param('pageNum') pageNum: string,
    @Param('lang') lang: string,
    @Request() req,
  ): Promise<AdvertDto[]> {
    try {
      await this.advertService.checkFilter(filterDto);
      const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      return this.advertService.ToAdvertsDto(
        await this.advertService.filterAdvert(filterDto, parseInt(pageNum, 10)),
        lang,
        isJWT(jwt),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /*******************  POST  ************************/

  @Post()
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new CreateAdvertsPolicyhandler())
  async create(
    @Body() advert: CreateAdvertDto,
    @Request() req,
  ): Promise<AdvertDto> {
    const memberId = await req.user.id;

    return this.advertService.ToAdvertDto(
      await this.advertService.createAdvert(
        this.advertService.ToAdvert({ ...advert, memberId: memberId }),
      ),
      'en',
      true,
    );
  }

  /*******************  PUT   ************************/
  @Put()
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new UpdateAdvertsPolicyhandler())
  async update(
    @Body() advert: UpdateAdvertDto,
    @Request() req,
  ): Promise<UpdateResult> {
    return this.advertService.updateAdvert(
      this.advertService.ToAdvert({
        ...advert,
        memberId: await req.user.id,
      }),
    );
  }

  /******************* DELETE ************************/
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new DeleteAdvertsPolicyhandler())
  async deleteOne(@Param('id') id: string): Promise<DeleteResult> {
    return this.advertService.deleteAdvert(parseInt(id));
  }
}
