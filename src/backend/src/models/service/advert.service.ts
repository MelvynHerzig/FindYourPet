import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AdvertEntity } from '../entity/advert.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AdvertInterface } from '../entity/advert.interface';
import { from, Observable } from 'rxjs';

/**
 * Service to query advert
 */
@Injectable()
export class AdvertService {
  constructor(
    @InjectRepository(AdvertEntity)
    private readonly advertRepository: Repository<AdvertEntity>,
  ) {}

  createAdvert(advert: AdvertInterface): Observable<AdvertInterface> {
    return from(this.advertRepository.save(advert));
  }

  findAllAdvert(): Observable<AdvertInterface[]> {
    return from(this.advertRepository.find());
  }

  findOneAdvertById(id: number): Observable<AdvertInterface> {
    return from(this.advertRepository.findOne(id));
  }

  updateAdvert(advert: AdvertInterface) {
    return from(this.advertRepository.update(advert.id, advert));
  }

  deleteAdvert(id: number) {
    return from(this.advertRepository.delete(id));
  }
}
