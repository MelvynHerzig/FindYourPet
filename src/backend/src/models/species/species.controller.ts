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
import { SpeciesService } from './species.service';
import { SpeciesInterface } from './species.interface';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { isSupportedLangAbr } from './species.utils';
import { ERROR_LANGUAGE } from '../../error/error-message';

/**
 * Race controller
 */
@Controller('species')
export class SpeciesController {
  constructor(private speciesService: SpeciesService) {}

  @Post()
  create(@Body() species: SpeciesInterface): Observable<SpeciesInterface> {
    return this.speciesService.createSpecies(species);
  }

  // For example http://localhost:3000/species/fr
  // Answer [{ "id": 25, "name": "chien" }, { "id": 25, "name": "chat" }, ... ]
  @Get('/:lang')
  async findAll(@Param('lang') lang: string): Promise<SpeciesInterface[]> {
    if (!isSupportedLangAbr(lang)) {
      throw new HttpException(ERROR_LANGUAGE, HttpStatus.NOT_FOUND);
    }

    // Getting species and keeping only desired language
    const species = await this.speciesService.findAllSpecies();
    species.map((sp) => (sp.name = JSON.parse(sp.name)[lang]));
    return species;
  }

  @Get('/:lang/:id')
  async findOne(
    @Param('lang') lang: string,
    @Param('id') id: string,
  ): Promise<SpeciesInterface> {
    if (!isSupportedLangAbr(lang)) {
      throw new HttpException(ERROR_LANGUAGE, HttpStatus.NOT_FOUND);
    }

    const species = await this.speciesService.findOneSpeciesById(parseInt(id));
    species.name = JSON.parse(species.name)[lang];
    return species;
  }

  @Put()
  update(@Body() species: SpeciesInterface) {
    return this.speciesService.updateSpecies(species);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteOne(@Param('id') id: string) {
    return this.speciesService.deleteSpecies(parseInt(id));
  }
}
