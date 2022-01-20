import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Species } from './entities/species.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ERROR_INVALID_SPECIES,
  FILTER_INVALID_SPECIES,
} from '../../error/error-message';

/**
 * Service to query species
 */
@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
  ) {}

  async createSpecies(species: Species): Promise<Species> {
    return this.speciesRepository.save(species);
  }

  async findAllSpecies(): Promise<Species[]> {
    return this.speciesRepository.find();
  }

  async findOneSpeciesById(id: number): Promise<Species> {
    const species = this.speciesRepository.findOne(id);

    if (!species) {
      throw new HttpException(ERROR_INVALID_SPECIES, HttpStatus.BAD_REQUEST);
    }
    return species;
  }

  async updateSpecies(species: Species): Promise<UpdateResult> {
    return this.speciesRepository.update(species.id, species);
  }

  async deleteSpecies(id: number): Promise<DeleteResult> {
    try {
      return this.speciesRepository.delete(id);
    } catch (e) {
      throw new HttpException(ERROR_INVALID_SPECIES, HttpStatus.BAD_REQUEST);
    }
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
