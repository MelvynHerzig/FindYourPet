import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Species } from './entities/species.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ERROR_ADVERT_NOT_CREATED,
  ERROR_INVALID_SPECIES,
  FILTER_INVALID_SPECIES,
} from '../../error/error-message';
import {
  HttpResponse,
  RESPONSE_SPECIES_DELETED,
  RESPONSE_SPECIES_UPDATED,
} from '../response';

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
    try {
      return this.speciesRepository.save(species);
    } catch (e) {
      throw new HttpException(ERROR_ADVERT_NOT_CREATED, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllSpecies(): Promise<Species[]> {
    return this.speciesRepository.find();
  }

  async findOneSpeciesById(id: number): Promise<Species> {
    try {
      return this.speciesRepository.findOne(id);
    } catch (e) {
      throw new HttpException(ERROR_INVALID_SPECIES, HttpStatus.BAD_REQUEST);
    }
  }

  async updateSpecies(species: Species): Promise<HttpResponse> {
    try {
      await this.speciesRepository.update(species.id, species);
      return {
        success: true,
        message: RESPONSE_SPECIES_UPDATED,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  async deleteSpecies(id: number): Promise<HttpResponse> {
    try {
      await this.speciesRepository.delete(id);
      return {
        success: true,
        message: RESPONSE_SPECIES_DELETED,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
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
