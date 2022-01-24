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
import { getSpeciesName, jsonStringFromSpecies } from './species.utils';
import { SpeciesDto } from './dto/species.dto';

/**
 * Service to query species
 * @author Alec Berney, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
  ) {}

  /**
   * Create a species
   * @param species Dto that contains all information to create a species
   */
  async createSpecies(species: Species): Promise<Species> {
    try {
      return this.speciesRepository.save(species);
    } catch (e) {
      throw new HttpException(ERROR_ADVERT_NOT_CREATED, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find a list of all species
   */
  async findAllSpecies(): Promise<Species[]> {
    return this.speciesRepository.find();
  }

  /**
   * Find a specific species using the id
   * @param id Id of the species
   */
  async findOneSpeciesById(id: number): Promise<Species> {
    try {
      return this.speciesRepository.findOne(id);
    } catch (e) {
      throw new HttpException(ERROR_INVALID_SPECIES, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update a species
   * @param species Dto that contains all information to update the species
   */
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

  /**
   * Delete a species
   * @param id Id of the species to delete
   */
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

  /**
   * Check if a species exist
   * @param id id to check
   */
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

  ToSpeciesDto(species: Species): SpeciesDto {
    try {
      const { id } = species;
      const names = getSpeciesName(species);
      return {
        id,
        fr: names['fr'],
        en: names['en'],
        de: names['de'],
        it: names['it'],
      };
    } catch (e) {
      throw new HttpException(ERROR_INVALID_SPECIES, HttpStatus.BAD_REQUEST);
    }
  }

  ToSpecies(species: SpeciesDto): Species {
    return {
      id: species.id,
      name: jsonStringFromSpecies(species),
    };
  }
}
