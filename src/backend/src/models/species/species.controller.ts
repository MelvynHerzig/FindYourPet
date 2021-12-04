import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, UseGuards,
} from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesInterface } from './species.interface';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard('jwt'))
  deleteOne(@Param('id') id: string) {
    return this.speciesService.deleteSpecies(parseInt(id));
  }
}
