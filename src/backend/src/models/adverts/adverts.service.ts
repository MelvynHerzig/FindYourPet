import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from './dto/filters.dto';
import { SpeciesService } from '../species/species.service';
import {
  ERROR_ADVERT_NOT_CREATED,
  ERROR_ADVERT_NOT_FOUND,
  ERROR_USER_NOT_FOUND,
  FILTER_INVALID_GENDER,
  FILTER_INVALID_PAGE,
  FILTER_INVALID_PET_MAX_AGE,
  FILTER_INVALID_PET_MIN_AGE,
  FILTER_INVALID_RADIUS,
} from '../../error/error-message';
import { MembersService } from '../members/members.service';
import { ToPublicMemberDto } from '../members/dto/members.dto';
import { ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { Advert, PetGender } from './entities/adverts.entity';
import { AdvertDto } from './dto/advert.dto';
import {
  HttpResponse,
  RESPONSE_ADVERT_DELETED,
  RESPONSE_ADVERT_UPDATED,
} from '../response';
import { Member } from '../members/entities/members.entity';

/**
 * Service to query adverts
 * @author Alec Berney, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
@Injectable()
export class AdvertsService {
  pageSize = 20;

  constructor(
    @InjectRepository(Advert)
    private readonly advertRepository: Repository<Advert>,
    private speciesService: SpeciesService,
    @Inject(forwardRef(() => MembersService))
    private membersService: MembersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Create an new advert
   * @param advert Advert to create
   * @return newly created advert
   */
  async createAdvert(advert: Advert): Promise<Advert> {
    try {
      return this.advertRepository.save(advert);
    } catch (e) {
      throw new HttpException(ERROR_ADVERT_NOT_CREATED, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find all advert of a page
   * @param pageNum No of the page
   * @return List of advert
   */
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

  /**
   * Find one specific advert represented by the id
   * @param id Id of the advert
   * @return Return the specified advert
   */
  async findOneAdvertById(id: number): Promise<Advert> {
    try {
      const advert = await this.advertRepository.findOne(id);
      if (!advert) {
        throw new HttpException(ERROR_ADVERT_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }
      return advert;
    } catch (e) {
      throw new HttpException(ERROR_ADVERT_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find all adverts of specified member
   * @param uuid Id of the member
   * @return List of advert of the membe
   */
  async findAllAdvertByUuid(uuid: string): Promise<Advert[]> {
    try {
      return this.advertRepository.find({ memberId: uuid });
    } catch (e) {
      throw new HttpException(ERROR_USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find the 10 last created or modified adverts
   * @return Top 10 recents adverts
   */
  async findTop10RecentAdvert(): Promise<Advert[]> {
    return this.advertRepository.find({
      order: {
        lastModified: 'DESC',
      },
      take: 10,
    });
  }

  /**
   * Find adverts filtered
   * @param filters Filter to apply
   * @param pageNum Page number to get
   * @param member Member used to check distance
   * @return List of adverts of the specified page
   */
  async filterAdvert(
    filters: FilterDto,
    pageNum: number,
    member: Member,
  ): Promise<Advert[]> {
    await this.checkIfNumberIsSmallerThan(pageNum, 1, FILTER_INVALID_PAGE);

    // Prepare query
    const query = this.advertRepository
      .createQueryBuilder('adverts')
      .leftJoinAndSelect(Member, 'm', 'm.id = adverts.memberId');

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
    if (filters.radius !== undefined && member != undefined) {
      query
        .andWhere(
          'ST_DWithin(m.location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(m.location)) ,:range)',
        )
        .setParameters({
          // stringify GeoJSON
          origin: JSON.stringify(member.location),
          range: filters.radius * 1000, //KM conversion,
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

  /**
   * Update the advert
   * @param advert Advert to update with new informations
   * @return HttpResponse Status of the update
   */
  async updateAdvert(advert: Advert): Promise<HttpResponse> {
    try {
      advert.lastModified = new Date();
      await this.advertRepository.update(advert.id, advert);
      return {
        success: true,
        message: RESPONSE_ADVERT_UPDATED,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  /**
   * Delete the advert
   * @param id id of the advert to delete
   * @return HttpResponse Status of the deletion
   */
  async deleteAdvert(id: number): Promise<HttpResponse> {
    try {
      await this.advertRepository.delete(id);
      return {
        success: true,
        message: RESPONSE_ADVERT_DELETED,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  /**
   * Delete all advert of a member
   * @param uuid Member
   */
  async deleteAllOfMember(uuid: string) {
    try {
      await this.advertRepository.delete({ memberId: uuid });
      return {
        success: true,
        message: RESPONSE_ADVERT_DELETED,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  /**
   * Get the distance between a member and an advert
   * @param member Member that asked for distance
   * @param advert Advert to check
   */
  async getDistanceOfAdvert(member: Member, advert: Advert): Promise<number> {
    if (advert.memberId !== undefined && member !== undefined) {
      const query = this.advertRepository
        .createQueryBuilder()
        .select('ST_Distance(m1.location, m2.location) distance')
        .from(Member, 'm1')
        .from(Member, 'm2')
        .andWhere('m1.id=:id1 AND m2.id=:id2')
        .setParameters({
          // stringify GeoJSON
          id1: advert.memberId,
          id2: member.id,
        });

      const distance: number = (await query.getRawOne())['distance'] / 1000; // KM Conversion

      return distance < 1 ? 1 : distance;
    }
    return undefined;
  }

  /**
   * Check if all filter are valid
   * @param filterDto Informations for filters
   */
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

  /**
   * Check if a number is small than another and throw exception if not
   * @param num Num to check
   * @param min Minimal number possible
   * @param error Error to throw
   */
  async checkIfNumberIsSmallerThan(num: number, min: number, error: string) {
    if (!Number.isInteger(num) || num < min) {
      throw error;
    }
  }

  /**
   * Verify the user in token
   * @param req Request received
   */
  async verifyJwt(req): Promise<Member> {
    const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    try {
      this.jwtService.verify(jwt);
      const email = this.jwtService.decode(jwt)['email'];
      const member = await this.membersService.findOne({
        email: email,
      });
      return member;
    } catch (error) {}

    return undefined;
  }

  /**
   * Translate an advert to the dto
   * @param advert advert to translate
   * @param lang Language of translation
   * @param member Member that asked for the advert
   */
  async ToAdvertDto(advert, lang: string, member: Member): Promise<AdvertDto> {
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
      species: this.speciesService.ToTranslatedSpeciesDto(
        await this.speciesService.findOneSpeciesById(speciesId),
        lang,
      ),
      member:
        member !== undefined
          ? ToPublicMemberDto(
              await this.membersService.findOne({ id: memberId }),
            )
          : undefined,
      distance: await this.getDistanceOfAdvert(member, advert),
    };
  }

  /**
   * Translate a list of advert to a list of dto
   * @param adverts adverts to translate
   * @param lang Language of translation
   * @param member Member that asked for the advert
   */
  async ToAdvertsDto(
    adverts,
    lang: string,
    member: Member,
  ): Promise<AdvertDto[]> {
    const result: AdvertDto[] = [];

    for (const advert of adverts) {
      result.push(await this.ToAdvertDto(advert, lang, member));
    }
    return result;
  }

  /**
   * Translate a dto to an advert
   * @param advert
   */
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
