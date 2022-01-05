import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Species } from './entities/species.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isSupportedLangAbr, jsonStringFromSpecies } from './species.utils';
import {
  ERROR_LANGUAGE,
  FILTER_INVALID_SPECIES,
} from '../../error/error-message';
import { CreateSpeciesDto } from './dto/create.species.dto';
import { UpdateSpeciesDto } from './dto/update.species.dto.js';
import { ToSpecies } from './dto/species.dto';

/**
 * Service to query species
 */
@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
  ) {
    /*const dog = new Species();
    dog.name = jsonStringFromSpecies('dog', 'chien', 'Hund', 'cane');
    speciesRepository.save(dog).catch((err) => console.log(err));

    const cat = new Species();
    cat.name = jsonStringFromSpecies('cat', 'chat', 'Katze', 'gatto');
    speciesRepository.save(cat).catch((err) => console.log(err));

    const bird = new Species();
    bird.name = jsonStringFromSpecies('bird', 'oiseau', 'Vogel', 'ucello');
    speciesRepository.save(bird).catch((err) => console.log(err));

    const reptile = new Species();
    reptile.name = jsonStringFromSpecies(
      'reptile',
      'reptile',
      'Reptil',
      'rettile',
    );
    speciesRepository.save(reptile).catch((err) => console.log(err));

    const horse = new Species();
    horse.name = jsonStringFromSpecies('horse', 'cheval', 'Pferd', 'cavallo');
    speciesRepository.save(horse).catch((err) => console.log(err));

    const fishJson = new Species();
    fishJson.name = jsonStringFromSpecies('fish', 'poisson', 'Fisch', 'pesce');
    speciesRepository.save(fishJson).catch((err) => console.log(err));

    const rabbit = new Species();
    rabbit.name = jsonStringFromSpecies('rabbit', 'lapin', 'Hase', 'coniglio');
    speciesRepository.save(rabbit).catch((err) => console.log(err));

    const poultry = new Species();
    poultry.name = jsonStringFromSpecies(
      'poultry',
      'volaille',
      'Geflügel',
      'pollame',
    );
    speciesRepository.save(poultry).catch((err) => console.log(err));

    const hamster = new Species();
    hamster.name = jsonStringFromSpecies(
      'hamster',
      'hamster',
      'Hamster',
      'criceto',
    );
    speciesRepository.save(hamster).catch((err) => console.log(err));

    const guineaPig = new Species();
    guineaPig.name = jsonStringFromSpecies(
      'guinea pig',
      "cochon d'Inde",
      'Meerschweinchen',
      "porcellino d'India",
    );
    speciesRepository.save(guineaPig).catch((err) => console.log(err));

    const ferret = new Species();
    ferret.name = jsonStringFromSpecies(
      'ferret',
      'furet',
      'Frettchen',
      'furetto',
    );
    speciesRepository.save(ferret).catch((err) => console.log(err));

    const other = new Species();
    other.name = jsonStringFromSpecies('other', 'autre', 'Sonstiges', 'Altro');
    speciesRepository.save(other).catch((err) => console.log(err));*/
  }

  async createSpecies(species: Species): Promise<Species> {
    return this.speciesRepository.save(species);
  }

  async findAllSpecies(): Promise<Species[]> {
    return this.speciesRepository.find();
  }

  async findOneSpeciesById(id: number): Promise<Species> {
    return this.speciesRepository.findOne(id);
  }

  async updateSpecies(species: Species): Promise<UpdateResult> {
    return this.speciesRepository.update(species.id, species);
  }

  async deleteSpecies(id: number): Promise<DeleteResult> {
    return this.speciesRepository.delete(id);
  }

  async checkSpecies(id: number): Promise<boolean> {
    try {
      const species = await this.findOneSpeciesById(id);

      if (species === undefined) {
        throw FILTER_INVALID_SPECIES;
      }
    } catch (e) {
      throw FILTER_INVALID_SPECIES;
    }

    return true;
  }
}
