import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsInterface } from './models/animals.interface';
import { Observable } from 'rxjs';

@Controller('animals')
export class AnimalsController {
  constructor(private animalService: AnimalsService) {}

  @Post()
  create(@Body() animal: AnimalsInterface): Observable<AnimalsInterface> {
    return this.animalService.createAnimal(animal);
  }

  @Get()
  findAll(): Observable<AnimalsInterface[]> {
    return this.animalService.findAllAnimals();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<AnimalsInterface> {
    return this.animalService.findOneAnimalById(parseInt(id));
  }

  @Put()
  update(@Body() animal: AnimalsInterface) {
    return this.animalService.updateAnimal(animal);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.animalService.deleteAnimal(parseInt(id));
  }
}
