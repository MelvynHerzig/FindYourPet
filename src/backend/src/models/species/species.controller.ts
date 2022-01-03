import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
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

/**
 * Race controller
 */
@Controller('species')
export class SpeciesController {
  constructor(private speciesService: SpeciesService) {}

  /******************* GET    ************************/
  // For example http://localhost:3000/species/fr
  // Answer [{ "id": 25, "name": "chien" }, { "id": 25, "name": "chat" }, ... ]
  @Get('/:lang')
  async findAllTranslated(@Param('lang') lang: string): Promise<Species[]> {
    return this.speciesService.findAllSpeciesTranslated(lang);
  }

  @Get('/:lang/:id')
  async findOneTranslated(
    @Param('lang') lang: string,
    @Param('id') id: string,
  ): Promise<Species> {
    return this.speciesService.findOneSpeciesTranslated(parseInt(id), lang);
  }

  /******************* POST   ************************/
  @Post()
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new CreateSpeciesPolicyhandler())
  create(@Body() species: CreateSpeciesDto): Promise<Species> {
    return this.speciesService.createSpecies(species);
  }

  /******************* PUT    ************************/
  @Put()
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new UpdateSpeciesPolicyhandler())
  update(@Body() species: UpdateSpeciesDto): Promise<UpdateResult> {
    return this.speciesService.updateSpecies(species);
  }

  /******************* DELETE ************************/
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new DeleteSpeciesPolicyhandler())
  deleteOne(@Param('id') id: string): Promise<DeleteResult> {
    return this.speciesService.deleteSpecies(parseInt(id));
  }
}
