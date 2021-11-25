import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RaceService } from '../service/race.service';
import { RaceInterface } from '../entity/race.interface';
import { Observable } from 'rxjs';

/**
 * Race controller
 */
@Controller('race')
export class RaceController {
  constructor(private raceService: RaceService) {}

  @Post()
  create(@Body() race: RaceInterface): Observable<RaceInterface> {
    return this.raceService.createRace(race);
  }

  @Get()
  findAll(): Observable<RaceInterface[]> {
    return this.raceService.findAllRace();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<RaceInterface> {
    return this.raceService.findOneRaceById(parseInt(id));
  }

  @Put()
  update(@Body() race: RaceInterface) {
    return this.raceService.updateRace(race);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.raceService.deleteRace(parseInt(id));
  }
}
