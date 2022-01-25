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
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

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

import { SpeciesService } from './species.service';
import { Species } from './entities/species.entity';
import { SpeciesDto } from './dto/species.dto';
import { CreateSpeciesDto } from './dto/create.species.dto';
import { UpdateSpeciesDto } from './dto/update.species.dto';
import { TranslatedSpeciesDto } from './dto/translated.species.dto';

import {
  Action,
  CaslAbilityFactory,
} from '../../security/casl/casl-ability.factory';

import { HttpResponse } from '../response';

/**
 * Species controller
 * @author Alec Berney, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
@ApiTags('species')
@Controller('species')
export class SpeciesController {
  constructor(
    private speciesService: SpeciesService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  /******************* GET    ************************/

  @ApiResponse({
    status: 200,
    description: 'List of all species',
    type: [SpeciesDto],
  })
  @Get()
  async findAll(): Promise<SpeciesDto[]> {
    return (await this.speciesService.findAllSpecies()).map((sp) =>
      this.speciesService.ToSpeciesDto(sp),
    );
  }

  @ApiParam({
    name: 'lang',
    description: 'Language to translate the species',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'List of all species, translated in specified language',
    type: [TranslatedSpeciesDto],
  })
  @ApiBadRequestResponse({
    description: 'Specified language is invalid',
  })
  @Get(':lang')
  async findAllTranslated(
    @Param('lang') lang: string,
  ): Promise<TranslatedSpeciesDto[]> {
    try {
      return (await this.speciesService.findAllSpecies()).map((sp) =>
        this.speciesService.ToTranslatedSpeciesDto(sp, lang),
      );
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiParam({
    name: 'id',
    description: 'Id of the species wanted',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Species specified is returned',
    type: SpeciesDto,
  })
  @ApiBadRequestResponse({
    description: 'The specified id is invalid',
  })
  @Get('id/:id')
  async findOne(@Param('id') id: string): Promise<SpeciesDto> {
    try {
      return this.speciesService.ToSpeciesDto(
        await this.speciesService.findOneSpeciesById(parseInt(id)),
      );
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiParam({
    name: 'id',
    description: 'Id of the species wanted',
    required: true,
  })
  @ApiParam({
    name: 'lang',
    description: 'Language to translate the species',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Species specified is returned and translated',
    type: TranslatedSpeciesDto,
  })
  @ApiBadRequestResponse({
    description: 'The specified id or language is invalid',
  })
  @Get(':lang/id/:id')
  async findOneTranslated(
    @Param('lang') lang: string,
    @Param('id') id: string,
  ): Promise<TranslatedSpeciesDto> {
    try {
      return this.speciesService.ToTranslatedSpeciesDto(
        await this.speciesService.findOneSpeciesById(parseInt(id)),
        lang,
      );
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  /******************* POST   ************************/
  @ApiBody({
    description: 'Information to create the species',
    type: CreateSpeciesDto,
  })
  @ApiCreatedResponse({
    description: 'The species has been successfully created',
    type: SpeciesDto,
  })
  @ApiBadRequestResponse({
    description: 'Body contain an invalid information',
  })
  @ApiUnauthorizedResponse({
    description: 'The JWT is missing, or grant are needed',
  })
  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() species: CreateSpeciesDto,
    @Req() req,
  ): Promise<SpeciesDto> {
    try {
      const ability = this.caslAbilityFactory.createForMember(req.user);

      if (ability.can(Action.Create, Species)) {
        return this.speciesService.ToSpeciesDto(
          await this.speciesService.createSpecies(
            this.speciesService.ToSpecies({ ...species, id: undefined }),
          ),
        );
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
    throw new UnauthorizedException();
  }

  /******************* PUT    ************************/
  @ApiBody({
    description: 'Information to update the species',
    type: UpdateSpeciesDto,
  })
  @ApiCreatedResponse({
    description: 'Status about the update',
    type: HttpResponse,
  })
  @ApiBadRequestResponse({
    description: 'Body contain an invalid information',
  })
  @ApiUnauthorizedResponse({
    description: 'The JWT is missing, or grant are needed',
  })
  @ApiBearerAuth()
  @Put()
  @UseGuards(AuthGuard('jwt'))
  update(@Body() species: UpdateSpeciesDto, @Req() req): Promise<HttpResponse> {
    try {
      const ability = this.caslAbilityFactory.createForMember(req.user);

      if (ability.can(Action.Update, Species)) {
        return this.speciesService.updateSpecies(
          this.speciesService.ToSpecies(species),
        );
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
    throw new UnauthorizedException();
  }

  /******************* DELETE ************************/
  @ApiParam({
    name: 'id',
    description: 'The id of the species to delete',
    required: true,
  })
  @ApiCreatedResponse({
    description: 'Status about the deletion',
    type: HttpResponse,
  })
  @ApiBadRequestResponse({
    description: 'The specified id is invalid',
  })
  @ApiUnauthorizedResponse({
    description: 'The JWT is missing, or grant are needed',
  })
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteOne(@Param('id') id: string, @Req() req): Promise<HttpResponse> {
    try {
      const ability = this.caslAbilityFactory.createForMember(req.user);
      if (ability.can(Action.Delete, Species)) {
        return this.speciesService.deleteSpecies(parseInt(id));
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
    throw new UnauthorizedException();
  }
}
