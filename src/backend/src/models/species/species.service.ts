import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SpeciesEntity } from './species.entity';
import { SpeciesInterface } from './species.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';

/**
 * Service to query species
 */
@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(SpeciesEntity)
    private readonly speciesRepository: Repository<SpeciesEntity>,
  ) {
    const dogR = new SpeciesEntity();
    dogR.name = 'dog';
    speciesRepository.save(dogR).catch((err) => console.log(err));

    const catR = new SpeciesEntity();
    catR.name = 'cat';
    speciesRepository.save(catR).catch((err) => console.log(err));

    const birdR = new SpeciesEntity();
    birdR.name = 'bird';
    speciesRepository.save(birdR).catch((err) => console.log(err));

    const reptileR = new SpeciesEntity();
    reptileR.name = 'reptile';
    speciesRepository.save(reptileR).catch((err) => console.log(err));

    const horseR = new SpeciesEntity();
    horseR.name = 'horse';
    speciesRepository.save(horseR).catch((err) => console.log(err));

    const fishR = new SpeciesEntity();
    fishR.name = 'fish';
    speciesRepository.save(fishR).catch((err) => console.log(err));

    const rabbitR = new SpeciesEntity();
    rabbitR.name = 'rabbit';
    speciesRepository.save(rabbitR).catch((err) => console.log(err));

    const poultryR = new SpeciesEntity();
    poultryR.name = 'poultry';
    speciesRepository.save(poultryR).catch((err) => console.log(err));

    const hamsterR = new SpeciesEntity();
    hamsterR.name = 'hamster';
    speciesRepository.save(hamsterR).catch((err) => console.log(err));

    const guineaPigR = new SpeciesEntity();
    guineaPigR.name = 'guinea pig';
    speciesRepository.save(guineaPigR).catch((err) => console.log(err));

    const ferretR = new SpeciesEntity();
    ferretR.name = 'ferret';
    speciesRepository.save(ferretR).catch((err) => console.log(err));

    const otherR = new SpeciesEntity();
    otherR.name = 'other';
    speciesRepository.save(otherR).catch((err) => console.log(err));
  }

  createSpecies(species: SpeciesInterface): Observable<SpeciesInterface> {
    return from(this.speciesRepository.save(species));
  }

  findAllSpecies(): Observable<SpeciesInterface[]> {
    return from(this.speciesRepository.find());
  }

  findOneSpeciesById(id: number): Observable<SpeciesInterface> {
    return from(this.speciesRepository.findOne(id));
  }

  updateSpecies(species: SpeciesInterface) {
    return from(this.speciesRepository.update(species.id, species));
  }

  deleteSpecies(id: number) {
    return from(this.speciesRepository.delete(id));
  }
}
