import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesInterface } from './species.interface';
import { Observable } from 'rxjs';

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

  @Get()
  findAll(): Observable<SpeciesInterface[]> {
    return this.speciesService.findAllSpecies();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<SpeciesInterface> {
    return this.speciesService.findOneSpeciesById(parseInt(id));
  }

  @Put()
  update(@Body() species: SpeciesInterface) {
    return this.speciesService.updateSpecies(species);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.speciesService.deleteSpecies(parseInt(id));
  }
}
