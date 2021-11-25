import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RaceEntity } from '../entity/race.entity';
import { RaceInterface } from '../entity/race.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';

/**
 * Service to query race
 */
@Injectable()
export class RaceService {
  constructor(
    @InjectRepository(RaceEntity)
    private readonly raceRepository: Repository<RaceEntity>,
  ) {
    const dogR = new RaceEntity();
    dogR.name = 'dog';
    raceRepository.save(dogR).catch((err) => console.log(err));

    const catR = new RaceEntity();
    catR.name = 'cat';
    raceRepository.save(catR).catch((err) => console.log(err));

    const birdR = new RaceEntity();
    birdR.name = 'bird';
    raceRepository.save(birdR).catch((err) => console.log(err));

    const reptileR = new RaceEntity();
    reptileR.name = 'reptile';
    raceRepository.save(reptileR).catch((err) => console.log(err));

    const horseR = new RaceEntity();
    horseR.name = 'horse';
    raceRepository.save(horseR).catch((err) => console.log(err));

    const fishR = new RaceEntity();
    fishR.name = 'fish';
    raceRepository.save(fishR).catch((err) => console.log(err));

    const rabbitR = new RaceEntity();
    rabbitR.name = 'rabbit';
    raceRepository.save(rabbitR).catch((err) => console.log(err));

    const poultryR = new RaceEntity();
    poultryR.name = 'poultry';
    raceRepository.save(poultryR).catch((err) => console.log(err));

    const hamsterR = new RaceEntity();
    hamsterR.name = 'hamster';
    raceRepository.save(hamsterR).catch((err) => console.log(err));

    const guineaPigR = new RaceEntity();
    guineaPigR.name = 'guinea pig';
    raceRepository.save(guineaPigR).catch((err) => console.log(err));

    const ferretR = new RaceEntity();
    ferretR.name = 'ferret';
    raceRepository.save(ferretR).catch((err) => console.log(err));

    const otherR = new RaceEntity();
    otherR.name = 'other';
    raceRepository.save(otherR).catch((err) => console.log(err));
  }

  createRace(race: RaceInterface): Observable<RaceInterface> {
    return from(this.raceRepository.save(race));
  }

  findAllRace(): Observable<RaceInterface[]> {
    return from(this.raceRepository.find());
  }

  findOneRaceById(id: number): Observable<RaceInterface> {
    return from(this.raceRepository.findOne(id));
  }

  updateRace(race: RaceInterface) {
    return from(this.raceRepository.update(race.id, race));
  }

  deleteRace(id: number) {
    return from(this.raceRepository.delete(id));
  }
}
