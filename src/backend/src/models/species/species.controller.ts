import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { SpeciesService } from './species.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateSpeciesDto } from './dto/create.species.dto';
import { Species } from './entities/species.entity';
import { UpdateSpeciesDto } from './dto/update.species.dto.js';
import { DeleteResult, UpdateResult } from 'typeorm';
import { SpeciesDto, ToSpecies, ToSpeciesDto } from './dto/species.dto';
import {
  ToTranslatedSpeciesDto,
  TranslatedSpeciesDto,
} from './dto/translated.species.dto.js';
import {
  Action,
  CaslAbilityFactory,
} from '../../security/casl/casl-ability.factory';

/**
 * Race controller
 */
@Controller('species')
export class SpeciesController {
  constructor(
    private speciesService: SpeciesService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  /******************* GET    ************************/

  @Get()
  async findAll(): Promise<SpeciesDto[]> {
    return (await this.speciesService.findAllSpecies()).map((sp) =>
      ToSpeciesDto(sp),
    );
  }

  @Get(':lang')
  async findAllTranslated(
    @Param('lang') lang: string,
  ): Promise<TranslatedSpeciesDto[]> {
    return (await this.speciesService.findAllSpecies()).map((sp) =>
      ToTranslatedSpeciesDto(sp, lang),
    );
  }

  @Get('id/:id')
  async findOne(@Param('id') id: string): Promise<SpeciesDto> {
    return ToSpeciesDto(
      await this.speciesService.findOneSpeciesById(parseInt(id)),
    );
  }

  @Get(':lang/id/:id')
  async findOneTranslated(
    @Param('lang') lang: string,
    @Param('id') id: string,
  ): Promise<TranslatedSpeciesDto> {
    return ToTranslatedSpeciesDto(
      await this.speciesService.findOneSpeciesById(parseInt(id)),
      lang,
    );
  }

  /******************* POST   ************************/
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() species: CreateSpeciesDto,
    @Req() req,
  ): Promise<SpeciesDto> {
    const ability = this.caslAbilityFactory.createForMember(req.user);

    if (ability.can(Action.Create, Species)) {
      return ToSpeciesDto(
        await this.speciesService.createSpecies(
          ToSpecies({ ...species, id: undefined }),
        ),
      );
    }
    throw new UnauthorizedException();
  }

  /******************* PUT    ************************/
  @Put()
  @UseGuards(AuthGuard('jwt'))
  update(@Body() species: UpdateSpeciesDto, @Req() req): Promise<UpdateResult> {
    const ability = this.caslAbilityFactory.createForMember(req.user);

    if (ability.can(Action.Update, Species)) {
      return this.speciesService.updateSpecies(ToSpecies(species));
    }
    throw new UnauthorizedException();
  }

  /******************* DELETE ************************/
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteOne(@Param('id') id: string, @Req() req): Promise<DeleteResult> {
    const ability = this.caslAbilityFactory.createForMember(req.user);
    if (ability.can(Action.Delete, Species)) {
      return this.speciesService.deleteSpecies(parseInt(id));
    }
    throw new UnauthorizedException();
  }
}
