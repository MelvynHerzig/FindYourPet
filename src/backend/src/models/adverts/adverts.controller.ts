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
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import { AuthGuard } from '@nestjs/passport';
import { FilterDto } from './dto/filters.dto';
import {
  Action,
  CaslAbilityFactory,
} from '../../security/casl/casl-ability.factory';
import { AdvertDto } from './dto/advert.dto';
import { UpdateAdvertDto } from './dto/update.adverts.dto';
import { CreateAdvertDto } from './dto/create.adverts.dto';
import { Advert } from './entities/adverts.entity';
import { HttpResponse } from '../response';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ERROR_NOT_AUTHORIZED } from '../../error/error-message';

/**
 * Advert controller
 */
@ApiTags('adverts')
@Controller('adverts')
/**
 * Controller for the adverts
 * @author Berney Alec, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
export class AdvertsController {
  constructor(
    private advertService: AdvertsService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  /*******************  GET   ************************/
  @ApiParam({
    name: 'pageNum',
    required: true,
    description: 'No of the page to retrieve',
  })
  @ApiParam({
    name: 'lang',
    required: true,
    description: 'Language in which translate the advert',
  })
  @ApiResponse({
    status: 200,
    description:
      'List of the adverts of the specified page, translated in the specified language. Member property is shown only if logged',
    type: [AdvertDto],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'At least one parameter is invalid',
  })
  @Get(':lang/page/:pageNum')
  async findPage(
    @Param('pageNum') pageNum: string,
    @Param('lang') lang: string,
    @Request() req,
  ): Promise<AdvertDto[]> {
    const member = await this.advertService.verifyJwt(req);

    try {
      return this.advertService.ToAdvertsDto(
        await this.advertService.findPageAdvert(parseInt(pageNum, 10)),
        lang,
        member,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of the advert to retrieve',
  })
  @ApiParam({
    name: 'lang',
    required: true,
    description: 'Language in which translate the advert',
  })
  @ApiResponse({
    status: 200,
    description:
      'Advert corresponding to the id sent, translated in the specified language. Member property is shown only if logged',
    type: AdvertDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'At least one parameter is invalid',
  })
  @Get(':lang/id/:id')
  async findOneById(
    @Param('id') id: string,
    @Param('lang') lang: string,
    @Request() req,
  ): Promise<AdvertDto> {
    const email = await this.advertService.verifyJwt(req);
    return this.advertService.ToAdvertDto(
      await this.advertService.findOneAdvertById(parseInt(id)),
      lang,
      email,
    );
  }

  @ApiParam({
    name: 'uuid',
    required: true,
    description: 'uuid of the member',
  })
  @ApiParam({
    name: 'lang',
    required: true,
    description: 'Language in which translate the advert',
  })
  @ApiResponse({
    status: 200,
    description:
      'List of the adverts of the specified user, translated in the specified language. Member property is shown only if logged',
    type: [AdvertDto],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'At least one parameter is invalid',
  })
  @Get(':lang/members/:uuid')
  @UseGuards(AuthGuard('jwt'))
  async findAllByUuid(
    @Param('uuid') uuid: string,
    @Param('lang') lang: string,
    @Req() req,
  ): Promise<AdvertDto[]> {
    return this.advertService.ToAdvertsDto(
      await this.advertService.findAllAdvertByUuid(uuid),
      lang,
      req.user,
    );
  }

  @ApiParam({
    name: 'lang',
    required: true,
    description: 'Language in which translate the advert',
  })
  @ApiResponse({
    status: 200,
    description:
      'List of the top 10 recent adverts, translated in the specified language. Member property is shown only if logged',
    type: [AdvertDto],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'At least one parameter is invalid',
  })
  @Get(':lang/recent')
  async findTopRecent(
    @Param('lang') lang: string,
    @Request() req,
  ): Promise<AdvertDto[]> {
    try {
      const email = await this.advertService.verifyJwt(req);
      return this.advertService.ToAdvertsDto(
        await this.advertService.findTop10RecentAdvert(),
        lang,
        email,
      );
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiParam({
    name: 'pageNum',
    required: true,
    description: 'No of the page to retrieve',
  })
  @ApiParam({
    name: 'lang',
    required: true,
    description: 'Language in which translate the advert',
  })
  @ApiBody({
    type: FilterDto,
  })
  @ApiResponse({
    status: 200,
    description:
      'List of the adverts filtered of the specified page, translated in the specified language. Member property is shown only if logged',
    type: [AdvertDto],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'At least one parameter is invalid',
  })
  @Get(':lang/filters/page/:pageNum')
  async findAllByFilter(
    @Body() filterDto: FilterDto,
    @Param('pageNum') pageNum: string,
    @Param('lang') lang: string,
    @Request() req,
  ): Promise<AdvertDto[]> {
    try {
      await this.advertService.checkFilter(filterDto);
      const member = await this.advertService.verifyJwt(req);
      return this.advertService.ToAdvertsDto(
        await this.advertService.filterAdvert(
          filterDto,
          parseInt(pageNum, 10),
          member,
        ),
        lang,
        member,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /*******************  POST  ************************/
  @ApiBody({
    type: CreateAdvertDto,
  })
  @ApiCreatedResponse({
    description: 'The newly created advert is returned',
    type: AdvertDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "The content of the body doesn't match requirement",
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'JWT of logged user is missing',
  })
  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() advert: CreateAdvertDto,
    @Req() req,
  ): Promise<AdvertDto> {
    try {
      const ability = this.caslAbilityFactory.createForMember(req.user);
      if (ability.can(Action.Create, Advert)) {
        advert.memberId = req.user.id;
        return this.advertService.ToAdvertDto(
          await this.advertService.createAdvert(
            this.advertService.ToAdvert(advert),
          ),
          undefined,
          req.user,
        );
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
    throw new HttpException(ERROR_NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
  }

  /*******************  PUT   ************************/
  @ApiBody({
    type: UpdateAdvertDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The status of the update',
    type: HttpResponse,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "The content of the body doesn't match requirement",
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'JWT of logged user is missing',
  })
  @ApiBearerAuth()
  @Put()
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Body() updatedAdvert: UpdateAdvertDto,
    @Req() req,
  ): Promise<HttpResponse> {
    try {
      const ability = this.caslAbilityFactory.createForMember(req.user);
      const advert = await this.advertService.findOneAdvertById(
        updatedAdvert.id,
      );
      if (ability.can(Action.Update, advert)) {
        updatedAdvert.memberId = advert.memberId;
        return await this.advertService.updateAdvert(
          this.advertService.ToAdvert(updatedAdvert),
        );
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
    throw new HttpException(ERROR_NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
  }

  /******************* DELETE ************************/
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of the advert to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The status of the deletion',
    type: HttpResponse,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The parameter is invalid',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'JWT of logged user is missing',
  })
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteOne(@Param('id') id: number, @Req() req): Promise<HttpResponse> {
    try {
      const ability = this.caslAbilityFactory.createForMember(req.user);

      if (
        ability.can(
          Action.Delete,
          await this.advertService.findOneAdvertById(id),
        )
      ) {
        return this.advertService.deleteAdvert(id);
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
    throw new HttpException(ERROR_NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
  }
}
