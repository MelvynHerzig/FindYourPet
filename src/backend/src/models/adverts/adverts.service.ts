import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Advert, PetGender } from './entities/adverts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from './dto/filters.dto';
import { SpeciesService } from '../species/species.service';
import {
  FILTER_INVALID_GENDER,
  FILTER_INVALID_PAGE,
  FILTER_INVALID_PET_MAX_AGE,
  FILTER_INVALID_PET_MIN_AGE,
  FILTER_INVALID_RADIUS,
} from '../../error/error-message';
import { MembersService } from '../members/members.service';
import { AdvertDto } from './dto/advert.dto';
import { ToTranslatedSpeciesDto } from '../species/dto/translated.species.dto';
import { ToPublicMemberDto } from '../members/dto/members.dto';

/**
 * Service to query adverts
 */
@Injectable()
export class AdvertsService {
  pageSize = 20;

  constructor(
    @InjectRepository(Advert)
    private readonly advertRepository: Repository<Advert>,
    private speciesService: SpeciesService,
    private membersService: MembersService,
  ) {}

  async createAdvert(advert: Advert): Promise<Advert> {
    return this.advertRepository.save(advert);
  }

  async findPageAdvert(pageNum: number): Promise<Advert[]> {
    await this.checkIfNumberIsSmallerThan(pageNum, 1, FILTER_INVALID_PAGE);

    return this.advertRepository.find({
      order: {
        id: 'ASC',
      },
      skip: (pageNum - 1) * this.pageSize,
      take: this.pageSize,
    });
  }

  async findOneAdvertById(id: number): Promise<Advert> {
    return this.advertRepository.findOne(id);
  }

  async findAllAdvertByUuid(uuid: string): Promise<Advert[]> {
    return this.advertRepository.find({ memberId: uuid });
  }

  async findTop10RecentAdvert(): Promise<Advert[]> {
    return this.advertRepository.find({
      order: {
        lastModified: 'DESC',
      },
      take: 10,
    });
  }

  async filterAdvert(filters: FilterDto, pageNum: number): Promise<Advert[]> {
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

    // Filter by age
    if (filters.petMaxAge !== undefined) {
      query.andWhere(`adverts.petAge <= ${filters.petMaxAge}`);
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

  async updateAdvert(advert: Advert): Promise<UpdateResult> {
    advert.lastModified = new Date();
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

    if (filterDto.petMaxAge !== undefined) {
      this.checkIfNumberIsSmallerThan(
        filterDto.petMaxAge,
        0,
        FILTER_INVALID_PET_MAX_AGE,
      );

      if (filterDto.petMinAge !== undefined) {
        this.checkIfNumberIsSmallerThan(
          filterDto.petMaxAge,
          filterDto.petMinAge,
          FILTER_INVALID_PET_MAX_AGE,
        );
      }
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

  async ToAdvertDto(advert, lang: string, logged: boolean): Promise<AdvertDto> {
    const {
      id,
      title,
      description,
      imageId,
      lastModified,
      petAge,
      petGender,
      speciesId,
      memberId,
    } = advert;

    return {
      id,
      title,
      description,
      imageId,
      lastModified,
      petAge,
      petGender,
      species: ToTranslatedSpeciesDto(
        await this.speciesService.findOneSpeciesById(speciesId),
        lang,
      ),
      member: logged
        ? ToPublicMemberDto(await this.membersService.findOne({ id: memberId }))
        : undefined,
    };
  }

  async ToAdvertsDto(
    adverts,
    lang: string,
    logged: boolean,
  ): Promise<AdvertDto[]> {
    const result: AdvertDto[] = [];

    for (const advert of adverts) {
      result.push(await this.ToAdvertDto(advert, lang, logged));
    }
    return result;
  }

  ToAdvert(advert): Advert {
    const {
      id,
      title,
      description,
      imageId,
      lastModified,
      petAge,
      petGender,
      speciesId,
      species,
      memberId,
      member,
    } = advert;

    const sId =
      speciesId === undefined
        ? species !== undefined
          ? species.id
          : undefined
        : speciesId;
    const mId =
      memberId === undefined
        ? member !== undefined
          ? member.id
          : undefined
        : memberId;

    return {
      id,
      title,
      description,
      imageId,
      lastModified,
      petAge,
      petGender,
      memberId: mId,
      speciesId: sId,
    };
  }
}
