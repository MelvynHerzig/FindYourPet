import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Adverts, PetGender } from './entities/adverts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { FilterDto } from './dto/filters.dto';
import { SpeciesService } from '../species/species.service';
import {
  FILTER_INVALID_GENDER,
  FILTER_INVALID_PAGE,
  FILTER_INVALID_PET_MIN_AGE,
  FILTER_INVALID_RADIUS,
} from '../../error/error-message';
import { MembersService } from '../members/members.service';
import { CreateAdvertsDto } from './dto/create.adverts.dto';
import { UpdateAdvertsDto } from './dto/update.adverts.dto';

export interface AdvertsStatus {
  success: boolean;
  message: string;
}

/**
 * Service to query adverts
 */
@Injectable()
export class AdvertsService {
  pageSize = 34;

  constructor(
    @InjectRepository(Adverts)
    private readonly advertRepository: Repository<Adverts>,
    private speciesService: SpeciesService,
    private membersService: MembersService,
  ) {}

  async createAdvert(advert: CreateAdvertsDto): Promise<Adverts> {
    return this.advertRepository.save(advert);
  }

  async findPageAdvert(pageNum: number): Promise<Adverts[]> {
    this.checkIfNumberIsSmallerThan(pageNum, 1, FILTER_INVALID_PAGE);

    return this.advertRepository.find({
      order: {
        id: 'ASC',
      },
      skip: (pageNum - 1) * this.pageSize,
      take: this.pageSize,
    });
  }

  async findOneAdvertById(id: number): Promise<Adverts> {
    return this.advertRepository.findOne(id);
  }

  async findAllAdvertByUuid(uuid: string): Promise<Adverts[]> {
    return this.advertRepository.find({ memberId: uuid });
  }

  async findTop10RecentAdvert(): Promise<Adverts[]> {
    return this.advertRepository.find({
      order: {
        lastModified: 'DESC',
      },
      take: 10,
    });
  }

  async filterAdvert(filters: FilterDto, pageNum: number): Promise<Adverts[]> {
    this.checkIfNumberIsSmallerThan(pageNum, 1, FILTER_INVALID_PAGE);

    // TODO get user location that emited request
    const origin = await this.membersService.findLocationByPayload({
      email: 'mel2@heig-vd.ch',
    });

    // Prepare query
    const query = this.advertRepository
      .createQueryBuilder('adverts')
      .innerJoin('adverts.member', 'm');

    // Filter by species
    if (filters.speciesId !== undefined) {
      query.andWhere(`adverts.speciesId = ${filters.speciesId}`);
    }

    // Filter by gender
    if (filters.gender !== undefined) {
      query.andWhere(`adverts.petGender = '${filters.gender}'`);
    }

    // Filter by age
    if (filters.petMinAge !== undefined) {
      query.andWhere(`adverts.petAge >= ${filters.petMinAge}`);
    }

    // Filter by distance
    if (filters.radius !== undefined) {
      query
        .andWhere(
          'ST_DWithin(m.location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(m.location)) ,:range)',
        )
        .setParameters({
          // stringify GeoJSON
          origin: JSON.stringify(origin),
          range: filters.radius * 1000, //KM conversion
        });
    }

    // Page
    query
      .orderBy('adverts.id', 'ASC')
      .skip((pageNum - 1) * this.pageSize)
      .take(this.pageSize);

    // Renaming properties because of queryBuilder
    const adverts = await query.getRawMany();
    for (const advert of adverts) {
      for (const prop in advert) {
        const new_prop = prop.substring(8);
        Object.defineProperty(
          advert,
          new_prop,
          Object.getOwnPropertyDescriptor(advert, prop),
        );
        delete advert[prop];
      }
    }

    return adverts;
  }

  async updateAdvert(advert: UpdateAdvertsDto): Promise<UpdateResult> {
    return this.advertRepository.update(advert.id, advert);
  }

  async deleteAdvert(id: number): Promise<DeleteResult> {
    return this.advertRepository.delete(id);
  }

  async checkFilter(filterDto: FilterDto) {
    if (filterDto.speciesId !== undefined) {
      await this.speciesService.checkSpecies(filterDto.speciesId);
    }

    if (filterDto.radius !== undefined) {
      this.checkIfNumberIsSmallerThan(
        filterDto.radius,
        1,
        FILTER_INVALID_RADIUS,
      );
    }

    if (filterDto.petMinAge !== undefined) {
      this.checkIfNumberIsSmallerThan(
        filterDto.petMinAge,
        0,
        FILTER_INVALID_PET_MIN_AGE,
      );
    }

    if (filterDto.gender !== undefined) {
      if (!Object.values(PetGender).includes(filterDto.gender)) {
        throw FILTER_INVALID_GENDER;
      }
    }
  }

  async checkIfNumberIsSmallerThan(num: number, min: number, error: string) {
    if (!Number.isInteger(num) || num < min) {
      throw error;
    }
  }
}
