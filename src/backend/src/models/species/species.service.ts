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
    private readonly raceRepository: Repository<SpeciesEntity>,
  ) {
    const dogR = new SpeciesEntity();
    dogR.name = 'dog';
    raceRepository.save(dogR).catch((err) => console.log(err));

    const catR = new SpeciesEntity();
    catR.name = 'cat';
    raceRepository.save(catR).catch((err) => console.log(err));

    const birdR = new SpeciesEntity();
    birdR.name = 'bird';
    raceRepository.save(birdR).catch((err) => console.log(err));

    const reptileR = new SpeciesEntity();
    reptileR.name = 'reptile';
    raceRepository.save(reptileR).catch((err) => console.log(err));

    const horseR = new SpeciesEntity();
    horseR.name = 'horse';
    raceRepository.save(horseR).catch((err) => console.log(err));

    const fishR = new SpeciesEntity();
    fishR.name = 'fish';
    raceRepository.save(fishR).catch((err) => console.log(err));

    const rabbitR = new SpeciesEntity();
    rabbitR.name = 'rabbit';
    raceRepository.save(rabbitR).catch((err) => console.log(err));

    const poultryR = new SpeciesEntity();
    poultryR.name = 'poultry';
    raceRepository.save(poultryR).catch((err) => console.log(err));

    const hamsterR = new SpeciesEntity();
    hamsterR.name = 'hamster';
    raceRepository.save(hamsterR).catch((err) => console.log(err));

    const guineaPigR = new SpeciesEntity();
    guineaPigR.name = 'guinea pig';
    raceRepository.save(guineaPigR).catch((err) => console.log(err));

    const ferretR = new SpeciesEntity();
    ferretR.name = 'ferret';
    raceRepository.save(ferretR).catch((err) => console.log(err));

    const otherR = new SpeciesEntity();
    otherR.name = 'other';
    raceRepository.save(otherR).catch((err) => console.log(err));
  }

  createRace(race: SpeciesInterface): Observable<SpeciesInterface> {
    return from(this.raceRepository.save(race));
  }

  findAllRace(): Observable<SpeciesInterface[]> {
    return from(this.raceRepository.find());
  }

  findOneRaceById(id: number): Observable<SpeciesInterface> {
    return from(this.raceRepository.findOne(id));
  }

  updateRace(race: SpeciesInterface) {
    return from(this.raceRepository.update(race.id, race));
  }

  deleteRace(id: number) {
    return from(this.raceRepository.delete(id));
  }
}
