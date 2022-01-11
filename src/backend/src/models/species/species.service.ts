import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Species } from './entities/species.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FILTER_INVALID_SPECIES } from '../../error/error-message';

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
