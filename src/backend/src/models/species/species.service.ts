import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SpeciesEntity } from './species.entity';
import { SpeciesInterface } from './species.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { jsonStringFromSpecies } from './species.utils';

/**
 * Service to query species
 */
@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(SpeciesEntity)
    private readonly speciesRepository: Repository<SpeciesEntity>,
  ) {
    const dog = new SpeciesEntity();
    dog.name = jsonStringFromSpecies('dog', 'chien', 'Hund', 'cane');
    speciesRepository.save(dog).catch((err) => console.log(err));

    const cat = new SpeciesEntity();
    cat.name = jsonStringFromSpecies('cat', 'chat', 'Katze', 'gatto');
    speciesRepository.save(cat).catch((err) => console.log(err));

    const bird = new SpeciesEntity();
    bird.name = jsonStringFromSpecies('bird', 'oiseau', 'Vogel', 'ucello');
    speciesRepository.save(bird).catch((err) => console.log(err));

    const reptile = new SpeciesEntity();
    reptile.name = jsonStringFromSpecies(
      'reptile',
      'reptile',
      'Reptil',
      'rettile',
    );
    speciesRepository.save(reptile).catch((err) => console.log(err));

    const horse = new SpeciesEntity();
    horse.name = jsonStringFromSpecies('horse', 'cheval', 'Pferd', 'cavallo');
    speciesRepository.save(horse).catch((err) => console.log(err));

    const fishJson = new SpeciesEntity();
    fishJson.name = jsonStringFromSpecies('fish', 'poisson', 'Fisch', 'pesce');
    speciesRepository.save(fishJson).catch((err) => console.log(err));

    const rabbit = new SpeciesEntity();
    rabbit.name = jsonStringFromSpecies('rabbit', 'lapin', 'Hase', 'coniglio');
    speciesRepository.save(rabbit).catch((err) => console.log(err));

    const poultry = new SpeciesEntity();
    poultry.name = jsonStringFromSpecies(
      'poultry',
      'volaille',
      'Geflügel',
      'pollame',
    );
    speciesRepository.save(poultry).catch((err) => console.log(err));

    const hamster = new SpeciesEntity();
    hamster.name = jsonStringFromSpecies(
      'hamster',
      'hamster',
      'Hamster',
      'criceto',
    );
    speciesRepository.save(hamster).catch((err) => console.log(err));

    const guineaPig = new SpeciesEntity();
    guineaPig.name = jsonStringFromSpecies(
      'guinea pig',
      "cochon d'Inde",
      'Meerschweinchen',
      "porcellino d'India",
    );
    speciesRepository.save(guineaPig).catch((err) => console.log(err));

    const ferret = new SpeciesEntity();
    ferret.name = jsonStringFromSpecies(
      'ferret',
      'furet',
      'Frettchen',
      'furetto',
    );
    speciesRepository.save(ferret).catch((err) => console.log(err));

    const other = new SpeciesEntity();
    other.name = jsonStringFromSpecies('other', 'autre', 'Sonstiges', 'Altro');
    speciesRepository.save(other).catch((err) => console.log(err));
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
