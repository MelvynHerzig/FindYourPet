import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SpeciesService } from './species.service';
import { AuthGuard } from '@nestjs/passport';
import {
  CheckPolicies,
  PoliciesGuard,
} from '../../security/policy/policy.guard';
import { CreateSpeciesDto } from './dto/create.species.dto';
import { Species } from './entities/species.entity';
import { UpdateSpeciesDto } from './dto/update.species.dto.js';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  CreateSpeciesPolicyhandler,
  DeleteSpeciesPolicyhandler,
  UpdateSpeciesPolicyhandler,
} from '../../security/policy/handler/species.policyhandler';
import { SpeciesDto, ToSpecies, ToSpeciesDto } from './dto/species.dto';
import {
  ToTranslatedSpeciesDto,
  TranslatedSpeciesDto,
} from './dto/translated.species.dto.js';

/**
 * Race controller
 */
@Controller('species')
export class SpeciesController {
  constructor(private speciesService: SpeciesService) {}

  /******************* GET    ************************/

  @Get()
  async findAll(): Promise<SpeciesDto[]> {
    return (await this.speciesService.findAllSpecies()).map((sp) =>
      ToSpeciesDto(sp),
    );
  }

  // For example http://localhost:3000/species/fr
  // Answer [{ "id": 25, "name": "chien" }, { "id": 25, "name": "chat" }, ... ]
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
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new CreateSpeciesPolicyhandler())
  async create(@Body() species: CreateSpeciesDto): Promise<SpeciesDto> {
    return ToSpeciesDto(
      await this.speciesService.createSpecies(
        ToSpecies({ ...species, id: undefined }),
      ),
    );
  }

  /******************* PUT    ************************/
  @Put()
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new UpdateSpeciesPolicyhandler())
  update(@Body() species: UpdateSpeciesDto): Promise<UpdateResult> {
    return this.speciesService.updateSpecies(ToSpecies(species));
  }

  /******************* DELETE ************************/
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new DeleteSpeciesPolicyhandler())
  deleteOne(@Param('id') id: string): Promise<DeleteResult> {
    return this.speciesService.deleteSpecies(parseInt(id));
  }
}
