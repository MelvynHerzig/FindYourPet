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
import { Adverts } from './entities/adverts.entity';
import { CreateAdvertsDto } from './dto/create.adverts.dto';
import { UpdateAdvertsDto } from './dto/update.adverts.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

/**
 * Advert controller
 */
@Controller('adverts')
export class AdvertsController {
  constructor(private advertService: AdvertsService) {}

  /*******************  GET   ************************/

  @Get('page/:pageNum/:lang')
  async findPage(
    @Param('pageNum') pageNum: string,
    @Param('lang') lang: string,
  ): Promise<Adverts[]> {
    try {
      return this.advertService.findPageAdvert(parseInt(pageNum, 10));
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('id/:id')
  async findOneById(@Param('id') id: string): Promise<Adverts> {
    return this.advertService.findOneAdvertById(parseInt(id));
  }

  @Get('members/:uuid')
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new ManageAdvertsPolicyhandler())
  async findAllByUuid(@Param('uuid') uuid: string): Promise<Adverts[]> {
    return this.advertService.findAllAdvertByUuid(uuid);
  }

  @Get('recent')
  async findTopRecent(): Promise<Adverts[]> {
    return this.advertService.findTop10RecentAdvert();
  }

  @Get('filters/page/:pageNum')
  async findAllByFilter(
    @Body() filterDto: FilterDto,
    @Param('pageNum') pageNum: string,
  ): Promise<Adverts[]> {
    try {
      await this.advertService.checkFilter(filterDto);
      return await this.advertService.filterAdvert(
        filterDto,
        parseInt(pageNum, 10),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /*******************  POST  ************************/

  @Post()
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new CreateAdvertsPolicyhandler())
  async create(@Body() advert: CreateAdvertsDto): Promise<Adverts> {
    console.log(advert);
    return this.advertService.createAdvert(advert);
  }

  /*******************  PUT   ************************/
  @Put()
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new UpdateAdvertsPolicyhandler())
  async update(@Body() advert: UpdateAdvertsDto): Promise<UpdateResult> {
    return this.advertService.updateAdvert(advert);
  }

  /******************* DELETE ************************/
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new DeleteAdvertsPolicyhandler())
  async deleteOne(@Param('id') id: string): Promise<DeleteResult> {
    return this.advertService.deleteAdvert(parseInt(id));
  }
}
