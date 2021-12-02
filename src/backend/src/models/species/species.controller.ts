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
  constructor(private raceService: SpeciesService) {}

  @Post()
  create(@Body() race: SpeciesInterface): Observable<SpeciesInterface> {
    return this.raceService.createRace(race);
  }

  @Get()
  findAll(): Observable<SpeciesInterface[]> {
    return this.raceService.findAllRace();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<SpeciesInterface> {
    return this.raceService.findOneRaceById(parseInt(id));
  }

  @Put()
  update(@Body() race: SpeciesInterface) {
    return this.raceService.updateRace(race);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.raceService.deleteRace(parseInt(id));
  }
}
